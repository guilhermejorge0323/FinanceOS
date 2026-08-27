'use client';

import { ReactNode } from 'react';
import { useTab } from '@/components/home/context/homeContext';

type HomeTabContentProps = {
  dashboardSlot: ReactNode;
};

export function HomeTabContent({ dashboardSlot }: HomeTabContentProps) {
  const { activeTab } = useTab();

  return (
    <>
      {activeTab === 'Dashboard' && dashboardSlot}
      {activeTab === 'Transações' && <div>Conteúdo das Transações</div>}
      {activeTab === 'Análise IA' && <div>Conteúdo da Análise IA</div>}
    </>
  );
}
