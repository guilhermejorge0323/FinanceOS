'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { HomeTitle } from '@/components/home/ui/HomeTitle';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { DashboardMode } from '@/utils/calculate-financial-summary';
import { getFirstName } from '@/utils/getFirstName';
import clsx from 'clsx';

interface DashboardTopBarProps {
  userName?: string;
}

export function DashboardTopBar({ userName }: DashboardTopBarProps) {
  const firstName = getFirstName(userName || '');
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();


  const activeTab: DashboardMode =
    searchParams.get('tab') === 'SCHEDULED' ? 'SCHEDULED' : 'CURRENT';

  const handleTabChange = (tab: DashboardMode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='flex flex-col md:flex-row gap-5 justify-between items-center w-full'>
      <HomeTitle className='text-xl md:text-2xl'>
        Olá, {firstName || 'usuário'} 👋
      </HomeTitle>

      <div
        className={clsx(
          'flex gap-1 bg-white rounded-3xl p-1 shadow-sm',
          'dark:bg-secondary-dark-background',
        )}
      >
        <PrimaryButton
          onClick={() => handleTabChange('CURRENT')}
          className={clsx('py-1.5 px-4 flex-1 rounded-3xl transition-colors', {
            'bg-primary-green text-white': activeTab === 'CURRENT',
            'text-muted-gray bg-transparent hover:text-black/70 dark:text-primary-text-dark dark:hover:text-white':
              activeTab !== 'CURRENT',
          })}
        >
          Atual
        </PrimaryButton>

        <PrimaryButton
          onClick={() => handleTabChange('SCHEDULED')}
          className={clsx('py-1.5 px-4 flex-1 rounded-3xl transition-colors', {
            'bg-primary-green text-white': activeTab === 'SCHEDULED',
            'text-muted-gray bg-transparent hover:text-black/70 dark:text-primary-text-dark dark:hover:text-white':
              activeTab !== 'SCHEDULED',
          })}
        >
          Previsto
        </PrimaryButton>
      </div>
    </div>
  );
}
