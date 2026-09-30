'use client';

import { categorySchema } from '@/schemas/category/category-schema';
import { cn } from '@/utils/mergeTailwind';
import clsx from 'clsx';
import { SaveIcon } from 'lucide-react';
import { useState } from 'react';
import { BaseHomeInput } from '../BaseHomeInput';
import { IconPicker } from './IconPicker';

export type CategoryFormProps = {
  initialType?: 'INCOME' | 'OUTCOME';
  onBack?: () => void;
  onSubmit?: (data: { name: string; type: 'INCOME' | 'OUTCOME'; icon: string }) => void;
  className?: string;
};

export function CategoryForm({
  initialType = 'INCOME',
  onBack,
  onSubmit,
  className,
}: CategoryFormProps) {
  const [type] = useState<'INCOME' | 'OUTCOME'>(initialType);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(
    type === 'INCOME' ? 'Briefcase' : 'Utensils',
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isIncome = type === 'INCOME';

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = categorySchema.safeParse({
      name,
      type,
      icon,
    });

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

    setErrors({});


    if (onSubmit) {
      onSubmit(validation.data);
    }

    if (onBack) {
      onBack();
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={cn('flex flex-col gap-4', className)}
    >
      <BaseHomeInput
        type={type}
        label='Nome da categoria'
        placeholder='Ex: Alimentação, Investimentos...'
        maxLength={18}
        value={name}
        error={errors.name}
        onChange={e => {
          setName(e.target.value);
          if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
        }}
      />

      <IconPicker
        type={type}
        value={icon}
        onChange={selectedIcon => {
          setIcon(selectedIcon);
          if (errors.icon) setErrors(prev => ({ ...prev, icon: '' }));
        }}
      />

      <div>
        <div className='flex gap-2 mt-2'>
          <button
            type='submit'
            className={clsx(
              'flex flex-1 items-center justify-center gap-1.5',
              'py-2.5',
              'rounded-xl',
              'text-xs font-bold text-white',
              'cursor-pointer transition-colors shadow-lg',
              {
                'bg-primary-green hover:bg-emerald-600 shadow-primary-green/20': isIncome,
                'bg-home-red hover:bg-rose-600 shadow-home-red/20': !isIncome,
              },
            )}
          >
            <SaveIcon className='w-3.5 h-3.5' />
            Salvar Categoria
          </button>
        </div>
      </div>
    </form>
  );
}
