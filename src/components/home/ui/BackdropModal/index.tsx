'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

type BackdropModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export function BackdropModal({
  isOpen,
  onClose,
  children,
}: BackdropModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'bg-slate-950/60 backdrop-blur-md',
        'transition-all duration-300 ease-in-out',
      )}
    >
      <div className='max-w-md w-full' onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
}
