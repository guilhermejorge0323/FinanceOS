import { Container } from '@/components/ui/container';
import { IntroductionTitle } from '../../ui/IntroductionTitle';

export function AreaTextS4() {
  return (
    <Container className='flex-col justify-center gap-6 mb-6'>
      <IntroductionTitle className='text-3xl sm:text-4xl'>
        Pronto para assumir o controle?
      </IntroductionTitle>

      <p className='text-sm text-center text-white/50'>
        Junte-se a mais de 47 mil pessoas que já transformaram a relação com o dinheiro usando o FinanceOS.
      </p>
    </Container>
  );
}
