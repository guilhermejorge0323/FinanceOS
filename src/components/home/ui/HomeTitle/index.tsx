import { cn } from '@/utils/mergeTailwind';
import { ComponentProps, ElementType, ReactNode } from 'react';

type HomeTitleProps<T extends ElementType = 'h1'> = {
  as?: T;
  children: ReactNode;
} & Omit<ComponentProps<T>, 'as'>;

export function HomeTitle({
  as,
  children,
  className,
}: HomeTitleProps) {
  const Title = as || 'h1';

  return (
    <Title
      className={cn(
        'font-semibold text-primary-blue',
        'dark:text-white',
        className,
      )}
    >
      {children}
    </Title>
  );
}
