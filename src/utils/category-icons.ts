const ICON_MAP: Record<string, string> = {
  // Entradas (INCOME)
  Briefcase: '💼',
  Laptop: '💻',
  TrendingUp: '📈',
  PlusCircle: '➕',

  // Saídas (OUTCOME / EXPENSE)
  Home: '🏠',
  Utensils: '🍽️',
  Car: '🚗',
  Gamepad2: '🎮',
  HeartPulse: '🏥',
  MinusCircle: '➖',
};

export function getCategoryIcon(iconName?: string | null): string {
  if (!iconName) return '💰';
  return ICON_MAP[iconName] || '💰';
}
