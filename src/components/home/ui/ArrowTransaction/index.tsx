import { cn } from '@/utils/mergeTailwind';
import { ArrowDownRightIcon, ArrowUpRightIcon } from 'lucide-react';
import { ComponentProps, ReactNode } from 'react';

type ArrowTransactionProps = {
  type: 'input' | 'output';
} & ComponentProps<'div'>;

export function ArrowTransaction({ type, className }: ArrowTransactionProps) {
  return (
    <div
      className={cn(
        `w-8 h-8 rounded-full flex items-center justify-center`,
        {
          'bg-primary-green': type === 'input',
          'bg-home-red': type === 'output',
        },
        className,
      )}
    >
      {type === 'input' ? (
        <ArrowUpRightIcon className='w-3.75 h-3.75 text-white' />
      ) : (
        <ArrowDownRightIcon className='w-3.75 h-3.75 text-white' />
      )}
    </div>
  );
}
