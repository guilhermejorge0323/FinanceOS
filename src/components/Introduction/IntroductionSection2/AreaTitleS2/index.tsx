import { Container } from '@/components/ui/container';
import { IntroductionTitle } from '../../ui/IntroductionTitle';
import clsx from 'clsx';

export function AreaTitleS2() {
  return (
    <div className='mb-14'>
      <Container className='flex-col items-center'>
        <div>
          <IntroductionTitle
            className={clsx(
              'text-xs uppercase tracking-widest font-semibold',
              'text-primary-green mb-4',
            )}
          >
            Recursos
          </IntroductionTitle>
          <IntroductionTitle className='text-3xl sm:text-4xl' as='h2'>
            Tudo que você precisa.
            <br />
            <span className='text-white/40'>Em um só lugar.</span>
          </IntroductionTitle>
        </div>
      </Container>
    </div>
  );
}
