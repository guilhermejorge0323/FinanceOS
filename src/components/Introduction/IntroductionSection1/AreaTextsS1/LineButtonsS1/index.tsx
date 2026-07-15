import clsx from 'clsx';
import { IntroductionButton } from '../../../ui/PrimaryButton';
import { ArrowUpRightIcon } from 'lucide-react';

export function LineButtonsS1() {
  return (
    <div className='flex justify-center items-center flex-col md:flex-row gap-3'>
      <IntroductionButton
        className={clsx(
          'flex items-center gap-2',
          'text-white',
          'px-6 py-3.5',
          'bg-primary-green',
          'shadow-lg shadow-primary-green/30',
          'hover:bg-[#059669] hover:shadow-primary-green/50 hover:scale-[1.02] transition-all group',
        )}
      >
        Começar Agora — É Grátis
        <ArrowUpRightIcon className='w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
      </IntroductionButton>

      <IntroductionButton
        className={clsx(
          'flex justify-center w-34',
          'text-white/70',
          'px-6 py-3.5',
          'border border-white/15',
          'hover:border-white/30 hover:text-white',
          'transition-all duration-200',
        )}
      >
        Ver Recursos
      </IntroductionButton>
    </div>
  );
}
