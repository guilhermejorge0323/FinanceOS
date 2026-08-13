import { cn } from '@/utils/mergeTailwind';
import { ComponentProps, ReactNode } from 'react';

type HomeParagraphProps = {
    children: ReactNode;
} & ComponentProps<'p'>;

export function HomeParagraph({ children, className }: HomeParagraphProps) {
    return (
        <p className={cn('text-muted-gray dark:text-primary-text-dark', className)}>{children}</p>
    )
}
