import { IntroductionTitle } from '@/components/Introduction/ui/IntroductionTitle';
import clsx from 'clsx';

type CardS3Props = {
  number: string;
  title: string;
  description: string;
};

export function CardS3({ number, title, description }: CardS3Props) {
  return (
    <div
      className={clsx(
        'p-6 bg-white/3',
        'w-full lg:w-4xl',
        'flex items-start gap-6',
        'rounded-2xl border border-white/8',
        'hover:border-primary-orange-introduction/20',
        'transition-all',
      )}
    >
      <span className='text-3xl font-black font-mono text-white/10 shrink-0 w-12 h-full'>
        {number}
      </span>

      <div className='flex-1'>
        <IntroductionTitle className='text-start mb-1.5' as='h3'>
          {title}
        </IntroductionTitle>

        <p className='text-sm text-white/45 leading-relaxed'>{description}</p>
      </div>
    </div>
  );
}
