'use client';

import { useState } from 'react';
import clsx from 'clsx';
import {
  SaveIcon,
  Plus,
  Loader2,
  Calendar,
  Repeat,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { ValueInput } from './ValueInput';
import { BaseHomeInput } from '../BaseHomeInput';
import { transactionSchema } from '@/schemas/transactions/transaction-schema';
import { getCategoryIcon } from '@/utils/category-icons';
import { DashboardMode } from '@/utils/calculate-financial-summary';

export type TransactionType = 'INCOME' | 'OUTCOME';

export type TransactionStatus = 'PLANNED' | 'PENDING';
export type RecurrenceOption = 'NONE' | 'MONTHLY' | 'YEARLY';

export type CategoryOption = {
  id: number;
  name: string;
  type: TransactionType;
  icon?: string | null;
  isCustom?: boolean;
};

export type TransactionFormProps = {
  initialType?: TransactionType;
  showTypeToggle?: boolean;
  categories?: CategoryOption[];
  isLoading?: boolean;
  mode?: DashboardMode;
  onCreateCategory?: () => void;
  onSubmit: (data: {
    type: TransactionType;
    amount: number;
    categoryId: number;
    description: string;
    status?: 'PAID' | 'PENDING' | 'SCHEDULED' | 'PLANNED';
    dueDate?: string;
    recurrence?: RecurrenceOption;
    parentId?: string;
  }) => void;
};

export function TransactionForm({
  initialType = 'INCOME',
  showTypeToggle = true,
  categories = [],
  isLoading = false,
  mode = 'CURRENT',
  onCreateCategory,
  onSubmit,
}: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>(initialType);
  const [amount, setAmount] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [description, setDescription] = useState('');

  const [status, setStatus] = useState<TransactionStatus>(
    mode === 'SCHEDULED' ? 'PENDING' : 'PLANNED',
  );
  const [dueDate, setDueDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const [recurrence, setRecurrence] = useState<RecurrenceOption>('NONE');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isIncome = type === 'INCOME';
  const isPlanned = status === 'PLANNED';

  const filteredCategories = categories.filter(c => c.type === type);
  const customCategoriesCount = filteredCategories.filter(
    c => c.isCustom,
  ).length;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    const payload = {
      type,
      amount,
      categoryId,
      description: description ?? '',
    };

    const validation = transactionSchema.safeParse(payload);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach(issue => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (!categoryId) {
      setErrors(prev => ({ ...prev, categoryId: 'Selecione uma categoria' }));
      return;
    }

    onSubmit({
      type,
      amount: Number(amount),
      categoryId,
      description: description ?? '',
      status: mode === 'SCHEDULED' ? status : 'PAID',
      dueDate:
        mode === 'SCHEDULED' && !isPlanned && dueDate
          ? new Date(dueDate).toISOString()
          : undefined,
      recurrence: mode === 'SCHEDULED' && !isPlanned ? recurrence : 'NONE',
    });
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      {showTypeToggle && (
        <div className='flex gap-2'>
          <button
            type='button'
            disabled={isLoading}
            onClick={() => {
              setType('INCOME');
              setCategoryId(null);
            }}
            className={clsx(
              'flex-1 py-2.5 sm:py-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer',
              isIncome
                ? 'bg-primary-green text-white shadow-md'
                : 'text-slate-600 bg-slate-100 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white dark:bg-[#26334d]',
            )}
          >
            💸 Entrada
          </button>
          <button
            type='button'
            disabled={isLoading}
            onClick={() => {
              setType('OUTCOME');
              setCategoryId(null);
            }}
            className={clsx(
              'flex-1 py-2.5 sm:py-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer',
              !isIncome
                ? 'bg-home-red text-white shadow-md'
                : 'text-slate-600 bg-slate-100 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white dark:bg-[#26334d]',
            )}
          >
            💸 Saída
          </button>
        </div>
      )}

      <div>
        <ValueInput
          onChange={numericValue => {
            setAmount(numericValue);
            if (errors.amount) setErrors(prev => ({ ...prev, amount: '' }));
          }}
        />
        {errors.amount && (
          <span className='text-[10px] text-amber-500 font-medium mt-1 block'>
            {errors.amount}
          </span>
        )}
      </div>

      {mode === 'SCHEDULED' && (
        <div className='flex flex-col gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50/70 dark:bg-[#1a2333]/50 border border-slate-200/80 dark:border-[#26334d] transition-all'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <div>
              <label className='text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block mb-1.5'>
                STATUS
              </label>
              <div className='flex rounded-xl bg-slate-200/60 dark:bg-[#151c28] p-1 border border-transparent dark:border-[#26334d]'>
                <button
                  type='button'
                  onClick={() => setStatus('PENDING')}
                  className={clsx(
                    'flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer',
                    status === 'PENDING'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
                  )}
                >
                  <Clock className='w-3.5 h-3.5' />
                  Agendar
                </button>
                <button
                  type='button'
                  onClick={() => setStatus('PLANNED')}
                  className={clsx(
                    'flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer',
                    status === 'PLANNED'
                      ? isIncome
                        ? 'bg-primary-green text-white shadow-sm'
                        : 'bg-home-red text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
                  )}
                >
                  <CheckCircle2 className='w-3.5 h-3.5' />
                  Planejar
                </button>
              </div>
            </div>

            <div>
              <label
                className={clsx(
                  'text-[10px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 transition-colors',
                  isPlanned
                    ? 'text-slate-300 dark:text-slate-600'
                    : 'text-slate-400 dark:text-slate-400',
                )}
              >
                <Calendar className='w-3 h-3 text-slate-400' /> DATA
              </label>
              <input
                type='date'
                value={dueDate}
                disabled={isPlanned || isLoading}
                onChange={e => setDueDate(e.target.value)}
                className={clsx(
                  'w-full px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-[#26334d] bg-white dark:bg-[#151c28] text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-700 h-9.5 transition-all',
                  isPlanned
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-[#111722]'
                    : 'cursor-pointer',
                )}
              />
            </div>
          </div>

          <div>
            <label
              className={clsx(
                'text-[10px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 transition-colors',
                isPlanned
                  ? 'text-slate-300 dark:text-slate-600'
                  : 'text-slate-400 dark:text-slate-400',
              )}
            >
              <Repeat className='w-3 h-3 text-slate-400' /> REPETIÇÃO
            </label>
            <select
              value={recurrence}
              disabled={isPlanned || isLoading}
              onChange={e => setRecurrence(e.target.value as RecurrenceOption)}
              className={clsx(
                'w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-[#26334d] bg-white dark:bg-[#151c28] text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-700 h-[38px] transition-all',
                isPlanned
                  ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-[#111722]'
                  : 'cursor-pointer',
              )}
            >
              <option value='NONE'>Uma única vez (Sem repetição)</option>
              <option value='MONTHLY'>Mensal (Repete todo mês)</option>
              <option value='YEARLY'>Anual (Repete todo ano)</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <div className='flex items-center justify-between mb-1.5'>
          <label className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
            CATEGORIA
          </label>
        </div>

        <div className='flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1'>
          {filteredCategories.map(cat => {
            const isSelected = categoryId === cat.id;
            return (
              <button
                key={cat.id}
                type='button'
                disabled={isLoading}
                onClick={() => {
                  setCategoryId(cat.id);
                  if (errors.categoryId)
                    setErrors(prev => ({ ...prev, categoryId: '' }));
                }}
                className={clsx(
                  'px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border flex items-center gap-1.5',
                  isSelected
                    ? isIncome
                      ? 'bg-primary-green/10 border-primary-green text-primary-green dark:text-emerald-400 font-bold shadow-sm'
                      : 'bg-home-red/10 border-home-red text-home-red dark:text-rose-400 font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800/50 border-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800',
                )}
              >
                <span>{getCategoryIcon(cat.icon)}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}

          {customCategoriesCount < 5 && (
            <button
              type='button'
              disabled={isLoading}
              onClick={onCreateCategory}
              className={clsx(
                'px-3 py-1.5',
                'rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600',
                'text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
                'transition-all cursor-pointer',
                'flex items-center gap-1',
                'bg-slate-50/50 dark:bg-slate-900/50',
              )}
            >
              <Plus className='w-3.5 h-3.5' />
              Nova
            </button>
          )}
        </div>

        {errors.categoryId && (
          <span className='text-[10px] text-amber-500 font-medium mt-1 block'>
            {errors.categoryId}
          </span>
        )}
      </div>

      <BaseHomeInput
        label='Descrição (Opcional)'
        type={type}
        placeholder='Ex.: Mercado, salário, academia...'
        value={description}
        error={errors.description}
        onChange={e => {
          setDescription(e.target.value);
          if (errors.description)
            setErrors(prev => ({ ...prev, description: '' }));
        }}
      />

      <button
        type='submit'
        disabled={isLoading}
        className={clsx(
          'w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer mt-1 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed',
          isIncome
            ? 'bg-primary-green hover:bg-emerald-600 shadow-primary-green/20'
            : 'bg-home-red hover:bg-rose-600 shadow-home-red/20',
        )}
      >
        {isLoading ? (
          <Loader2 className='w-4 h-4 animate-spin' />
        ) : (
          <>
            <SaveIcon className='w-4 h-4' />
            Registrar {isIncome ? 'Entrada' : 'Saída'}
          </>
        )}
      </button>
    </form>
  );
}
