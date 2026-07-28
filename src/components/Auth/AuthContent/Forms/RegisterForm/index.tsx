import { MailIcon, UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { InputAuth } from '../InputAuth';
import { InputPasswordAuth } from '../InputAuth/InputPasswordAuth';
import { AuthSendButton } from '../../AuthSendButton';

export function RegisterForm() {
  const { activeTab } = useAuth();

  if (activeTab !== 'register') return null;

  return (
    <form className='flex flex-col gap-4'>
      <InputAuth
        type='text'
        label='Nome'
        icon={UserIcon}
        placeholder='Digite seu nome'
      />
      <InputAuth
        type='text'
        label='E-mail'
        icon={MailIcon}
        placeholder='Digite seu e-mail'
      />
      <InputPasswordAuth />

      <AuthSendButton>Criar conta</AuthSendButton>
    </form>
  );
}
