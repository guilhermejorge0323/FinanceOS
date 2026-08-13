'use client';

import { useTab } from '@/components/home/context/homeContext';

export default function Home() {
  const { activeTab } = useTab();

  return (
    <>
      {activeTab === 'Dashboard' && <div className='h-1000 dark:text-primary-home'>Conteúdo da Dashboard</div>}
      {activeTab === 'Transações' && <div>Conteúdo das Transações</div>}
      {activeTab === 'Análise IA' && <div>Conteúdo da Análise IA</div>}
    </>
  );
}
