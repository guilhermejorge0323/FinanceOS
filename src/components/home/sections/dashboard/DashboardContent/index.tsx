import { DashboardAnalytics } from './DashboardAnalytics';
import { DashboardFinancialSummary } from './DashboardFinancialSummary';
import { DashboardTransactions } from './DashboardTransactions';

export function DashboardContent() {
  return (
    <div className='flex flex-col gap-5'>
       <DashboardFinancialSummary />
       <DashboardAnalytics />
       <DashboardTransactions />
    </div>
  );
}
