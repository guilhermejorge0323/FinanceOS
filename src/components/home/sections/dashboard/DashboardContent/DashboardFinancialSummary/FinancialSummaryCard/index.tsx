import { ArrowTransaction } from '@/components/home/ui/ArrowTransaction';
import { HomeCard } from '../../ui/DashboardCard';

interface FinancialSummaryCardProps {
  title: string;
  value: string;
  subtext: string;
  typeCard: 'INCOME' | 'OUTCOME';
}

export function FinancialSummaryCard({
  title,
  value,
  subtext,
  typeCard,
}: FinancialSummaryCardProps) {
  return (
    <HomeCard className='flex flex-col justify-between p-5 min-w-0 overflow-hidden'>
      <div className='flex items-center justify-between gap-2 mb-1.5'>
        <span className='tracking-wider text-muted-gray text-xs font-semibold dark:text-slate-400 truncate'>
          {title}
        </span>
        <ArrowTransaction type={typeCard} />
      </div>

      <div className='min-w-0 my-1'>
        <p className='font-dm text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 dark:text-white truncate tracking-tight'>
          {value}
        </p>
      </div>

      <div>
        <p className='text-xs text-slate-400 mt-1 truncate'>{subtext}</p>
      </div>
    </HomeCard>
  );
}
