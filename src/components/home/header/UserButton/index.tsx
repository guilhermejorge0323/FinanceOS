import { SecondaryButton } from '@/components/ui/SecondaryButton';
import clsx from 'clsx';
import { ChevronDownIcon } from 'lucide-react';

export function UserButton() {
  return (
    <div>
      <SecondaryButton
        className={clsx(
          'flex items-center gap-2 ',
          'px-2 py-1.5',
          'rounded-2xl',
          'hover:bg-muted',
          'dark:hover:bg-secondary-dark-background dark:text-white',
        )}
      >
        <div
          className={clsx(
            'w-7 h-7',
            'flex items-center justify-center',
            'rounded-full',
            'bg-primary-green',
            'text-white text-xs font-semibold',
          )}
        >GJ</div>
        <span className='hidden md:block text-sm font-semibold'>Mateus Lima</span>
        <ChevronDownIcon className='w-3.5 h-3.5'/>
      </SecondaryButton>
    </div>
  );
}
