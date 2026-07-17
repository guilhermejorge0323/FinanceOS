import { cn } from '@/utils/mergeTailwind';
import { ComponentProps, ElementType, ReactNode } from 'react';


type IntroductionTitleProps<T extends ElementType = 'h1'> = {
  as?: T;
  children: ReactNode;
} & Omit<ComponentProps<T>, 'as'>;

export function IntroductionTitle<T extends ElementType = 'h1'>({
  as,
  children,
  className,
  ...props
}: IntroductionTitleProps<T>) {
  const Component = as || 'h1';

  return (
    <Component
      className={cn('font-bold text-white text-center', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
