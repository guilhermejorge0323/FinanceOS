import { cn } from '@/utils/mergeTailwind';
import { WalletIcon } from 'lucide-react';
import { ComponentProps } from 'react';


// Definimos variantes de tamanhos predefinidos para manter a consistência
type LogoSize = 'sm' | 'md' | 'lg';

interface LogoProps extends ComponentProps<'div'> {
  size?: LogoSize;
}

export function Logo({ size = 'md', className, ...props }: LogoProps) {
  const sizeClasses = {
    sm: {
      container: 'gap-2.5',
      iconBox: 'w-5 h-5 rounded-lg',
      icon: 'w-2.5 h-2.5',
      text: 'text-sm',
    },
    md: {
      container: 'gap-2.5',
      iconBox: 'w-7 h-7 rounded-xl',
      icon: 'w-3.5 h-3.5',
      text: 'text-lg',
    },
    lg: {
      container: 'gap-2.5',
      iconBox: 'w-8 h-8 rounded-xl',
      icon: 'w-4 h-4',
      text: 'text-lg',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      className={cn('flex items-center text-white', currentSize.container, className)}
      {...props}
    >
      <div className={cn('bg-primary-green flex items-center justify-center ', currentSize.iconBox)}>
        <WalletIcon className={currentSize.icon} />
      </div>
      <h1 className={cn('font-bold tracking-tight', currentSize.text)}>
        FinanceOS
      </h1>
    </div>
  );
}
