'use server';

import { getSession } from '@/lib/session';
import { TransactionService } from '@/services/transaction/transaction.service';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function deleteTransactionAction(id: string) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Nao autorizado');
  }

  await TransactionService.deleteTransaction(id);

  revalidateTag(`transactions=${session.userId}`, '');
  revalidatePath('/home');
}
