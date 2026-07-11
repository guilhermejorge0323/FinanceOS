'use client';

import { Container } from '@/components/ui/container';
import { Logo } from '@/components/ui/logo';
import { HeaderIntroductionButton } from '@/components/introduction/header/PrimaryButton';
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
        'w-full h-16',
        'fixed top-0',
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
            <HeaderIntroductionButton className='hidden lg:flex items-center gap-2'>
              Entrar
              <ArrowUpRightIcon className='w-3.5 h-3.5' />
            </HeaderIntroductionButton>

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
