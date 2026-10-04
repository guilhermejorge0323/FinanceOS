'use server';

import { triggerTransactionUpdate } from '@/lib/pusher/pusher-server';
import { getSession } from '@/lib/session';
import { transactionSchema } from '@/schemas/transactions/transaction-schema';
import { TransactionService } from '@/services/transaction/transaction.service';
import { TransactionStatus } from '@prisma/client';
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

    const {
      type,
      amount,
      categoryId,
      name,
      status,
      dueDate,
      recurrence,
      parentId,
    } = validation.data;

    let finalStatus: TransactionStatus = status || TransactionStatus.PAID;

    if (status === TransactionStatus.PENDING && dueDate) {
      const targetDate = new Date(dueDate);
      const now = new Date();

      const isCurrentMonth =
        targetDate.getMonth() === now.getMonth() &&
        targetDate.getFullYear() === now.getFullYear();

      if (!isCurrentMonth && targetDate > now) {
        finalStatus = TransactionStatus.SCHEDULED;
      }
    }

    const transaction = await TransactionService.createTransaction({
      userId: session.userId,
      type,
      amount,
      categoryId,
      name,
      status: finalStatus,
      date: dueDate ?? new Date(),
      dueDate,
      recurrence,
      parentId,
    });

    const serializedTransaction = {
      ...transaction,
      amount: Number(transaction.amount),
      date: transaction.date.toISOString(),
      createdAt: transaction.createdAt.toISOString(),
      dueDate: transaction.dueDate ? transaction.dueDate.toISOString() : null,
    };

    await triggerTransactionUpdate(session.userId, 'created', serializedTransaction)

    revalidateTag(`transactions-${session.userId}`, 'default');
    revalidatePath('/home');

    return {
      success: true,
      data: serializedTransaction
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
