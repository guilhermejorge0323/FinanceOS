import { WalletIcon } from "lucide-react";
import { DashboardCard } from "../ui/DashboardCard";

export function DashboardFinancialSummary() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      <DashboardCard className=" md:col-span-2 bg-home-dark-blue dark:bg-[#128667]">
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

      <DashboardCard className="bg-white">
        a
      </DashboardCard>

      <DashboardCard className="bg-white">
        b
      </DashboardCard>
    </div>
  );
}
