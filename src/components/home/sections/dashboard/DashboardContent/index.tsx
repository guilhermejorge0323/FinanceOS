import { Suspense } from 'react';
import { DashboardAnalytics } from './DashboardAnalytics';
import { DashboardFinancialSummary } from './DashboardFinancialSummary';
import { DashboardTransactions } from './DashboardTransactions';

export function DashboardContent() {
  return (
    <div className='flex flex-col gap-5'>
      <Suspense
        fallback={
          <div className='h-[160px] rounded-xl bg-slate-100 dark:bg-slate-800/40 animate-pulse w-full flex items-center justify-center'>
            <span className='text-xs font-medium text-slate-400 dark:text-slate-500'>
              Carregando conteúdo...
            </span>
          </div>
        }
      >
        <DashboardFinancialSummary />
        <DashboardAnalytics />
        <DashboardTransactions />
      </Suspense>
    </div>
  );
}
