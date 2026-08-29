'use cache';
import { TransactionService } from '@/services/transaction/transaction.service';
import { cacheTag } from 'next/cache';

export async function getTransactionsUser(userId: string) {
  cacheTag(`transactions-${userId}`);

  const transactions = await TransactionService.getTransactions(userId);

  return transactions.map((item) => ({
    ...item,
    amount: Number(item.amount),
  }));
}
