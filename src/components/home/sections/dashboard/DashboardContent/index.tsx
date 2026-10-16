import { getAuthedCategories } from '@/lib/categories/getAuthedCategories';
import { DashboardAnalytics } from './DashboardAnalytics';
import { DashboardFinancialSummary } from './DashboardFinancialSummary';
import { DashboardTransactions } from './DashboardTransactions';
import { getAuthedTransactions } from '@/lib/transactions/getAuthedTransactions';
import { DashboardMode } from '@/utils/calculate-financial-summary';
import { getSession } from '@/lib/session';


interface DashboardContentProps {
  activeTab: DashboardMode;
}

export async function DashboardContent({ activeTab }: DashboardContentProps) {
  const [transactions, categories, session] = await Promise.all([
    getAuthedTransactions(),
    getAuthedCategories(),
    getSession(), // Retorna o objeto com o userId (ex: session.userId)
  ]);

  const userId = session?.userId || '';

  return (
    <div className='flex flex-col gap-5'>
      <DashboardFinancialSummary transactions={transactions} mode={activeTab}/>
      <DashboardAnalytics transactions={transactions} userCategories={categories} mode={activeTab}/>
      <DashboardTransactions transactions={transactions} userCategories={categories} mode={activeTab} userId={userId} />
    </div>
  );
}
