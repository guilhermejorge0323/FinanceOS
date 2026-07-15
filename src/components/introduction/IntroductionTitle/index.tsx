import { cn } from '@/utils/mergeTailwind';
import { ComponentProps, ReactNode } from 'react';

type IntroductionTitleProps = {
  children: ReactNode;
} & ComponentProps<'h1'>;

export function IntroductionTitle({
  children,
  className,
}: IntroductionTitleProps) {
  return (
    <h1
      className={cn(
        'font-bold text-white',
        className,
      )}
    >
      {children}
    </h1>
  );
}
