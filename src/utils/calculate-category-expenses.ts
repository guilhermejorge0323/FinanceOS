import { calculateFinancialSummary } from './calculate-financial-summary';

export interface CategoryData {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

const CATEGORY_COLORS = [
  '#3b82f6',
  '#f59e0b',
  '#8b5cf6',
  '#ef4444',
  '#10b981',
  '#64748b',
  '#ec4899',
  '#06b6d4',
];

type CategoryItem = {
  id: number | string;
  name: string;
};

type TransactionItem = {
  type: string;
  amount: number | any;
  category?: { id: number | string; name: string } | null;
};

export function calculateCategoryExpenses(
  transactions: TransactionItem[],
  allCategories: CategoryItem[] = [],
): CategoryData[] {
  const expenseTransactions = transactions.filter(
    t => t.type === 'OUTCOME' || t.type === 'EXPENSE',
  );

  const { totalExpenses } = calculateFinancialSummary(transactions);

  const grouped: Record<string, { id: string; name: string; amount: number }> = {};

  if (allCategories.length > 0) {
    allCategories.forEach(cat => {
      const catId = String(cat.id);
      grouped[catId] = { id: catId, name: cat.name, amount: 0 };
    });
  }

  expenseTransactions.forEach(t => {
    const catId = t.category?.id ? String(t.category.id) : '0';
    const catName = t.category?.name || 'Geral';
    const amount = Number(t.amount);

    if (!grouped[catId]) {
      grouped[catId] = { id: catId, name: catName, amount: 0 };
    }
    grouped[catId].amount += amount;
  });

  const categoriesList = Object.values(grouped)
    .sort((a, b) => b.amount - a.amount)
    .map((item, index) => {
      const percentage =
        totalExpenses > 0 ? Math.round((item.amount / totalExpenses) * 100) : 0;
      const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

      return {
        id: item.id,
        name: item.name,
        amount: item.amount,
        percentage,
        color,
      };
    });

  return categoriesList;
}
