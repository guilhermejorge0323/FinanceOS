'use client';

import clsx from 'clsx';
import { LucideProps } from 'lucide-react';
import { ComponentProps, ComponentType, useId } from 'react';

type InputAuthProps = {
  type: 'text' | 'email';
  label: string;
  icon: ComponentType<LucideProps>;
  placeholder: string;
} & ComponentProps<'div'>;

export function InputAuth({
  type,
  label,
  icon: Icon,
  className,
  placeholder,
}: InputAuthProps) {
  const idInput = useId();

  return (
      <div className='flex flex-col gap-1.5'>
        <label className='font-medium text-sm' htmlFor={idInput}>
          {label}
        </label>
        <div className='relative'>
          <Icon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none' />
          <input
            className={clsx(
              'w-full',
              'pl-10 pr-4 py-2.5',
              'bg-input-background border border-slate-300 rounded-xl',
              'text-sm outline-none',
              'focus:border-primary-green focus:ring-2 focus:ring-primary-green/20',
              'transition-all',
              className,
            )}
            type={type}
            name={type}
            id={idInput}
            placeholder={placeholder}
          />
        </div>
      </div>
  );
}
