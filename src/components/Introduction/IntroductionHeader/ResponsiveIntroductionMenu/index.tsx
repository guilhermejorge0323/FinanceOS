import { Container } from '@/components/ui/container';
import { IntroductionHeaderLinks } from '../IntroductionHeaderLinks';
import { PrimaryButton } from '../../../ui/PrimaryButton';
import clsx from 'clsx';

export function ResponsiveIntroductionMenu() {
  return (
    <div
      className={clsx(
        'lg:hidden',
        'bg-primary-black-introduction',
        'fixed z-10',
        'w-full border-y border-white/5 ',
      )}
    >
      <Container className='flex-col gap-3 py-4'>
        <IntroductionHeaderLinks className='py-2 font-semibold' />

        <PrimaryButton
          className={clsx(
            'flex justify-center',
            'py-2.5 px-4',
            'border border-primary-green',
            'text-primary-green hover:text-white',
          )}
        >
          Entrar
        </PrimaryButton>
      </Container>
    </div>
  );
}
