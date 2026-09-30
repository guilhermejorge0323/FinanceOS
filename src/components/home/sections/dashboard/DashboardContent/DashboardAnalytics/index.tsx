import { DashboardMode, FinancialSummaryTransactionItem } from '@/utils/calculate-financial-summary';
import { CategoryCardDashboard } from './CategoryCardDashboard';
import { ScoreCardDashboard } from './ScoreCardDashboard';
import { Category } from '@prisma/client';

interface DashboardAnalyticsProps {
  transactions: FinancialSummaryTransactionItem[];
  mode?: DashboardMode;
  userCategories: Category[];
}

export function DashboardAnalytics({ transactions, mode, userCategories }: DashboardAnalyticsProps ) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      <ScoreCardDashboard />
      <CategoryCardDashboard transactions={transactions} mode={mode} userCategories={userCategories}/>
    </div>
  );
}
