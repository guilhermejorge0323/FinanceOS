import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'https://worldtimeapi.org/api/timezone/America/Sao_Paulo',
      {
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      throw new Error('Falha em buscar dados da API de horario externa');
    }

    const data = await res.json();
    return NextResponse.json({ datetime: data.datetime });
  } catch (error) {
    return NextResponse.json({ datetime: new Date().toISOString() });
  }
}
