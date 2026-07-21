import { AsideCard } from './AsideCard';

export function AreaAsideText() {
  return (
    <div className='flex flex-col'>
      <h1 className='text-4xl font-semibold leading-tight'>
        Controle total das suas finanças.
      </h1>
      <p className='text-slate-400 mt-4 text-base leading-relaxed'>
        Monitore receitas, despesas, investimentos e receba insights de IA
        personalizados para alcançar seus objetivos.
      </p>

      <div className='mt-8 grid grid-cols-2 gap-4'>
        <AsideCard identification='Usuários ativos' content='47.2K' />
        <AsideCard identification='Economizados' content='R$ 2.1B' />
        <AsideCard identification='Transações/mês' content='1.8M' />
        <AsideCard identification='App score' content='4.9 ⭐' />
      </div>
    </div>
  );
}
