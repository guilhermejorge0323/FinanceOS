import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: 'User ID é obrigatório' }, { status: 400 });
    }

    revalidateTag(`transactions-${userId}`, 'default');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao revalidar cache', error }, { status: 500 });
  }
}
