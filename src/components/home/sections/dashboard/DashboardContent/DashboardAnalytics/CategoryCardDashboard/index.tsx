'use client'

import { Category } from '@prisma/client';
import { HomeCard } from '../../ui/DashboardCard';
import { CategoryDonutChart } from './CategoryDonutChart';
import { CategoryProgressBarList } from './CategoryProgressBarList';
import { calculateCategoryExpenses } from '@/utils/calculate-category-expenses';
import {
  calculateFinancialSummary,
  DashboardMode,
  FinancialSummaryTransactionItem,
} from '@/utils/calculate-financial-summary';
import { formatCurrency } from '@/utils/format-currency';

interface DashboardFinancialSummaryProps {
  transactions?: FinancialSummaryTransactionItem[];
  mode?: DashboardMode;
  userCategories?: Category[];
}

export function CategoryCardDashboard({
  transactions = [],
  mode = 'CURRENT',
  userCategories = [],
}: DashboardFinancialSummaryProps) {
  const expenseCategories = userCategories?.filter(c => {
    return c.type === 'OUTCOME';
  });

  const categories = calculateCategoryExpenses(
    transactions,
    expenseCategories,
    mode,
  );

  const donutData = categories.filter(c => c.amount > 0);

  const { totalExpenses } = calculateFinancialSummary(transactions, mode);

  const currentMonthYear = new Date().toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
  const formattedDate =
    currentMonthYear.charAt(0).toUpperCase() + currentMonthYear.slice(1);

  return (
    <HomeCard className='flex flex-col justify-between gap-4'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
            POR CATEGORIA {mode === 'SCHEDULED' && '(PREVISTO)'}
          </p>
          <p className='text-[10px] text-slate-400 mt-0.5'>
            Despesas de {formattedDate}
          </p>
        </div>

        <span className='font-dm text-sm font-bold text-slate-800 dark:text-white'>
          {formatCurrency(totalExpenses)}
        </span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-12 gap-4 items-center'>
        <div className='md:col-span-5'>
          {donutData.length > 0 ? (
            <CategoryDonutChart data={categories} />
          ) : (
            <div className='h-44 flex items-center justify-center text-xs text-slate-400 text-center px-4'>
              Sem despesas no período
            </div>
          )}
        </div>
        <div className='md:col-span-7'>
          <CategoryProgressBarList categories={categories} />
        </div>
      </div>
    </HomeCard>
  );
}
