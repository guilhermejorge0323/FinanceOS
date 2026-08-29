'use client';

import { deleteTransactionAction } from '@/actions/transaction/delete-transaction-action';
import { getCategoryIcon } from '@/utils/category-icons';
import { formatCurrency } from '@/utils/format-currency';
import clsx from 'clsx';
import { Loader2, Trash2Icon } from 'lucide-react';
import { useTransition } from 'react';

type TransactionProps = {
  type: 'input' | 'output';
  data: {
    id: string;
    description: string;
    amount: any;
    date: Date;
    category?: { name: string; icon: string } | null;
  };
};

export function Transaction({ type, data }: TransactionProps) {
  const isInput = type === 'input';

  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteTransactionAction(data.id);
      } catch (error) {
        console.error('Erro ao deletar transacao', error);
      }
    });
  };

  return (
    <div className='group px-5 py-3 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors'>
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-sm shrink-0 border border-slate-200/50 dark:border-slate-700/50'>
          {getCategoryIcon(data.category?.icon)}
        </div>
        <div className='flex flex-col gap-0.5'>
          <p className='text-xs font-semibold text-slate-800 dark:text-slate-200'>
            {data.description}
          </p>
          <div className='flex gap-2 items-center'>
            <span className='text-[9px] font-medium px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500 dark:text-slate-400 border border-slate-200/40 dark:border-slate-700/40'>
              {data.category?.name || 'Geral'}
            </span>
            <span className='text-[9px] text-slate-400 dark:text-slate-500'>
              {new Date(data.date).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <p
          className={clsx('text-xs font-dm font-semibold text-right', {
            'text-primary-green dark:text-emerald-400': isInput,
            'text-home-red dark:text-rose-400': !isInput,
          })}
        >
          {isInput ? '+' : '-'}R$ {formatCurrency(data.amount)}
        </p>

        <button
          onClick={handleDelete}
          type='button'
          title='Excluir transação'
          className={clsx(
            'transition-all duration-200 p-1.5 rounded-md cursor-pointer',
            isPending
              ? 'opacity-100 text-rose-500'
              : 'opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 dark:hover:bg-rose-500/20',
          )}
        >
          {isPending ? (
            <Loader2 className='w-3.5 h-3.5 animate-spin' />
          ) : (
            <Trash2Icon className='w-3.5 h-3.5' />
          )}
        </button>
      </div>
    </div>
  );
}
