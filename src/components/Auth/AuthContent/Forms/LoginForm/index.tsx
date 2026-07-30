'use client';

import { MailIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { InputAuth } from '../InputAuth';
import { InputPasswordAuth } from '../InputAuth/InputPasswordAuth';
import { AuthSendButton } from '../../AuthSendButton';
import { useActionState } from 'react';
import { ActionResponse, loginAction } from '@/actions/auth/login-action';

const initialState: ActionResponse = {
  success: false,
};

export function LoginForm() {
  const { activeTab } = useAuth();

  const [state, formAction] = useActionState(
    async (prevState: ActionResponse, formData: FormData) => {
      const rawData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };

      return await loginAction(rawData);
    },
    initialState,
  );

  if (activeTab !== 'login') return null;

  return (
    <form action={formAction} className='flex flex-col gap-4'>
      {state.message && !state.success && (
        <div className='rounded border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500'>
          {state.message}
        </div>
      )}

      <InputAuth
        type='email'
        label='E-mail'
        name='email'
        icon={MailIcon}
        placeholder='Digite seu e-mail'
      />
      <InputPasswordAuth isRegister={false} />

      <AuthSendButton>Entrar</AuthSendButton>
    </form>
  );
}
