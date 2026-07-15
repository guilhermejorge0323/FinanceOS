'use client';

import { Container } from '@/components/ui/container';
import { Logo } from '@/components/ui/logo';
import { IntroductionButton } from '@/components/introduction/PrimaryButton';
import { ArrowUpRightIcon, MenuIcon } from 'lucide-react';
import clsx from 'clsx';
import { IntroductionHeaderLinks } from './IntroductionHeaderLinks';
import { ResponsiveIntroductionMenu } from './ResponsiveIntroductionMenu';
import { useState } from 'react';

export function IntroductionHeader() {
  const [menuState, setMenuState] = useState(false);

  return (
    <header
      className={clsx(
        'w-full h-16 mb-20',
        'fixed top-0 z-10',
        'bg-primary-black-introduction/80 backdrop-blur-md',
        'border-b border-white/5',
      )}
    >
      <Container>
        <nav className='grid grid-cols-2 lg:grid-cols-3 items-center w-full'>
          <Logo />

          <div className='hidden lg:flex justify-center gap-8'>
            <IntroductionHeaderLinks />
          </div>

          <div className='flex justify-end'>
            <IntroductionButton
              className={clsx(
                'hidden lg:flex items-center gap-2',
                'px-4 py-2',
                'rounded-xl border border-primary-green',
                'text-primary-green hover:text-white hover:bg-primary-green',
              )}
            >
              Entrar
              <ArrowUpRightIcon className='w-3.5 h-3.5' />
            </IntroductionButton>

            <div className='lg:hidden flex items-center'>
              <button onClick={() => setMenuState(!menuState)}>
                <MenuIcon className='w-4.5 h-4.5' />
              </button>
            </div>
          </div>
        </nav>
      </Container>
      {menuState && <ResponsiveIntroductionMenu />}
    </header>
  );
}
