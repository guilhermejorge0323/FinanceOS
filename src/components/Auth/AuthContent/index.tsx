'use client';

import { AuthProvider } from './context/AuthContext';
import { AuthFormSelector } from './AuthFormSelector';
import { LoginForm } from './Forms/LoginForm';
import { RegisterForm } from './Forms/RegisterForm';
import { SocialAuth } from './SocialAuth';
import { Logo } from '@/components/ui/logo';
import { SunIcon } from 'lucide-react';
import { ThemeButton } from '@/components/theme/ThemeButton';
import clsx from 'clsx';

export function AuthContent() {
  return (
    <section
      className={clsx(
        'flex-1 bg-primary-background p-8 flex justify-center items-center relative',
        'dark:bg-primary-dark-background',
      )}
    >
      <div className='absolute top-4 right-4'>
        <ThemeButton />
      </div>

      <div className='w-full max-w-sm text-primary-blue'>
        <div className='flex justify-center lg:hidden'>
          <Logo
            size='lg'
            className='mb-10 text-primary-blue dark:text-white'
          />
        </div>

        <AuthProvider>
          <AuthFormSelector />
          <LoginForm />
          <RegisterForm />
        </AuthProvider>
        <SocialAuth />
      </div>
    </section>
  );
}
