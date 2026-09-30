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
        'fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto',
        'bg-slate-950/60 backdrop-blur-md',
        'transition-all duration-300 ease-in-out',
      )}
    >
      <div
        className='max-w-md w-full my-auto flex justify-center'
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
