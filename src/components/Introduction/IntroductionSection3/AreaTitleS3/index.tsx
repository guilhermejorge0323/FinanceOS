import { Container } from '@/components/ui/container';
import { IntroductionTitle } from '../../ui/IntroductionTitle';
import clsx from 'clsx';

export function AreaTitleS3() {
  return (
    <div className='mb-14'>
      <Container className='flex-col items-center'>
        <div>
          <IntroductionTitle
            className={clsx(
              'text-xs text-primary-orange-introduction font-semibold uppercase tracking-widest',
              'mb-4',
            )}
          >
            Como funciona
          </IntroductionTitle>
          <IntroductionTitle className='text-3xl sm:text-4xl' as='h2'>
            Simples assim.
          </IntroductionTitle>
        </div>
      </Container>
    </div>
  );
}
