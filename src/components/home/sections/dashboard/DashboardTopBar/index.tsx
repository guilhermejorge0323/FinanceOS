import { HomeTitle } from '@/components/home/ui/HomeTitle';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { getSession } from '@/lib/session';
import { getFirstName } from '@/utils/getFirstName';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export function DashboardTopBar() {
  const [activeTab, setActiveTab] = useState<'atual' | 'previsto'>('atual');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    async function getUserName() {
      const session = await getSession();
      const firstName = getFirstName(session?.name || '');
      setUserName(firstName || 'user');
    }

    getUserName();
  }, []);

  return (
    <div className='flex flex-col md:flex-row gap-5 justify-between items-center w-full'>
      <HomeTitle className='text-xl md:text-2xl'>Olá, {userName} 👋</HomeTitle>

      <div
        className={clsx(
          'flex gap-1  bg-white rounded-3xl p-1 shadow-sm',
          'dark:bg-secondary-dark-background',
        )}
      >
        <PrimaryButton
          onClick={() => setActiveTab('atual')}
          className={clsx('py-1.5 px-4 flex-1 rounded-3xl', {
            'bg-primary-green text-white': activeTab === 'atual',
            'text-muted-gray bg-transparent hover:text-black/70 dark:text-primary-text-dark dark:hover:text-white':
              activeTab !== 'atual',
          })}
        >
          Atual
        </PrimaryButton>

        <PrimaryButton
          onClick={() => setActiveTab('previsto')}
          className={clsx('py-1.5 px-4 flex-1 rounded-3xl', {
            'bg-primary-green text-white': activeTab === 'previsto',
            'text-muted-gray bg-transparent hover:text-black/70 dark:text-primary-text-dark dark:hover:text-white':
              activeTab !== 'previsto',
          })}
        >
          Previsto
        </PrimaryButton>
      </div>
    </div>
  );
}
