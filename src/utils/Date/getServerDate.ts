export function getServerDate(): Date {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(new Date());

  const dateObj: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== 'literal') {
      dateObj[part.type] = part.value;
    }
  }

  // Retorna um objeto Date limpo baseado exatamente no fuso de São Paulo
  return new Date(
    Number(dateObj.year),
    Number(dateObj.month) - 1,
    Number(dateObj.day),
    Number(dateObj.hour),
    Number(dateObj.minute),
    Number(dateObj.second)
  );
}
