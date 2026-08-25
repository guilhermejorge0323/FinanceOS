import { cn } from '@/utils/mergeTailwind';
import { ComponentProps, ReactNode } from 'react';

type SecondaryButtonProps = {
  children: ReactNode;
} & ComponentProps<'button'>;

export function SecondaryButton({
  children,
  className,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      className={cn(
        'rounded-full',
        'border border-slate-300',
        'bg-white',
        'transition-all duration-200',
        'font-medium text-muted-gray',
        'dark:bg-primary-dark-card dark:text-primary-text-dark dark:border-border-color',
        'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
