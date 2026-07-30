'use client';

import clsx from 'clsx';
import { LucideProps } from 'lucide-react';
import { ComponentProps, ComponentType, useId, useState } from 'react';

type InputAuthProps = {
  type: 'text' | 'email';
  label: string;
  icon: ComponentType<LucideProps>;
  placeholder: string;
  error?: string;
  onValidChange?: (isValid: boolean) => void;
} & ComponentProps<'input'>;

export function InputAuth({
  type,
  label,
  icon: Icon,
  className,
  placeholder,
  onChange,
  onValidChange,
  error,
  ...props
}: InputAuthProps) {
  const idInput = useId();
  const [value, setValue] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setValue(val);

    let isValid = false;

    if (type === 'text') {
      isValid = val.trim().length > 0;
    } else if (type === 'email') {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
    }

    onValidChange?.(isValid);

    if (onChange) onChange(e);
  }

  return (
    <div className='flex flex-col gap-1.5 dark:text-white'>
      <label className='font-medium text-sm' htmlFor={idInput}>
        {label}
      </label>
      <div className='relative'>
        <Icon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none' />
        <input
          className={clsx(
            'w-full',
            'pl-10 pr-4 py-2.5',
            'bg-input-background border  rounded-xl',
            'text-sm outline-none',
            'focus:ring-2 focus:ring-primary-green/20',
            'transition-all',
            ' dark:bg-secondary-dark-background',
            error
              ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
              : 'border-slate-300 dark:border-border-color focus:border-primary-green',
            className,
          )}
          type={type}
          id={idInput}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          {...props}
        />
      </div>
      {error && <span className='text-xs text-red-500'>{error}</span>}
    </div>
  );
}
