import { XIcon } from 'lucide-react';
import { HomeCard } from '../../sections/dashboard/DashboardContent/ui/DashboardCard';
import { BackdropModal } from '../BackdropModal';
import { CategoryForm } from '../forms/CategoryForm';

type CardCreateHomeProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CardCreateHome({ isOpen, onClose }: CardCreateHomeProps) {
  return (
    <BackdropModal isOpen={isOpen} onClose={onClose}>
      <HomeCard className='max-w-md w-full p-0'>
        <div className='flex items-center justify-between pt-5 pb-4 border-b border-slate-200 dark:border-[#26334d]'>
          <div className='ml-6'>
            <h3 className='text-sm font-bold text-slate-900 dark:text-white'>
              Criar nova categoria para ENTRADAS
            </h3>
            <p className='text-xs text-slate-400 dark:text-primary-text-dark mt-1'>
              Criação personalizada
            </p>
          </div>

          <button className='mr-6' onClick={onClose}>
            <XIcon className='w-3.75 h-3.75 dark:text-primary-text-dark cursor-pointer' />
          </button>
        </div>
        <div className='p-6'>
          <CategoryForm type='INCOME' onBack={() => {}} className='a' />
        </div>
      </HomeCard>
    </BackdropModal>
  );
}
