import { calculateFinancialSummary } from './calculate-financial-summary';

export interface CategoryData {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

const FIXED_CATEGORY_COLORS: Record<string, string> = {
  moradia: '#3b82f6',     // Azul
  alimentação: '#f59e0b', // Laranja / Amarelo
  transporte: '#10b981',  // Verde
  lazer: '#8b5cf6',       // Roxo
  saúde: '#ef4444',       // Vermelho
  outros: '#64748b',      // Cinza
};

// Cores de apoio caso a categoria seja nova/personalizada
const PALETTE = [
  '#ec4899', '#06b6d4', '#84cc16', '#a855f7', '#f97316', '#14b8a6',
];


function getConsistentColor(name: string, id: string): string {
  const normalizedName = name.trim().toLowerCase();

  // Retorna a cor fixa se existir no dicionário
  if (FIXED_CATEGORY_COLORS[normalizedName]) {
    return FIXED_CATEGORY_COLORS[normalizedName];
  }

  // Gera um índice persistente baseado na soma do código ASCII do ID
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
): CategoryData[] {
  const expenseTransactions = transactions.filter(
    (t) => t.type === 'OUTCOME',
  );

  const { totalExpenses } = calculateFinancialSummary(transactions);

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

  // Ordena por maior gasto sem alterar as cores atreladas a cada item
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
        color: getConsistentColor(item.name, item.id), // 🟢 Cor fixa determinística
      };
    });
}
