export async function fetchRealDate(): Promise<string | null> {
  try {
    const response = await fetch('/api/time');
    const data = await response.json();

    const date = new Date(data.datetime);

    const rawFormatted = new Intl.DateTimeFormat('pt-br', {
      month: 'long',
      year: 'numeric',
    }).format(date);

    const cleanDate = rawFormatted.replace(' de ', ' ');
    return cleanDate.charAt(0).toUpperCase() + cleanDate.slice(1);

  } catch (error) {
    console.error('Erro ao carregar data', error);
    return null;
  }
}
