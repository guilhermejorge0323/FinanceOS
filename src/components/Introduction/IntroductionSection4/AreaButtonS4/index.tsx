import { Container } from '@/components/ui/container';
import { IntroductionButton } from '../../ui/PrimaryButton';
import clsx from 'clsx';
import { ArrowUpRightIcon } from 'lucide-react';

export function AreaButtonS4() {
  return (
    <Container className='flex-col items-center gap-6'>
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

      <p className='text-xs text-white/25'>Sem cartão de crédito · Cancele quando quiser</p>
    </Container>
  );
}
