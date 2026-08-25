import { ElementType, ReactNode } from 'react';
import { DashboardCard } from '../../ui/DashboardCard';
import { ArrowTransaction } from '@/components/home/ui/ArrowTransaction';


interface FinancialSummaryCardProps {
  title: string;
  value: string;
  subtext: string;
  typeCard: 'input' | 'output'
}

export function FinancialSummaryCard({
  title,
  value,
  subtext,
  typeCard

}: FinancialSummaryCardProps) {
  return (
    <DashboardCard className='flex flex-col justify-between'>
      <div className='flex items-center justify-between mb-1.5'>
        <span className='tracking-wider text-muted-gray text-xs font-semibold dark:text-slate-400'>
          {title}
        </span>
        <ArrowTransaction type={typeCard}/>
      </div>

      <div>
        <p className='font-dm text-2xl font-semibold text-slate-900 dark:text-white'>
          {value}
        </p>
      </div>

      <div>
        <p className='text-xs text-slate-400 mt-1.5'>{subtext}</p>
      </div>
    </DashboardCard>
  );
}
