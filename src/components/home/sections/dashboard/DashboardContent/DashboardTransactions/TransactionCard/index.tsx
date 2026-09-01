import { PlusIcon } from 'lucide-react';
import { HomeCard } from '../../ui/DashboardCard';
import { ArrowTransaction } from '@/components/home/ui/ArrowTransaction';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import Link from 'next/link';
import clsx from 'clsx';
import { Transaction } from './Transaction';
import { getSession } from '@/lib/session';
import { getTransactionsUser } from '@/lib/transactions/queries';
import { createStaticTransactionAction } from '@/actions/test/transaction-action';
import { formatCurrency } from '@/utils/format-currency';
import { getAuthedTransactions } from '@/lib/transactions/getAuthedTransactions';
import { TransactionCardHeader } from './TransactionCardHeader';

type TransactionCardProps = {
  type: 'input' | 'output';
};

export async function TransactionCard({ type }: TransactionCardProps) {
  const isInput = type === 'input';
  const actionLabel = isInput ? 'entrada' : 'saída';
  const pluralLabel = isInput ? 'entradas' : 'saídas';

  const allTransactions = await getAuthedTransactions();

  const targetType = isInput ? 'INCOME' : 'OUTCOME';
  const transactions = allTransactions.filter(item => item.type === targetType);

  const totalAmount = transactions.reduce(
    (acc, item) => acc + Number(item.amount),
    0,
  );

  return (
    <HomeCard className='p-0 h-95 flex flex-col justify-between overflow-hidden border border-slate-200/80 dark:border-slate-800/60 shadow-sm'>
      <TransactionCardHeader
        type={type}
        totalAmount={totalAmount}
        count={transactions.length}
      />

      <div className='flex-1 overflow-y-auto pr-1 divide-y divide-slate-100 dark:divide-slate-800/30 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent'>
        {transactions.length === 0 ? (
          <p className='p-4 text-xs text-center text-slate-400'>
            Nenhuma {actionLabel} cadastrada.
          </p>
        ) : (
          transactions.map(item => (
            <Transaction key={item.id} type={type} data={item} />
          ))
        )}
      </div>

      <div className='px-5 py-3 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between bg-transparent shrink-0'>
        <Link
          href={'/'}
          className={clsx(
            'text-xs font-semibold hover:underline flex items-center gap-1 transition-all',
            {
              'text-primary-green dark:text-emerald-400': isInput,
              'text-home-red dark:text-rose-400': !isInput,
            },
          )}
        >
          Ver todas as {pluralLabel} &rarr;
        </Link>
      </div>
    </HomeCard>
  );
}
