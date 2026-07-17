import { Container } from '@/components/ui/container';
import { CardS2 } from './CardS2';

export function AreaCardS2() {
  return (
    <div>
      <Container className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <CardS2
          icon='📊'
          title='Dashboard em tempo real'
          description='Visualize entradas, saídas e saldo livre em um painel limpo e intuitivo, atualizado automaticamente.'
        />

        <CardS2
          icon='🗓️'
          title='Agendamento recorrente'
          description='Programe salários, boletos e assinaturas com recorrência mensal, semanal ou anual — sem esforço.'
        />

        <CardS2
          icon='🤖'
          title='Insights de IA'
          description='Receba alertas inteligentes sobre seus padrões de gasto e sugestões para aumentar sua poupança.'
        />

        <CardS2
          icon='🎯'
          title='Cards personalizáveis'
          description='Crie widgets para metas de viagem, limites de delivery ou qualquer objetivo financeiro seu.'
        />

        <CardS2
          icon='📈'
          title='Score Financeiro'
          description='Acompanhe sua saúde financeira através de um score calculado com base nos seus hábitos reais.'
        />

        <CardS2
          icon='📥'
          title='Exportação para Excel'
          description='Exporte todas as suas transações para planilha com um único clique, a qualquer momento.'
        />
      </Container>
    </div>
  );
}
