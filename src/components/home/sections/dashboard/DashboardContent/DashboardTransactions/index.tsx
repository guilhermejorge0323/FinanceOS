'use client';

import { DashboardMode } from '@/utils/calculate-financial-summary';
import { TransactionCard } from './TransactionCard';
import { CategoryOption } from '@/components/home/ui/forms/TransactionForm';

interface DashboardTransactionsProps {
  transactions?: any[];
  mode?: DashboardMode;
  userCategories: CategoryOption[];
}

export function DashboardTransactions({
  transactions = [],
  mode = 'CURRENT',
  userCategories,
}: DashboardTransactionsProps) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      <TransactionCard
        transactions={transactions}
        mode={mode}
        categories={userCategories}
        type='INCOME'
      />

      <TransactionCard
        transactions={transactions}
        mode={mode}
        categories={userCategories}
        type='OUTCOME'
      />
    </div>
  );
}
