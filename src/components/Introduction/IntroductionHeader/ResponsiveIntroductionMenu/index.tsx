import { Container } from '@/components/ui/container';
import { IntroductionHeaderLinks } from '../IntroductionHeaderLinks';
import clsx from 'clsx';
import { IntroductionLink } from '../../ui/IntroductionLink';

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

        <IntroductionLink
          className={clsx(
            'flex justify-center',
            'py-2.5 px-4',
            'border border-primary-green',
            'text-primary-green hover:text-white',
          )}
        >
          Entrar
        </IntroductionLink>
      </Container>
    </div>
  );
}
