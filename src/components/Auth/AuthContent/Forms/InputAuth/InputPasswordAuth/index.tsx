'use client';

import clsx from 'clsx';
import { CheckIcon, EyeIcon, EyeOffIcon, LockIcon, XIcon } from 'lucide-react';
import { ComponentProps, useId, useState } from 'react';

type InputPasswordAuthProps = {
  error?: string;
  isRegister: boolean;
  onPasswordValidChange?: (isValid: boolean) => void;
} & ComponentProps<'input'>;

export function InputPasswordAuth({
  error,
  onChange,
  isRegister,
  onPasswordValidChange,
  ...props
}: InputPasswordAuthProps) {
  const [typeInput, setTypeInput] = useState<'text' | 'password'>('password');
  const [passwordValue, setPasswordValue] = useState('');
  const idInput = useId();

  function togglePasswordVisibility() {
    setTypeInput(prev => (prev === 'password' ? 'text' : 'password'));
  }

  const hasMinLength = passwordValue.length >= 8;
  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);

  const requirements = [
    { label: 'Pelo menos 8 caracteres', met: hasMinLength },
    { label: 'Pelo menos 1 letra maiúscula', met: hasUppercase },
    {
      label: 'Pelo menos 1 caractere especial (!@#$%...)',
      met: hasSpecialChar,
    },
  ];

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setPasswordValue(val);

    const isValid = val.length >= 8 && /[A-Z]/.test(val) && /[!@#$%^&*(),.?":{}|<>]/.test(val);
    onPasswordValidChange?.(isValid);

    if (onChange) onChange(e);
  }

  return (
    <div className='flex flex-col gap-1.5 dark:text-white'>
      <div className='flex justify-between'>
        <label className='font-medium text-sm' htmlFor={idInput}>
          Senha
        </label>

        {!isRegister && (
            <button
          type='button'
          className='text-xs text-primary-green hover:underline'
        >
          Esqueci a senha
        </button>
        )}
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
            error
              ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
              : 'border-slate-300 dark:border-border-color focus:border-primary-green',
          )}
          type={typeInput}
          name={'password'}
          id={idInput}
          placeholder={'Digite sua senha'}
          value={passwordValue}
          onChange={handleChange}
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
      {error && <span className='text-xs text-red-500'>{error}</span>}

      {isRegister && (
        <ul className='mt-1 flex flex-col gap-1 text-xs'>
          {requirements.map((req, index) => (
            <li
              key={index}
              className={clsx(
                'flex items-center gap-1.5 transition-colors',
                req.met ? 'text-emerald-500 font-medium' : 'text-slate-400',
              )}
            >
              {req.met ? (
                <CheckIcon className='w-3.5 h-3.5 text-emerald-500 stroke-[3]' />
              ) : (
                <XIcon className='w-3.5 h-3.5 text-slate-400' />
              )}
              <span>{req.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
