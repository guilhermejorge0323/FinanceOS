'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

import { TransactionType } from '@prisma/client';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function createStaticTransactionAction(cardType: 'input' | 'output') {
  const type: TransactionType = cardType === 'input' ? 'INCOME' : 'OUTCOME';

  // 1. Pega o usuário REALMENTE logado na sessão
  const session = await getSession();
  if (!session?.userId) return;

  const userId = session.userId;

  // 2. Busca uma categoria pertencente a ESTE usuário
  const category = await prisma.category.findFirst({
    where: {
      userId: userId,
      type: type
    },
  });

  if (!category) {
    console.warn('Nenhuma categoria encontrada para este usuário');
    return;
  }

  // 3. Cria a transação atrelada ao usuário correto
  await prisma.transaction.create({
    data: {
      description: type === 'INCOME' ? 'Recebimento de Teste' : 'Gasto de Teste',
      amount: type === 'INCOME' ? 150.0 : 45.0,
      type: type,
      date: new Date(),
      userId: userId,
      categoryId: 34,
    },
  });

  // 4. Limpa o cache das tags e revalida a rota
  revalidateTag(`transactions-${userId}`);
  revalidateTag(`categories-${userId}`);
  revalidatePath('/home');
}
