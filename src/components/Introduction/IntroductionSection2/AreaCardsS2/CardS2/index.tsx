import { IntroductionTitle } from '@/components/Introduction/ui/IntroductionTitle';
import clsx from 'clsx';

type CardS2Props = {
  icon: string;
  title: string;
  description: string;
};

export function CardS2({ icon, title, description }: CardS2Props) {
  return (
    <div
      className={clsx(
        'p-6 bg-white/3',
        'border border-white/8 rounded-2xl',
        'flex flex-col gap-3 w-full',
        'transition-all duration-300',
        'hover:border-primary-green/30 hover:bg-primary-green/5'
      )}
    >
      <div className='w-10 h-10 text-xl rounded-2xl bg-white/5 flex items-center justify-center'>
        {icon}
      </div>
      <IntroductionTitle as='h3' className='text-start text-sm font-semibold'>
        {title}
      </IntroductionTitle>
      <p className='text-xs text-white/45 leading-relaxed'>{description}</p>
    </div>
  );
}
