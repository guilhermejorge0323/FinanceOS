'use client';

import { ReactNode, Suspense } from 'react';
import { useTab } from '@/components/home/context/homeContext';

type HomeTabContentProps = {
  dashboardSlot: ReactNode;
};

export function HomeTabContent({ dashboardSlot }: HomeTabContentProps) {
  const { activeTab } = useTab();

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
