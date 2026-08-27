import { redirect } from 'next/navigation';
import { getSession } from "../session";
import { getTransactionsUser } from "./queries";

export async function getAuthedTransactions() {
  const session = await getSession();

  if (!session?.userId) {
    redirect('/login');
  }

  return await getTransactionsUser(session?.userId);
}
