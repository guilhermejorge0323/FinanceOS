import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

export function AuthFormSelector() {
  const { activeTab, setActiveTab } = useAuth();

  return (
    <div
      className={clsx(
        'flex mb-8 bg-muted rounded-xl p-1 shadow-sm',
        'dark:bg-secondary-dark-background',
      )}
    >
      <PrimaryButton
        onClick={() => setActiveTab('login')}
        className={clsx('py-2 flex-1 font-medium', {
          'bg-white dark:text-white dark:bg-primary-dark-card': activeTab === 'login',
          'text-muted-gray bg-transparent hover:text-black/70 dark:text-primary-text-dark dark:hover:text-white':
            activeTab !== 'login',
        })}
      >
        Entrar
      </PrimaryButton>

      <PrimaryButton
        onClick={() => setActiveTab('register')}
        className={clsx('py-2 flex-1 font-medium', {
          'bg-white dark:text-white dark:bg-primary-dark-card': activeTab === 'register',
          'text-muted-gray bg-transparent hover:text-black/70 dark:text-primary-text-dark dark:hover:text-white':
            activeTab !== 'register',
        })}
      >
        Cadastrar
      </PrimaryButton>
    </div>
  );
}
