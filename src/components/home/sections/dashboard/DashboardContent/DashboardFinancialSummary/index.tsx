import { WalletIcon } from 'lucide-react';
import { HomeCard } from '../ui/DashboardCard';
import { FinancialSummaryCard } from './FinancialSummaryCard';
import {
  calculateFinancialSummary,
  DashboardMode,
  FinancialSummaryTransactionItem,
} from '@/utils/calculate-financial-summary';
import { formatCurrency } from '@/utils/format-currency';


interface DashboardFinancialSummaryProps {
  transactions?: FinancialSummaryTransactionItem[];
  mode?: DashboardMode;
}

export async function DashboardFinancialSummary({
  transactions = [],
  mode = 'CURRENT',
}: DashboardFinancialSummaryProps) {
  const { balance, totalIncomes, incomesCount, totalExpenses, expensesCount } =
    calculateFinancialSummary(transactions, mode);

  const isScheduled = mode === 'SCHEDULED';

  return (
    <div className='grid grid-cols-1 2xl:grid-cols-4 gap-4'>
      <HomeCard className=' 2xl:col-span-2 bg-home-dark-blue dark:bg-[#128667]'>
        <div className='flex items-center justify-between'>
          <span className='text-white/70 tracking-wider text-xs font-semibold'>
            {isScheduled ? 'SALDO LIVRE (PREVISTO)' : 'SALDO LIVRE'}
          </span>
          <div className='w-8 h-8 rounded-full bg-white/10 flex items-center justify-center'>
            <WalletIcon className='w-3.75 h-3.75 text-white' />
          </div>
        </div>

        <div>
          <p className='text-4xl font-bold tracking-tight text-white font-dm'>
            {formatCurrency(balance)}
          </p>
          <p className='text-xs text-white/50 mt-1.5'>
            {isScheduled ? 'Projeção: Entradas − Despesas' : 'Entradas − Despesas'}
          </p>
        </div>
      </HomeCard>

      <FinancialSummaryCard
        title={isScheduled ? 'ENTRADAS PREVISTAS' : 'ENTRADAS'}
        value={`${formatCurrency(totalIncomes)}`}
        subtext={`${incomesCount} Entradas`}
        typeCard='INCOME'
      />

      <FinancialSummaryCard
        title={isScheduled ? 'SAÍDAS PREVISTAS' : 'SAÍDAS'}
        value={`${formatCurrency(totalExpenses)}`}
        subtext={`${expensesCount} Saidas`}
        typeCard='OUTCOME'
      />
    </div>
  );
}
