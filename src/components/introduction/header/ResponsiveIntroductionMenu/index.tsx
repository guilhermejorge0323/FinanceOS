'use client';

import { Container } from '@/components/ui/container';
import { IntroductionHeaderLinks } from '../IntroductionHeaderLinks';
import { IntroductionButton } from '../../PrimaryButton';
import clsx from 'clsx';

export function ResponsiveIntroductionMenu() {
  return (
    <div className='lg:hidden bg-primary-black-introduction fixed w-full border-y border-white/5 z-10'>
      <Container className='flex-col gap-3 py-4'>
        <IntroductionHeaderLinks className='py-2 font-semibold' />

        <IntroductionButton
          className={clsx(
            'flex justify-center',
            'py-2.5 px-4',
            'border border-primary-green',
            'text-primary-green hover:text-white',
          )}
        >
          Entrar
        </IntroductionButton>
      </Container>
    </div>
  );
}
