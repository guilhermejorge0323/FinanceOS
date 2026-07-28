'use client';

import clsx from 'clsx';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className='w-9 h-9' />;
  }

  return (
    <button
      className={clsx(
        'flex items-center gap-1.5',
        'px-3 py-1.5',
        'rounded-full border border-border-color',
        'bg-white',
        ' transition-all duration-200',
        'text-sm font-medium text-[#64748b]',
        'dark:bg-primary-dark-card dark:text-primary-text-dark'
      )}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <>
          <MoonIcon className='w-3.5 h-3.5 text-slate-700'/>
          Escuro
        </>
      ) : (
        <>
          <SunIcon className='w-3.5 h-3.5' />
          Claro
        </>
      )}
    </button>
  );
}
