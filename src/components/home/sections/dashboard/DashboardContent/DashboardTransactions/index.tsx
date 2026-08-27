import { Suspense } from 'react';
import { TransactionCard } from './TransactionCard';

export function DashboardTransactions() {
  return (
    /* 🟢 Apenas 1 grid container lidando com os 2 cards diretamente */
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <TransactionCard type='input' />

        <TransactionCard type='output' />
    </div>
  );
}
