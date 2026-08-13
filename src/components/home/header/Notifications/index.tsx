import { SecondaryButton } from '@/components/ui/SecondaryButton';
import clsx from 'clsx';
import { BellIcon } from 'lucide-react';
import { NotificationCard } from './NotificationCard';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import { getNotificationsAction } from '@/actions/notification/getNotificationsAction';
import { Notification } from '@prisma/client';

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      setIsLoading(true);
      const data = await fetchWithAuth(getNotificationsAction, router);

      if (data) {
        setNotifications(data);
      }
      setIsLoading(false);
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
        {notifications.length > 0 && (
          <span className='absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#f43f5e]'></span>
        )}
      </SecondaryButton>

      {isOpen && <NotificationCard notifications={notifications} isLoading={isLoading} />}
    </div>
  );
}
