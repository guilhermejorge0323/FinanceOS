import clsx from 'clsx';
import Image from 'next/image';

export function SocialAuth() {
  return (
    <div>
      <div className='flex items-center gap-3 my-6'>
        <div className='flex-1 h-px bg-slate-300 dark:bg-border-color'></div>
        <span className='text-xs text-slate-400'>ou continue com</span>
        <div className='flex-1 h-px  bg-slate-300 dark:bg-border-color'></div>
      </div>

      <button
        className={clsx(
          'w-full',
          'flex items-center justify-center gap-2',
          'py-2.5',
          'border border-slate-300 rounded-xl',
          'text-sm font-medium',
          'dark:border-border-color dark:text-white'
        )}
      >
        <Image src='/icons/google.svg' alt='Google' width={18} height={18} />
        Google
      </button>
    </div>
  );
}
