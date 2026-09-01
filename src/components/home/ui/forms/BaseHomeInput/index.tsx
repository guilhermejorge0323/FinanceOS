import { cn } from '@/utils/mergeTailwind';
import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

export function BaseHomeInput({
  label,
  error,
  containerClassName,
  className,
  id,
  ...props
}: BaseInputProps) {
  const inputId = id || props.name || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={cn('flex flex-col', containerClassName)}>
      <label
        htmlFor={inputId}
        className={clsx(
          'text-[10px] font-bold uppercase tracking-wider text-slate-400',
          'block mb-1',
        )}
      >
        {label}
      </label>

      <input
        id={inputId}
        {...props}
        className={clsx(
          'text-xs text-slate-800 dark:text-white',
          'w-full',
          'px-3 py-2.5',
          'border bg-transparent rounded-xl',
          'focus:outline-none transition-all',
          error
            ? 'border-amber-500 focus:ring-2 focus:ring-amber-500/20'
            : 'border-slate-200 dark:border-slate-800 dark:bg-slate-950 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500',
        )}
      />
      {error && (
        <div className='flex items-center gap-1.5 mt-1 text-amber-500 dark:text-amber-400 font-medium text-[11px] animate-in fade-in duration-150'>
          <span className='w-2 h-2 rounded-full bg-amber-500 shrink-0 inline-block' />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
