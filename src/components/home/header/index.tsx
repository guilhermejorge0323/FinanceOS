'use client';

import { MenuIcon } from 'lucide-react';
import { useTab } from '../context/homeContext';
import { useEffect, useState } from 'react';
import { HomeTitle } from '../ui/HomeTitle';
import { HomeParagraph } from '../ui/HomeParagraph';
import { ThemeButton } from '@/components/theme/ThemeButton';
import clsx from 'clsx';
import { Notifications } from './Notifications';
import { UserButton } from './UserButton';
import { fetchRealDate } from '@/utils/fetchRealDate';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
  const { activeTab } = useTab();
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    async function loadDate() {
      const formattedDate = await fetchRealDate();

      if (formattedDate) {
        setFormattedDate(formattedDate);
      }
    }
    loadDate();
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-30',
        'flex items-center justify-between',
        'h-16 w-full',
        'border-b border-border-color',
        'bg-white px-4 backdrop-blur-md lg:px-6 dark:bg-primary-dark-card',
      )}
    >
      <div className='flex items-center gap-3'>
        <button
          onClick={onOpenSidebar}
          className='rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden'
          aria-label='Abrir menu'
        >
          <MenuIcon className='h-4.5 w-4.5 dark:text-white' />
        </button>

        <div className='hidden lg:block md:pl-60'>
          <HomeTitle className='text-sm'>{activeTab}</HomeTitle>
          <HomeParagraph className='text-xs'>{formattedDate}</HomeParagraph>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <ThemeButton />
        <Notifications />
        <UserButton />
      </div>
    </header>
  );
}
