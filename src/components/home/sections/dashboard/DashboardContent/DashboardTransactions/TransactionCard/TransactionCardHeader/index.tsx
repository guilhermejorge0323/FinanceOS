'use client';

import { ArrowTransaction } from '@/components/home/ui/ArrowTransaction';
import { BackdropModal } from '@/components/home/ui/BackdropModal';
import { CardCreateHome } from '@/components/home/ui/CardCreateHome';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { formatCurrency } from '@/utils/format-currency';
import clsx from 'clsx';
import { PlusIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

type TransactionCardHeaderProps = {
  type: 'input' | 'output';
  totalAmount: number;
  count: number;
};

export function TransactionCardHeader({
  type,
  totalAmount,
  count,
}: TransactionCardHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isInput = type === 'input';
  const actionLabel = isInput ? 'entrada' : 'saída';

  return (
    <>
      <div className='p-5 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/40 shrink-0'>
        <div className='flex items-center gap-3'>
          <ArrowTransaction type={type} />
          <div>
            <p className='text-xs font-bold text-slate-800 dark:text-slate-100'>
              {isInput ? 'Entradas do mês' : 'Saídas do mês'}
            </p>
            <p className='text-[10px] text-slate-400 dark:text-slate-500'>
              {count} registros
            </p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <p
            className={clsx('text-xs font-dm font-bold', {
              'text-primary-green dark:text-emerald-400': isInput,
              'text-home-red dark:text-rose-400': !isInput,
            })}
          >
            {isInput ? '+' : '-'}R$ {formatCurrency(totalAmount)}
          </p>
          <SecondaryButton
            onClick={() => setIsModalOpen(true)}
            className={clsx(
              'transition-colors border-0 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white',
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

      <CardCreateHome isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </>
  );
}
