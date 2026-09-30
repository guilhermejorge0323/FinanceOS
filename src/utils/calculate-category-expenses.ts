import { TransactionStatus, TransactionType } from '@prisma/client';
import { calculateFinancialSummary, DashboardMode } from './calculate-financial-summary';

export interface CategoryData {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

const FIXED_CATEGORY_COLORS: Record<string, string> = {
  moradia: '#3b82f6',
  alimentação: '#f59e0b',
  transporte: '#10b981',
  lazer: '#8b5cf6',
  saúde: '#ef4444',
  outros: '#64748b',
};


const PALETTE = [
  '#ec4899', '#06b6d4', '#84cc16', '#a855f7', '#f97316', '#14b8a6',
];

function getConsistentColor(name: string, id: string): string {
  const normalizedName = name.trim().toLowerCase();

  if (FIXED_CATEGORY_COLORS[normalizedName]) {
    return FIXED_CATEGORY_COLORS[normalizedName];
  }

  let hash = 0;
  const str = id || name;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PALETTE.length;
  return PALETTE[index];
}

export function calculateCategoryExpenses(
  transactions: any[] = [],
  allCategories: any[] = [],
  mode: DashboardMode = 'CURRENT',
): CategoryData[] {


  const expenseTransactions = transactions.filter((t) => {
    if (t.type !== TransactionType.OUTCOME && t.type !== 'OUTCOME') return false;

    if (mode === 'CURRENT') {
      return (
        t.status === TransactionStatus.PAID ||
        t.status === 'PAID' ||
        t.status === TransactionStatus.SCHEDULED_PAID ||
        t.status === 'SCHEDULED_PAID'
      );
    } else {
      return (
        t.status === TransactionStatus.SCHEDULED ||
        t.status === 'SCHEDULED' ||
        t.status === TransactionStatus.SCHEDULED_PAID ||
        t.status === 'SCHEDULED_PAID' ||
        t.status === TransactionStatus.PLANNED ||
        t.status === 'PLANNED'
      );
    }
  });


  const { totalExpenses } = calculateFinancialSummary(transactions, mode);

  const grouped: Record<string, { id: string; name: string; amount: number }> = {};

  allCategories.forEach((cat) => {
    const catId = String(cat.id).trim();
    grouped[catId] = {
      id: catId,
      name: cat.name,
      amount: 0,
    };
  });

  expenseTransactions.forEach((t) => {
    const rawCatId = t.categoryId ?? t.category?.id;
    const catIdStr = rawCatId ? String(rawCatId).trim() : null;
    const catName = t.category?.name;

    if (catIdStr && grouped[catIdStr]) {
      grouped[catIdStr].amount += Number(t.amount);
    } else if (catName) {
      const foundKey = Object.keys(grouped).find(
        (key) => grouped[key].name.toLowerCase() === catName.toLowerCase(),
      );

      if (foundKey) {
        grouped[foundKey].amount += Number(t.amount);
      }
    }
  });

  return Object.values(grouped)
    .sort((a, b) => b.amount - a.amount)
    .map((item) => {
      const percentage =
        totalExpenses > 0 ? Math.round((item.amount / totalExpenses) * 100) : 0;

      return {
        id: item.id,
        name: item.name,
        amount: item.amount,
        percentage,
        color: getConsistentColor(item.name, item.id),
      };
    });
}
