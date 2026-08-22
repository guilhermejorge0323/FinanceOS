'use client';

import { useTab } from '@/components/home/context/homeContext';
import { DashBoard } from '@/components/home/sections/dashboard';

export default function Home() {
  const { activeTab } = useTab();

  return (
    <>
      {activeTab === 'Dashboard' && <DashBoard />}
      {activeTab === 'Transações' && <div>Conteúdo das Transações</div>}
      {activeTab === 'Análise IA' && <div>Conteúdo da Análise IA</div>}
    </>
  );
}
