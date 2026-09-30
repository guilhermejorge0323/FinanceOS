'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { PlusIcon } from 'lucide-react';
import { ArrowTransaction } from '@/components/home/ui/ArrowTransaction';
import { CardCreateHome } from '@/components/home/ui/CardCreateHome';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { formatCurrency } from '@/utils/format-currency';
import { CategoryOption } from '@/components/home/ui/forms/TransactionForm';
import { DashboardMode } from '@/utils/calculate-financial-summary';

type TransactionCardHeaderProps = {
  type: 'INCOME' | 'OUTCOME';
  totalAmount: number;
  count: number;
  categories: CategoryOption[];
  mode?: DashboardMode;
};

export function TransactionCardHeader({
  type,
  totalAmount,
  count,
  categories,
  mode = 'CURRENT',
}: TransactionCardHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isInput = type === 'INCOME';
  const actionLabel = isInput ? 'entrada' : 'saída';

  return (
    <>
      <div className='p-4 sm:p-5 py-4 flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/40 shrink-0 min-w-0'>
        <div className='flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1'>
          <ArrowTransaction type={type} />
          <div className='min-w-0 flex-1'>
            <p className='text-xs font-bold text-slate-800 dark:text-slate-100 truncate'>
              {isInput ? 'Entradas do mês' : 'Saídas do mês'}
            </p>
            <p className='text-[10px] text-slate-400 dark:text-slate-500 truncate'>
              {count} registros
            </p>
          </div>
        </div>


        <div className='flex items-center gap-2 sm:gap-3 shrink-0'>
          <p
            className={clsx(
              'text-[13px] sm:text-[14px] font-dm font-bold whitespace-nowrap text-right tracking-tight',
              {
                'text-primary-green dark:text-emerald-400': isInput,
                'text-home-red dark:text-rose-400': !isInput,
              },
            )}
          >
            {isInput ? '+' : '-'} {formatCurrency(totalAmount)}
          </p>
          <SecondaryButton
            onClick={() => setIsModalOpen(true)}
            className={clsx(
              'transition-colors border-0 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white p-0',
              {
                'bg-primary-green hover:bg-primary-green/90 dark:bg-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500/30':
                  isInput,
                'bg-home-red hover:bg-home-red/90 dark:bg-rose-500/20 dark:text-rose-400 dark:hover:bg-rose-500/30':
                  !isInput,
              },
            )}
            title={`Nova ${actionLabel}`}
          >
            <PlusIcon className='w-3.5 h-3.5' />
          </SecondaryButton>
        </div>
      </div>

      <CardCreateHome
        mode={mode}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={type}
        categories={categories}
      />
    </>
  );
}
