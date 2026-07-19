import { Container } from '@/components/ui/container';
import { Logo } from '@/components/ui/logo';
import clsx from 'clsx';

export function IntroductionFooter() {
  return (
    <footer className='border-t border-white/5 py-8'>
      <Container className='grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-3'>
        <Logo
          className='text-white/60 justify-center md:justify-start'
          size='sm'
        />

        <p className='text-xs text-white/25 flex items-center justify-center'>
          © 2026 FinanceOS. Todos os direitos reservados.
        </p>

        <div
          className={clsx(
            'flex justify-center md:justify-end items-center gap-4',
            'text-xs text-white/30  transition-colors',
          )}
        >
          <a className='hover:text-white cursor-pointer'>Privacidade</a>
          <a className='hover:text-white cursor-pointer'>Termos</a>
          <a className='hover:text-white cursor-pointer'>Suporte</a>
        </div>
      </Container>
    </footer>
  );
}
