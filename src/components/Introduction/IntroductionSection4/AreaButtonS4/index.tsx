import { Container } from '@/components/ui/container';
import { PrimaryButton } from '../../../ui/PrimaryButton';
import clsx from 'clsx';
import { ArrowUpRightIcon } from 'lucide-react';

export function AreaButtonS4() {
  return (
    <Container className='flex-col items-center gap-6'>
      <PrimaryButton
        className={clsx(
          'flex items-center gap-2.5 text-sm',
          'text-white',
          'px-8 py-4',
          'bg-primary-green',
          'shadow-xl shadow-primary-green/30',
          'hover:bg-[#059669] hover:shadow-primary-green/50 hover:scale-[1.02] transition-all group',
          'shadow-xl shadow-primary-green/30 hover:shadow-primary-green/50',
        )}
      >
        Começar Agora — É Grátis
        <ArrowUpRightIcon className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
      </PrimaryButton>

      <p className='text-xs text-white/25'>
        Sem cartão de crédito · Cancele quando quiser
      </p>
    </Container>
  );
}
