import { Container } from '@/components/ui/container';
import { CardS3 } from './CardS3';

export function AreaCardS3() {
  return (
    <div>
      <Container className='flex-col items-center gap-4'>
        <CardS3
          number='01'
          title='Crie sua conta grátis'
          description='Sem cartão de crédito. Em 30 segundos você já está dentro do seu painel financeiro.'
        />

        <CardS3
          number='02'
          title='Registre suas entradas e saídas'
          description='Adicione transações manualmente ou agende as recorrentes de uma vez para sempre.'
        />

        <CardS3
          number='03'
          title='A IA trabalha por você'
          description='Receba insights semanais, relatórios mensais e veja seu Score Financeiro evoluir.'
        />
      </Container>
    </div>
  );
}
