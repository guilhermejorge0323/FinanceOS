'use client';

import { cn } from '@/utils/mergeTailwind';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ComponentProps, useEffect, useState } from 'react';
import { SecondaryButton } from '../ui/SecondaryButton';

type ThemeButtonProps = {}

export function ThemeButton({ className }: ComponentProps<'button'>) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className='w-9 h-9' />;
  }

  return (
    <SecondaryButton
      className={cn(
        'flex items-center gap-1.5',
        'px-3 py-1.5',
        'text-sm hover:text-black',
        'dark:hover:text-white',
        className
      )}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <>
          <MoonIcon className='w-3.5 h-3.5'/>
          <span className='hidden lg:inline'>Escuro</span>
        </>
      ) : (
        <>
          <SunIcon className='w-3.5 h-3.5' />
          <span className='hidden lg:inline'>Claro</span>
        </>
      )}
    </SecondaryButton>
  );
}
