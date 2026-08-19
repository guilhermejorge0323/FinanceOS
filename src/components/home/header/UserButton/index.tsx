import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { getSession } from '@/lib/session';
import { getFormattedUser } from '@/utils/format-user-name';
import clsx from 'clsx';
import { ChevronDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CardUser } from './CardUser';

export function UserButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    async function getUserName() {
      const session = await getSession();
      setUserName(session?.name || 'user');
    }

    getUserName();
  }, []);

  const name = getFormattedUser(userName);

  return (
    <div className='relative'>
      <SecondaryButton
        onClick={() => setIsOpen(!isOpen)}
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
        >
          {name.initial}
        </div>
        <span className='hidden md:block text-sm font-semibold'>
          {name.displayName}
        </span>
        <ChevronDownIcon className='w-3.5 h-3.5' />
      </SecondaryButton>

      {isOpen && <CardUser />}
    </div>
  );
}
