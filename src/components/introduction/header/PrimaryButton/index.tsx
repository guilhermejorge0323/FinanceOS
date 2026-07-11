import { cn } from '@/utils/mergeTailwind';
import clsx from 'clsx';
import { ComponentProps, ReactNode } from 'react';

type HeaderIntroductionButtonProps = {
  children: ReactNode;
} & ComponentProps<'button'>;

export function HeaderIntroductionButton({
  children,
  className,
  ...props
}: HeaderIntroductionButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2',
        'rounded-xl border border-primary-green',
        'text-sm font-semibold text-primary-green',
        'hover:bg-primary-green hover:text-white',
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
