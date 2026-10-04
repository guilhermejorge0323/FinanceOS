import { HomeCard } from '../../ui/DashboardCard';
import Link from 'next/link';
import clsx from 'clsx';
import { TransactionCardHeader } from './TransactionCardHeader';
import { DashboardMode } from '@/utils/calculate-financial-summary';
import { CategoryOption } from '@/components/home/ui/forms/TransactionForm';
import { Transaction } from './Transaction';
import { TransactionStatus } from '@prisma/client';

interface TransactionCardProps {
  type: 'INCOME' | 'OUTCOME';
  transactions?: any[];
  mode?: DashboardMode;
  categories: CategoryOption[];
}

export function TransactionCard({
  type,
  transactions = [],
  mode = 'CURRENT',
  categories,
}: TransactionCardProps) {
  const isIncome = type === 'INCOME';
  const actionLabel = isIncome ? 'entrada' : 'saída';
  const pluralLabel = isIncome ? 'entradas' : 'saídas';

  const filteredTransactions = transactions.filter(item => {
    if (item.type !== type) return false;

    if (mode === 'CURRENT') {
      return (
        item.status === TransactionStatus.PAID ||
        item.status === 'PAID' ||
        item.status === TransactionStatus.SCHEDULED_PAID ||
        item.status === 'SCHEDULED_PAID'
      );
    } else {
      return (
        item.status === TransactionStatus.SCHEDULED ||
        item.status === 'SCHEDULED' ||
        item.status === TransactionStatus.SCHEDULED_PAID ||
        item.status === 'SCHEDULED_PAID' ||
        item.status === TransactionStatus.PLANNED ||
        item.status === 'PLANNED' ||
        item.status === TransactionStatus.PENDING||
        item.status === 'PENDING'
      );
    }
  });

  const totalAmount = filteredTransactions.reduce(
    (acc, item) => acc + Number(item.amount),
    0,
  );

  return (
    <HomeCard className='p-0 h-95 flex flex-col justify-between overflow-hidden border border-slate-200/80 dark:border-slate-800/60 shadow-sm'>
      <TransactionCardHeader
        mode={mode}
        type={type}
        totalAmount={totalAmount}
        count={filteredTransactions.length}
        categories={categories}
      />

      <div className='flex-1 overflow-y-auto pr-1 divide-y divide-slate-100 dark:divide-slate-800/30 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent'>
        {filteredTransactions.length === 0 ? (
          <p className='p-4 text-xs text-center text-slate-400'>
            Nenhuma {actionLabel} cadastrada.
          </p>
        ) : (
          filteredTransactions.map(item => (
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
              'text-primary-green dark:text-emerald-400': isIncome,
              'text-home-red dark:text-rose-400': !isIncome,
            },
          )}
        >
          Ver todas as {pluralLabel}
        </Link>
      </div>
    </HomeCard>
  );
}
