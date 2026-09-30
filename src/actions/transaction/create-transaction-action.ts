'use server';

import { getSession } from '@/lib/session';
import { transactionSchema } from '@/schemas/transactions/transaction-schema';
import { TransactionService } from '@/services/transaction/transaction.service';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function createTransactionAction(rawData: unknown) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
      };
    }

    const validation = transactionSchema.safeParse(rawData);
    if (!validation.success) {
      return {
        success: false,
        error: 'Dados inválidos.',
      };
    }

    const { type, amount, categoryId, description, status, dueDate, recurrence, parentId } = validation.data;

    const transaction = await TransactionService.createTransaction({
      userId: session.userId,
      type,
      amount,
      categoryId,
      description: description ?? '',
      status,
      dueDate,
      recurrence,
      parentId,

    });

    revalidateTag(`transactions-${session.userId}`, '');
    revalidatePath('/home');

    return {
      success: true,
      data: {
        ...transaction,
        amount: Number(transaction.amount),
        date: transaction.date.toISOString(),
        createdAt: transaction.createdAt.toISOString(),
        dueDate: transaction.dueDate ? transaction.dueDate.toISOString() : null,
      },
    };
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Erro ao criar transação.',
    };
  }
}
