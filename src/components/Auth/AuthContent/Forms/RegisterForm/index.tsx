'use client';

import { MailIcon, UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { InputAuth } from '../InputAuth';
import { InputPasswordAuth } from '../InputAuth/InputPasswordAuth';
import { AuthSendButton } from '../../AuthSendButton';
import { ActionResponse, registerAction } from '@/actions/auth/register-action';
import { useActionState, useState } from 'react';

const initialState: ActionResponse = {
  success: false,
};

export function RegisterForm() {
  const { activeTab } = useAuth();

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [state, formAction] = useActionState(
    async (prevState: ActionResponse, formData: FormData) => {
      const rawData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };

      return await registerAction(rawData);
    },
    initialState,
  );

  const isFormValid = isNameValid && isEmailValid && isPasswordValid;
  if (activeTab !== 'register') return null;

  return (
    <form action={formAction} className='flex flex-col gap-4'>
      {state.message && !state.success && (
        <div className='rounded border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500'>
          {state.message}
        </div>
      )}

      <InputAuth
        type='text'
        name='name'
        label='Nome'
        icon={UserIcon}
        placeholder='Digite seu nome'
        error={state.errors?.name}
        onValidChange={setIsNameValid}
      />
      <InputAuth
        type='email'
        name='email'
        label='E-mail'
        icon={MailIcon}
        placeholder='Digite seu e-mail'
        error={state.errors?.email}
        onValidChange={setIsEmailValid}
      />
      <InputPasswordAuth
        isRegister
        error={state.errors?.password}
        onPasswordValidChange={setIsPasswordValid}
      />

      <AuthSendButton type='submit' disabled={!isFormValid}>
        Criar conta
      </AuthSendButton>
    </form>
  );
}
