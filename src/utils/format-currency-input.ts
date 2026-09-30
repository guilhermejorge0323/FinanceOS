// Converte o texto digitado em número positivo e formata em BRL
export function formatCurrencyInput(value: string): {
  formatted: string;
  numeric: number;
} {

  const cleanValue = value.replace(/\D/g, '');
  const numericValue = Number(cleanValue) / 100;

  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericValue);

  return { formatted, numeric: numericValue };
}
