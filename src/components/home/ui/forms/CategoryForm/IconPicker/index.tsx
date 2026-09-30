import {
  CATEGORY_ICONS,
  CategoryType,
  getCategoryIcon,
} from '@/utils/category-icons';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

type IconPickerProps = {
  value: string;
  type: CategoryType;
  onChange: (iconKey: string) => void;
};

export function IconPicker({ value, type, onChange }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredIcons = Object.entries(CATEGORY_ICONS).filter(
    ([, item]) => item.type === type,
  );

  return (
    <div className='relative' ref={containerRef}>
      <label className='text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1'>
        Ícone
      </label>

      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-2',
          'px-3 py-2',
          'border rounded-xl border-slate-200 dark:border-slate-800 hover:border-emerald-500/50',
          'transition-all cursor-pointer h-10.5',
          'dark:bg-slate-950',
          'text-xs text-slate-800 dark:text-white',
          'focus:outline-none focus:ring-2 focus:ring-emerald-500/20',
        )}
      >
        <span className='text-base leading-none'>{getCategoryIcon(value)}</span>
        <span className='text-xs font-medium text-slate-700 dark:text-slate-300  max-w-35'>
          {CATEGORY_ICONS[value]?.label || 'Selecionar'}
        </span>
      </button>

      {isOpen && (
        <div
          className={clsx(
            'absolute left-0 z-50',
            'mt-2 p-3 w-64',
            'bg-white dark:bg-slate-900',
            'border border-slate-200 dark:border-slate-800 rounded-2xl',
          )}
        >
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2'>
            Ícones de {type === 'INCOME' ? 'Entrada' : 'Saída'}
          </p>

          <div
            className={clsx(
              'flex flex-wrap gap-1.5',
              'max-h-48',
              'pr-1',
              'overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full',
            )}
          >
            {filteredIcons.map(([key, item]) => {
              const isSelected = value === key;
              return (
                <button
                  key={key}
                  type='button'
                  title={item.label}
                  onClick={() => {
                    onChange(key);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    'w-8 h-8 rounded-xl flex items-center justify-center text-lg transition-all cursor-pointer',
                    isSelected
                      ? 'bg-emerald-500/10 border border-emerald-500 scale-105'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent',
                  )}
                >
                  {item.emoji}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
