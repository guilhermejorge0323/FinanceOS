import { cn } from '@/utils/mergeTailwind';
import { ComponentProps, ReactNode } from 'react';

type HomeProps = {
  children: ReactNode;
} & ComponentProps<'div'>;

export function HomeCard({ children, className, ...props }: HomeProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 min-h-42 shadow-sm dark:shadow-none bg-white dark:bg-primary-dark-card',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
