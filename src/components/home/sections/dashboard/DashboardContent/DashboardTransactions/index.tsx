'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardMode } from '@/utils/calculate-financial-summary';
import { TransactionCard } from './TransactionCard';
import { CategoryOption } from '@/components/home/ui/forms/TransactionForm';
import { pusherClient } from '@/lib/pusher/pusher-client';

interface DashboardTransactionsProps {
  transactions?: any[];
  mode?: DashboardMode;
  userCategories: CategoryOption[];
  userId: string;
}

export function DashboardTransactions({
  transactions = [],
  mode = 'CURRENT',
  userCategories,
  userId,
}: DashboardTransactionsProps) {
  const router = useRouter();

  useEffect(() => {
    if (!userId) return;
    const channel = pusherClient.subscribe(`user-${userId}`);

    channel.bind('transaction-update', (data: any) => {
      router.refresh();
    });

    return () => {
      pusherClient.unsubscribe(`user-${userId}`);
    };
  }, [userId, router]);

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
