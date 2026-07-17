import clsx from 'clsx';
import { IntroductionTitle } from '../../ui/IntroductionTitle';
import { LineButtonsS1 } from './LineButtonsS1';

export function AreaTextsS1() {
  return (
    <div className=' relative flex items-center mb-16 flex-col'>
      <div
        className={clsx(
          'absolute z-0',
          'bottom-[-10%] sm:bottom-[-20%] left-1/2 -translate-x-1/2',
          'w-[320px] sm:w-175 h-64 sm:h-100',
          'rounded-full',
          'blur-[80px] sm:blur-[120px] opacity-20',
          'bg-[radial-gradient(var(--color-emerald-500)_0%,transparent_70%)] pointer-events-none',
        )}
      ></div>

      <IntroductionTitle className='text-4xl sm:text-5xl lg:text-6xl max-w-3xl leading-tight tracking-tight mb-6'>
        O Sistema Operacional da sua{' '}
        <span className='italic text-primary-orange-introduction'>
          Vida Financeira
        </span>
      </IntroductionTitle>

      <p className='text-base sm:text-lg text-center text-white/50 max-w-xl mx-auto mb-10'>
        Esqueça as planilhas complexas. Monitore suas entradas, configure
        limites personalizados e veja seu Score Financeiro subir com nossa
        inteligência artificial.
      </p>

      <LineButtonsS1 />
    </div>
  );
}
