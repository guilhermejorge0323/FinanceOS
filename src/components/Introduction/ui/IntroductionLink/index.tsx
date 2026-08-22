import { cn } from '@/utils/mergeTailwind';
import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';

type IntroductionButtonProps = {
  children: ReactNode;
} & ComponentProps<'a'>;

export function IntroductionLink({
  children,
  className,
}: IntroductionButtonProps) {
  return (
    <Link
      href={'/home'}
      className={cn(
        'rounded-xl',
        'text-sm font-semibold ',
        'transition-all duration-200',
        ' cursor-pointer',
        className,
      )}
    >
      {children}
    </Link>
  );
}
