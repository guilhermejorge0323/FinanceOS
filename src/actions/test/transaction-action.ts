'use server';

import { prisma } from '@/lib/prisma';
import { TransactionType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createStaticTransactionAction(cardType: 'input' | 'output') {
  // 🟢 Converte 'input'/'output' para o Enum do Prisma
  const type: TransactionType = cardType === 'input' ? 'INCOME' : 'OUTCOME';

  // 🟢 Pega o usuário cadastrado no banco
  const user = await prisma.user.findFirst();
  if (!user) return;

  // 🟢 Pega a categoria id = 1 ou qualquer categoria compatível
  const category =
    (await prisma.category.findFirst({ where: { userId: user.id, type } })) ||
    (await prisma.category.findUnique({ where: { id: 1 } }));

  if (!category) return;

  // 🟢 Cria a transação estática
  await prisma.transaction.create({
    data: {
      description: type === 'INCOME' ? 'Recebimento de Teste' : 'Gasto de Teste',
      amount: type === 'INCOME' ? 150.0 : 45.0,
      type: type,
      date: new Date(),
      userId: user.id,
      categoryId: 6,
    },
  });

  // 🟢 Revalida a página para renderizar os dados atualizados na hora
  revalidatePath('/home');
}
