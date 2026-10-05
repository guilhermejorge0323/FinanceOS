export function formatStringDate(date: Date | string) {
  if (!date) return '';
  const dateStr =
    typeof date === 'string'
      ? date.split('T')[0]
      : date.toISOString().split('T')[0];

  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}
