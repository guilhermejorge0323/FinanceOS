'use client';

import { ReactNode, Suspense } from 'react';
import { useTab } from '@/components/home/context/homeContext';
import { useTransactionsRealtime } from '@/hooks/use-transactions-realtime';

type HomeTabContentProps = {
  userId: string;
  dashboardSlot: ReactNode;
};

export function HomeTabContent({ userId, dashboardSlot }: HomeTabContentProps) {
  const { activeTab } = useTab();

  useTransactionsRealtime(userId);

  return (
    <>
      {activeTab === 'Dashboard' && (
        <Suspense
          fallback={
            <div className='h-40 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800/40' />
          }
        >
          {dashboardSlot}
        </Suspense>
      )}
      {activeTab === 'Transações' && <div>Conteúdo das Transações</div>}
      {activeTab === 'Análise IA' && <div>Conteúdo da Análise IA</div>}
    </>
  );
}
