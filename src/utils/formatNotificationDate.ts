export function formatNotificationDate(DateInput: Date | string): string {
  const date = new Date(DateInput);
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const targetDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const timeFormatted = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  if (targetDate.getTime() === startOfToday.getTime()) {
    return `Hoje, ${timeFormatted}`;
  }

  if (targetDate.getTime() === startOfYesterday.getTime()) {
    return `Ontem, ${timeFormatted}`;
  }

  const dayAndMonth = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  }).format(date);

  return `${dayAndMonth}, ${timeFormatted}`;
}
