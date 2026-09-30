export type CategoryType = 'INCOME' | 'OUTCOME';

export type CategoryIconItem = {
  label: string;
  emoji: string;
  type: CategoryType;
};

export const CATEGORY_ICONS: Record<string, CategoryIconItem> = {
  // --- ENTRADAS (INCOME) ---
  Briefcase: { label: 'Salário / Trabalho', emoji: '💼', type: 'INCOME' },
  Laptop: { label: 'Freelance / Serviços', emoji: '💻', type: 'INCOME' },
  TrendingUp: { label: 'Investimentos', emoji: '📈', type: 'INCOME' },
  Gift: { label: 'Presente / Bônus', emoji: '🎁', type: 'INCOME' },
  DollarSign: { label: 'Renda Extra', emoji: '💵', type: 'INCOME' },
  PiggyBank: { label: 'Economias / Cofrinho', emoji: '🐖', type: 'INCOME' },
  Building2: { label: 'Aluguel Recebido', emoji: '🏢', type: 'INCOME' },
  Coins: { label: 'Dividendos / Vendas', emoji: '🪙', type: 'INCOME' },
  Award: { label: 'Prêmiações', emoji: '🏆', type: 'INCOME' },
  PlusCircle: { label: 'Outras Entradas', emoji: '➕', type: 'INCOME' },

  // --- SAÍDAS (OUTCOME) ---
  Home: { label: 'Moradia / Casa', emoji: '🏠', type: 'OUTCOME' },
  Utensils: { label: 'Alimentação', emoji: '🍽️', type: 'OUTCOME' },
  Car: { label: 'Transporte / Veículo', emoji: '🚗', type: 'OUTCOME' },
  ShoppingBag: { label: 'Compras / Roupas', emoji: '🛍️', type: 'OUTCOME' },
  Gamepad2: { label: 'Lazer / Jogos', emoji: '🎮', type: 'OUTCOME' },
  HeartPulse: { label: 'Saúde / Farmácia', emoji: '🏥', type: 'OUTCOME' },
  GraduationCap: { label: 'Educação / Cursos', emoji: '🎓', type: 'OUTCOME' },
  Smartphone: { label: 'Contas / Assinaturas', emoji: '📱', type: 'OUTCOME' },
  Plane: { label: 'Viagens / Ferias', emoji: '✈️', type: 'OUTCOME' },
  Dumbbell: { label: 'Academia / Esportes', emoji: '🏋️', type: 'OUTCOME' },
  Fuel: { label: 'Combustível', emoji: '⛽', type: 'OUTCOME' },
  Sparkles: { label: 'Beleza / Estética', emoji: '✨', type: 'OUTCOME' },
  PawPrint: { label: 'Pets', emoji: '🐾', type: 'OUTCOME' },
  Wrench: { label: 'Manutenção / Reparos', emoji: '🔧', type: 'OUTCOME' },
  MinusCircle: { label: 'Outras Saídas', emoji: '➖', type: 'OUTCOME' },
  LineChart: { label: 'Aplicações / Investimentos', emoji: '📊', type: 'OUTCOME' },
};

// Mapeamento simples de nome -> emoji
export const ICON_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_ICONS).map(([key, value]) => [key, value.emoji]),
);

export function getCategoryIcon(iconName?: string | null): string {
  if (!iconName) return '💰';
  return ICON_MAP[iconName] || '💰';
}
