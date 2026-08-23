import { ArrowDownIcon, ArrowDownRight, ArrowDownRightIcon, ArrowUpRightIcon, WalletIcon } from 'lucide-react';
import { DashboardCard } from '../ui/DashboardCard';

export function DashboardFinancialSummary() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      <DashboardCard className=' md:col-span-2 bg-home-dark-blue dark:bg-[#128667]'>
        <div className='flex items-center justify-between'>
          <span className='text-white/70 tracking-wider text-xs font-semibold'>
            SALDO LIVRE
          </span>
          <div className='w-8 h-8 rounded-full bg-white/10 flex items-center justify-center'>
            <WalletIcon className='w-3.75 h-3.75 text-white' />
          </div>
        </div>

        <div>
          <p className='text-4xl font-bold tracking-tight text-white font-dm'>
            R$ 2.100,00
          </p>
          <p className='text-xs text-white/50 mt-1.5'>
            Entradas − Despesas do mês
          </p>
        </div>
      </DashboardCard>

      <DashboardCard className='flex flex-col justify-between'>
        <div className='flex items-center justify-between mb-1.5'>
          <span className='tracking-wider text-muted-gray text-xs font-semibold dark:text-slate-400'>
            ENTRADAS
          </span>
          <div className='w-8 h-8 rounded-full bg-primary-green flex items-center justify-center'>
            <ArrowUpRightIcon className='w-3.75 h-3.75 text-white' />
          </div>
        </div>

        <div className=''>
          <p className='font-dm text-2xl font-semibold text-slate-900 dark:text-white'>
            R$ 1.000,00
          </p>
        </div>

        <div>
          <p className='text-xs text-slate-400  mt-1.5'>4 Entradas</p>
        </div>

        <div></div>
      </DashboardCard>

      <DashboardCard className='flex flex-col justify-between '>
        <div className='flex items-center justify-between mb-1.5'>
          <span className='tracking-wider text-muted-gray text-xs font-semibold dark:text-slate-400'>
            SAIDAS
          </span>
          <div className='w-8 h-8 rounded-full bg-home-red flex items-center justify-center'>
            <ArrowDownRightIcon className='w-3.75 h-3.75 text-white' />
          </div>
        </div>

        <div className=''>
          <p className='font-dm text-2xl font-semibold text-slate-900 dark:text-white'>
            R$ 1.000,00
          </p>
        </div>

        <div>
          <p className='text-xs text-slate-400   mt-1.5'>4 Saidas</p>
        </div>

        <div></div>
      </DashboardCard>
    </div>
  );
}
