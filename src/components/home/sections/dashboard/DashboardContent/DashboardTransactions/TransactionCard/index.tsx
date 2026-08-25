import { PlusIcon } from 'lucide-react';
import { DashboardCard } from '../../ui/DashboardCard';
import { ArrowTransaction } from '@/components/home/ui/ArrowTransaction';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import Link from 'next/link';
import clsx from 'clsx';
import { Transaction } from './Transaction';

export function TransactionCard() {
  return (
    <DashboardCard className='p-0 h-[380px] flex flex-col justify-between overflow-hidden'>
      {/* Header */}
      <div className='p-5 py-4 flex items-center justify-between border-b border-slate-100 dark:border-[#26334d]/60 shrink-0'>
        <div className='flex items-center gap-3'>
          <ArrowTransaction type='input' />
          <div>
            <p className='text-xs font-bold text-slate-800 dark:text-white'>
              Entradas do mês
            </p>
            <p className='text-[10px] text-slate-400'>3 registros</p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <p className='text-xs font-dm font-bold text-primary-green'>
            +R$ 13.612,80
          </p>
          <SecondaryButton
            className={clsx(
              'bg-primary-green hover:bg-primary-green/90 transition-colors',
              'border-0 w-6 h-6 rounded-full',
              'flex items-center justify-center shrink-0',
            )}
            title='Nova Entrada'
          >
            <PlusIcon className='w-3.5 h-3.5 text-white' />
          </SecondaryButton>
        </div>
      </div>

      {/* Lista com Overflow/Scrollbar */}
      <div className='flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-[#26334d]/50 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-[#26334d] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent'>
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
      </div>

      {/* Footer Fixo */}
      <div className='px-5 py-3 border-t border-slate-100 dark:border-[#26334d]/60 flex items-center justify-between bg-slate-50/30 dark:bg-transparent shrink-0'>
        <Link
          href='/entradas'
          className='text-xs font-semibold text-primary-green hover:underline flex items-center gap-1 transition-all'
        >
          Ver todas as entradas &rarr;
        </Link>
      </div>
    </DashboardCard>
  );
}