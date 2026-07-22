import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useAuth } from '../AuthContext';
import clsx from 'clsx';

export function AuthFormSelector() {
  const { activeTab, setActiveTab } = useAuth();

  return (
    <div className='flex bg-m mb-8 bg-[#e2e8f0] rounded-xl p-1 shadow-sm'>
      <PrimaryButton
        onClick={() => setActiveTab('login')}
        className={clsx('py-2 flex-1 font-medium', {
          'bg-white': activeTab === 'login',
          'text-[#64748b] bg-transparent hover:text-black/70 ':
            activeTab !== 'login',
        })}
      >
        Entrar
      </PrimaryButton>

      <PrimaryButton
        onClick={() => setActiveTab('register')}
        className={clsx('py-2 flex-1 font-medium', {
          'bg-white': activeTab === 'register',
          'text-[#64748b] bg-transparent hover:text-black/70':
            activeTab !== 'register',
        })}
      >
        Cadastrar
      </PrimaryButton>
    </div>
  );
}
