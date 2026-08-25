'use client';

import { DashboardCard } from '../../ui/DashboardCard';
import { CategoryDonutChart, CategoryData } from './CategoryDonutChart';
import { CategoryProgressBarList } from './CategoryProgressBarList';

// MOCK ESTÁTICO (Pronto para vir do banco/API no futuro)
const MOCK_CATEGORIES: CategoryData[] = [
  { id: '1', name: 'Moradia', amount: 2800, percentage: 45, color: '#3b82f6' },
  { id: '2', name: 'Alimentação', amount: 1240, percentage: 20, color: '#f59e0b' },
  { id: '3', name: 'Transporte', amount: 680, percentage: 11, color: '#8b5cf6' },
  { id: '4', name: 'Lazer', amount: 420, percentage: 7, color: '#ef4444' },
  { id: '5', name: 'Saúde', amount: 380, percentage: 6, color: '#10b981' },
  { id: '6', name: 'Outros', amount: 680, percentage: 11, color: '#64748b' },
];

export function CategoryCardDashboard() {
  const totalExpenses = MOCK_CATEGORIES.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <DashboardCard className='flex flex-col justify-between gap-4'>
      {/* Cabeçalho */}
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
            POR CATEGORIA
          </p>
          <p className='text-[10px] text-slate-400 mt-0.5'>
            Despesas de Julho 2026
          </p>
        </div>

        <span className='font-dm text-sm font-bold text-slate-800 dark:text-white'>
          R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Grid com os 2 componentes */}
      <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
        <div className='md:col-span-5'>
          <CategoryDonutChart data={MOCK_CATEGORIES} />
        </div>
        <div className='md:col-span-7'>
          <CategoryProgressBarList categories={MOCK_CATEGORIES} />
        </div>
      </div>
    </DashboardCard>
  );
}
