'use cache';
import { TransactionService } from '@/services/transaction/transaction.service';
import { cacheTag } from 'next/cache';

export async function getTransactionsUser(
  userId: string,
  startDate?: Date,
  endDate?: Date,
) {
  cacheTag(`transactions-${userId}`);

  const transactions = await TransactionService.getMonthTransactions(userId, startDate, endDate);

  return transactions.map(item => ({
    ...item,
    amount: Number(item.amount),
  }));
}
