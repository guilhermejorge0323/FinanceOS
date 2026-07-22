import { cn } from '@/utils/mergeTailwind';
import clsx from 'clsx';
import { ComponentProps, ReactNode } from 'react';

type IntroductionButtonProps = {
  children: ReactNode;
} & ComponentProps<'button'>;

export function PrimaryButton({
  children,
  className,
  ...props
}: IntroductionButtonProps) {
  return (
    <button
      className={cn(
        'rounded-xl',
        'text-sm font-semibold ',
        'transition-all duration-200',
        ' cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
