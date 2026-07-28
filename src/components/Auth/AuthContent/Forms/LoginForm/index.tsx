import { MailIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { InputAuth } from '../InputAuth';
import { InputPasswordAuth } from '../InputAuth/InputPasswordAuth';
import { AuthSendButton } from '../../AuthSendButton';

export function LoginForm() {
  const { activeTab } = useAuth();

  if (activeTab !== 'login') return null;

  return (
    <form className='flex flex-col gap-4'>
      <InputAuth
        type='text'
        label='E-mail'
        icon={MailIcon}
        placeholder='Digite seu e-mail'
      />
      <InputPasswordAuth />

      <AuthSendButton>Entrar</AuthSendButton>
    </form>
  );
}
