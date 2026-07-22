'use client';

import { AuthProvider } from './AuthContext';
import { AuthFormSelector } from './AuthFormSelector';
import { RegisterForm } from './AuthFormSelector/RegisterForm';
import { LoginForm } from './LoginForm';

export function AuthContent() {
  return (
    <section className='flex-1 bg-slate-100 p-8 flex justify-center items-center'>
      <div className='w-full max-w-sm'>
        <AuthProvider>
          <AuthFormSelector />
          <LoginForm />
          <RegisterForm />
        </AuthProvider>
      </div>
    </section>
  );
}
