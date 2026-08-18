import { SecondaryButton } from '@/components/ui/SecondaryButton';
import clsx from 'clsx';
import { BellIcon } from 'lucide-react';
import { NotificationCard } from './NotificationCard';
import { useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);

  const { notifications, unreadCount, isLoading, markAllAsRead, markAsRead } =
    useNotifications();

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState && unreadCount > 0) {
      markAllAsRead();
    }
  };

  return (
    <div className='md:relative'>
      <SecondaryButton
        onClick={handleToggle}
        className={clsx(
          'relative',
          'p-2',
          'hover:bg-muted',
          'dark:hover:bg-secondary-dark-background',
        )}
      >
        <BellIcon className='text-muted-gray dark:text-primary-text-dark w-4 h-4' />
        {unreadCount > 0 && (
          <span className='absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#f43f5e]'></span>
        )}
      </SecondaryButton>

      {isOpen && (
        <NotificationCard notifications={notifications} isLoading={isLoading} onItemClick={markAsRead} />
      )}
    </div>
  );
}
