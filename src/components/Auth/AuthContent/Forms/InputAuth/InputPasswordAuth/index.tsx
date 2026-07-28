'use client';

import clsx from 'clsx';
import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';
import { useId, useState } from 'react';

export function InputPasswordAuth() {
  const [typeInput, setTypeInput] = useState<'text' | 'password'>('password');
  const idInput = useId();

  function togglePasswordVisibility() {
    setTypeInput(prev => (prev === 'password' ? 'text' : 'password'));
  }

  return (
    <div className='flex flex-col gap-1.5 dark:text-white'>
      <div className='flex justify-between'>
        <label className='font-medium text-sm' htmlFor={idInput}>
          Senha
        </label>

        <button type='button' className='text-xs text-primary-green hover:underline'>
          Esqueci a senha
        </button>
      </div>

      <div className='relative'>
        <LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none' />
        <input
          className={clsx(
            'w-full',
            'px-10 py-2.5',
            'bg-input-background border border-slate-300 rounded-xl',
            'text-sm outline-none',
            'focus:border-primary-green focus:ring-2 focus:ring-primary-green/20',
            'dark:dark:border-border-color dark:bg-secondary-dark-background',
            'transition-all',
          )}
          type={typeInput}
          name={'password'}
          id={idInput}
          placeholder={'Digite sua senha'}
        />

        <button
          type='button'
          className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400'
          onClick={togglePasswordVisibility}
        >
          {typeInput === 'password' ? (
            <EyeIcon className='w-4 h-4' />
          ) : (
            <EyeOffIcon className='w-4 h-4' />
          )}
        </button>
      </div>
    </div>
  );
}
