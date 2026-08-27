import { getAuthedTransactions } from '@/lib/transactions/get-authed-transactions';
import { DashboardCard } from '../../ui/DashboardCard';
import { CategoryDonutChart, CategoryData } from './CategoryDonutChart';
import { CategoryProgressBarList } from './CategoryProgressBarList';
import { calculateCategoryExpenses } from '@/utils/calculate-category-expenses';
import { calculateFinancialSummary } from '@/utils/calculate-financial-summary';
import { formatCurrency } from '@/utils/format-currency';


export async function CategoryCardDashboard() {
  const transactions = await getAuthedTransactions();

  const categories = calculateCategoryExpenses(transactions);

  const { totalExpenses } = calculateFinancialSummary(transactions);

  const currentMonthYear = new Date().toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
  const formattedDate =
    currentMonthYear.charAt(0).toUpperCase() + currentMonthYear.slice(1);

  return (
    <DashboardCard className='flex flex-col justify-between gap-4'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
            POR CATEGORIA
          </p>
          <p className='text-[10px] text-slate-400 mt-0.5'>
            Despesas de {formattedDate}
          </p>
        </div>

        <span className='font-dm text-sm font-bold text-slate-800 dark:text-white'>
          R$ {formatCurrency(totalExpenses)}
        </span>
      </div>

      {categories.length === 0 ? (
        <div className='flex h-44 items-center justify-center text-xs text-slate-400'>
          Nenhuma despesa cadastrada neste mês.
        </div>
      ) : (
        /* Grid com os 2 componentes visuais */
        <div className='grid grid-cols-1 md:grid-cols-12 gap-4 items-center'>
          <div className='md:col-span-5'>
            <CategoryDonutChart data={categories} />
          </div>
          <div className='md:col-span-7'>
            <CategoryProgressBarList categories={categories} />
          </div>
        </div>
      )}
    </DashboardCard>
  );
}
