import { WalletIcon } from 'lucide-react';

export function Logo() {
  return (
    <div className='flex gap-2.5 items-center'>
      <div className='rounded-xl bg-primary-green w-7 h-7 flex items-center justify-center'>
        <WalletIcon className='w-[14] h-[14]'/>
      </div>
      <h1 className='text-lg font-bold'>FinanceOS</h1>
    </div>
  );
}
