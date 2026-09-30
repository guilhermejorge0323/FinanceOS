import { getAuthedCategories } from '@/lib/categories/getAuthedCategories';
import { DashboardAnalytics } from './DashboardAnalytics';
import { DashboardFinancialSummary } from './DashboardFinancialSummary';
import { DashboardTransactions } from './DashboardTransactions';
import { getAuthedTransactions } from '@/lib/transactions/getAuthedTransactions';
import { DashboardMode } from '@/utils/calculate-financial-summary';

interface DashboardContentProps {
  activeTab: DashboardMode;
}

export async function DashboardContent({ activeTab }: DashboardContentProps) {
  const [transactions, categories] = await Promise.all([
    getAuthedTransactions(),
    getAuthedCategories(),
  ]);
  return (
    <div className='flex flex-col gap-5'>
      <DashboardFinancialSummary transactions={transactions} mode={activeTab}/>
      <DashboardAnalytics transactions={transactions} userCategories={categories} mode={activeTab}/>
      <DashboardTransactions transactions={transactions} userCategories={categories} mode={activeTab}/>
    </div>
  );
}
