import { formatCurrencyInput } from '@/utils/format-currency-input';
import clsx from 'clsx';
import { useState } from 'react';

type ValueInputProps = {
  onChange: (numericValue: number) => void;
  className?: string;
};

export function ValueInput({ onChange }: ValueInputProps) {
  const [displayAmount, setDisplayAmount] = useState('R$ 0,00');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const { formatted, numeric } = formatCurrencyInput(rawValue);

    setDisplayAmount(formatted);
    onChange(numeric);
  };

  return (
    <div className='rounded-2xl bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-[#26334d] p-4'>
      <label
        htmlFor='inputValue'
        className='text-[10px] uppercase font-bold text-slate-400 block tracking-widest mb-2'
      >
        valor
      </label>
      <div className='flex gap-2 items-center'>
        <span className='text-2xl font-black text-slate-300 dark:text-[#26334d]'>
          R$
        </span>
        <input
          id='inputValue'
          type='text'
          inputMode='numeric'
          value={displayAmount}
          onChange={handleAmountChange}
          className={clsx(
            'outline-none w-full',
            'font-dm text-3xl text-slate-900 dark:text-white',
            'placeholder:text-slate-200 dark:placeholder:text-[#26334d]',
          )}
        />
      </div>
    </div>
  );
}
