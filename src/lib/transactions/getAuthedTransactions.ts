import { getSession } from '../session';
import { getTransactionsUser } from './queries';

export async function getAuthedTransactions(startDate?: Date, endDate?: Date) {
  const session = await getSession();

  if (!session?.userId) {
    return [];
  }

  return await getTransactionsUser(session?.userId, startDate, endDate);
}
