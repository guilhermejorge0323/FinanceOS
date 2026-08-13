'use client';

import clsx from 'clsx';
import { Loader2Icon } from 'lucide-react';
import { ComponentProps, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

type AuthSendButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
} & ComponentProps<'button'>;

export function AuthSendButton({
  children,
  isLoading = false,
  disabled,
  ...props
}: AuthSendButtonProps) {
  const { pending } = useFormStatus();

  const isPending = pending || isLoading;

  return (
    <button
    disabled={disabled || isPending}
      className={clsx(
        'w-full py-2.5',
        'bg-primary-blue rounded-xl',
        'text-white font-medium text-sm disabled:text-slate-200',
        'hover:opacity-90 disabled:opacity-60 transition-opacity',
        'cursor-pointer',
        'flex items-center justify-center gap-2',
        'dark:bg-primary-green'
      )}
      {...props}
    >
      {isPending ? (
        <>
          <Loader2Icon className='animate-spin h-4 w-4' />
          carregando
        </>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}
