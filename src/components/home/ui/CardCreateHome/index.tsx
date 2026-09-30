'use client';

import { useState, useTransition } from 'react';
import { XIcon, ArrowLeft, Loader2 } from 'lucide-react';
import { HomeCard } from '../../sections/dashboard/DashboardContent/ui/DashboardCard';
import { BackdropModal } from '../BackdropModal';
import { CategoryForm } from '../forms/CategoryForm';
import { TransactionForm, CategoryOption } from '../forms/TransactionForm';
import { createTransactionAction } from '@/actions/transaction/create-transaction-action';
import { createCategoryAction } from '@/actions/category/create-category-action';
import { DashboardMode } from '@/utils/calculate-financial-summary';

type CardCreateHomeProps = {
  type: 'INCOME' | 'OUTCOME';
  isOpen: boolean;
  onClose: () => void;
  categories?: CategoryOption[];
  mode?: DashboardMode;
};

export function CardCreateHome({
  isOpen,
  type,
  onClose,
  categories = [],
  mode = 'CURRENT',
}: CardCreateHomeProps) {
  const [view, setView] = useState<'TRANSACTION' | 'CATEGORY'>('TRANSACTION');
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleClose = () => {
    setView('TRANSACTION');
    setServerError(null);
    onClose();
  };

  const isIncome = type === 'INCOME';

  const handleCreateTransaction = (data: {
    type: 'INCOME' | 'OUTCOME';
    amount: number;
    categoryId: number;
    description: string;
    status?: 'PAID' | 'PENDING' | 'SCHEDULED' | 'PLANNED';
    dueDate?: string | Date;
    recurrence?: 'NONE' | 'MONTHLY' | 'YEARLY';
    parentId?: string;
  }) => {
    setServerError(null);

    startTransition(async () => {
      const response = await createTransactionAction(data);

      if (!response.success) {
        setServerError(response.error || 'Erro ao registrar transação.');
        return;
      }

      handleClose();
    });
  };

  const handleCreateCategory = (data: {
    name: string;
    type: 'INCOME' | 'OUTCOME';
    icon: string;
  }) => {
    setServerError(null);

    startTransition(async () => {
      const response = await createCategoryAction(data);

      if (!response.success) {
        setServerError(response.error || 'Erro ao registrar categoria.');
        return;
      }

      setView('TRANSACTION');
    });
  };

  return (
    <BackdropModal isOpen={isOpen} onClose={handleClose}>
      <HomeCard className='max-w-md w-full p-0 relative'>
        <div className='flex items-center justify-between pt-5 pb-4 border-b border-slate-200 dark:border-[#26334d] px-6'>
          <div className='flex items-center gap-2'>
            {view === 'CATEGORY' && (
              <button
                type='button'
                disabled={isPending}
                onClick={() => setView('TRANSACTION')}
                className='p-1 -ml-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer disabled:opacity-50'
              >
                <ArrowLeft className='w-4 h-4' />
              </button>
            )}
            <div>
              <h3 className='text-sm font-bold text-slate-900 dark:text-white'>
                {view === 'TRANSACTION'
                  ? `Criar transação de ${isIncome ? 'ENTRADA' : 'SAÍDA'}`
                  : `Criar nova categoria de ${isIncome ? 'ENTRADA' : 'SAÍDA'}`}
              </h3>
              <p className='text-xs text-slate-400 dark:text-primary-text-dark mt-0.5'>
                {view === 'TRANSACTION'
                  ? 'Preencha os dados da transação'
                  : 'Criação personalizada'}
              </p>
            </div>
          </div>

          <button type='button' onClick={handleClose} disabled={isPending}>
            <XIcon className='w-4 h-4 text-slate-400 hover:text-slate-600 dark:text-primary-text-dark dark:hover:text-white cursor-pointer transition-colors disabled:opacity-50' />
          </button>
        </div>

        {serverError && (
          <div className='mx-6 mt-4 p-3 text-xs rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-medium'>
            {serverError}
          </div>
        )}

        <div className='p-6'>
          {view === 'TRANSACTION' ? (
            <TransactionForm
              initialType={type}
              mode={mode}
              showTypeToggle={false}
              categories={categories}
              isLoading={isPending}
              onCreateCategory={() => setView('CATEGORY')}
              onSubmit={handleCreateTransaction}
            />
          ) : (
            <CategoryForm initialType={type} onSubmit={handleCreateCategory} />
          )}
        </div>
      </HomeCard>
    </BackdropModal>
  );
}
