import { Logo } from '@/components/ui/logo';
import clsx from 'clsx';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='w-screen min-h-screen bg-[#070d1a] p-6 flex flex-col items-center justify-center'>
      <div
        className={clsx(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none',
        )}
      />

      {/* Container Central */}
      <div className='relative z-10 max-w-md w-full flex flex-col items-center text-center'>
        <div className='mb-12'>
          <Logo />
        </div>

        <div className='relative mb-6'>
          <span className='text-[10rem] sm:text-[10rem] font-black text-white/6 leading-none select-none tabular-nums'>
            404
          </span>
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='text-7xl sm:text-8xl font-black text-primary-green/90'>
              404
            </span>
          </div>
        </div>

        <div className='mb-10'>
          <h1 className='text-xl sm:text-2xl font-bold text-white mb-3'>
            Página não encontrada
          </h1>
          <p className='text-sm text-white/40 leading-relaxed'>
            Esta rota não existe no seu painel financeiro. Verifique o endereço
            ou volte para o início.
          </p>
        </div>

        <button>
          <Link
            href='/home'
            className={clsx(
              'flex gap-2 items-center',
              'px-6 py-3.5',
              'rounded-xl',
              'bg-primary-green',
              'font-semibold text-sm',
              'shadow-lg shadow-white/10 hover:shadow-white/20',
              'hover:scale-[1.02]'
            )}
          >
            <ChevronLeftIcon className='w-4.5 h-4.5' />
            Voltar ao início
          </Link>
        </button>
      </div>
    </div>
  );
}
