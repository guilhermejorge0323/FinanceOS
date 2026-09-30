import { cn } from '@/utils/mergeTailwind';
import { ArrowDownRightIcon, ArrowUpRightIcon } from 'lucide-react';
import { ComponentProps, ReactNode } from 'react';

type ArrowTransactionProps = {
  type: 'INCOME' | 'OUTCOME';
} & ComponentProps<'div'>;

export function ArrowTransaction({ type, className }: ArrowTransactionProps) {
  return (
    <div
      className={cn(
        `w-8 h-8 rounded-full flex items-center justify-center`,
        {
          'bg-primary-green': type === 'INCOME',
          'bg-home-red': type === 'OUTCOME',
        },
        className,
      )}
    >
      {type === 'INCOME' ? (
        <ArrowUpRightIcon className='w-3.75 h-3.75 text-white' />
      ) : (
        <ArrowDownRightIcon className='w-3.75 h-3.75 text-white' />
      )}
    </div>
  );
}
