import { WalletIcon } from 'lucide-react';
import { DashboardCard } from '../ui/DashboardCard';
import { FinancialSummaryCard } from './FinancialSummaryCard';
import { calculateFinancialSummary } from '@/utils/calculate-financial-summary';
import { formatCurrency } from '@/utils/format-currency';
import { getAuthedTransactions } from '@/lib/transactions/get-authed-transactions';

export async function DashboardFinancialSummary() {
  const transactions = await getAuthedTransactions();

  const { balance, totalIncomes, incomesCount, totalExpenses, expensesCount } =
    calculateFinancialSummary(transactions);

  return (
    <div className='grid grid-cols-1 2xl:grid-cols-4 gap-4'>
      <DashboardCard className=' 2xl:col-span-2 bg-home-dark-blue dark:bg-[#128667]'>
        <div className='flex items-center justify-between'>
          <span className='text-white/70 tracking-wider text-xs font-semibold'>
            SALDO LIVRE
          </span>
          <div className='w-8 h-8 rounded-full bg-white/10 flex items-center justify-center'>
            <WalletIcon className='w-3.75 h-3.75 text-white' />
          </div>
        </div>

        <div>
          <p className='text-4xl font-bold tracking-tight text-white font-dm'>
            R$ {formatCurrency(balance)}
          </p>
          <p className='text-xs text-white/50 mt-1.5'>
            Entradas − Despesas do mês
          </p>
        </div>
      </DashboardCard>

      <FinancialSummaryCard
        title='ENTRADAS'
        value={`R$ ${formatCurrency(totalIncomes)}`}
        subtext={`${incomesCount} Entradas`}
        typeCard='input'
      />

      <FinancialSummaryCard
        title='SAÍDAS'
        value={`R$ ${formatCurrency(totalExpenses)}`}
        subtext={`${expensesCount} Entradas`}
        typeCard='output'
      />
    </div>
  );
}
