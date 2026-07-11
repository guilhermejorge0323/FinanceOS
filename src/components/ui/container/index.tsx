import { cn } from '@/utils/mergeTailwind';
import { ComponentProps, ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
} & ComponentProps<'div'>;

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        'flex',
        'm-auto w-full max-w-6xl h-full',
        'px-6',
        className,
      )}
    >
      {children}
    </div>
  );
}
