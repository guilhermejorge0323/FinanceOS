import { LogOutAction } from '@/actions/auth/logout-action';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import clsx from 'clsx';
import { LogOutIcon } from 'lucide-react';

export function CardUser() {
  return (
    <div
      className={clsx(
        'absolute right-0 top-full mt-2 z-50',
        'w-45 max-w-[calc(100vw-2rem)]',
        'max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl',
        'dark:border-slate-800 dark:bg-primary-dark-card',
      )}
    >
      <PrimaryButton
        onClick={() => LogOutAction()}
        className={clsx(
          'text-home-red dark:text-home-red',
          'w-full',
          'flex items-center gap-2.5',
          'py-2.5 px-4',
          'hover:bg-muted dark:hover:bg-secondary-dark-background',
        )}
      >
        <LogOutIcon className='w-3.5 h-3.5' />
        <span>Sair</span>
      </PrimaryButton>
    </div>
  );
}
