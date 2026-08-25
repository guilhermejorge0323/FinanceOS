import { ScoreProgressbar } from '@/components/home/ui/ScoreProgressbar';
import { DashboardCard } from '../../ui/DashboardCard';
import { TrendingUpIcon } from 'lucide-react';

interface ScoreCriterion {
  id: string;
  label: string;
  score: number;
}

const MOCK_CRITERIA: ScoreCriterion[] = [
  { id: '1', label: 'Entradas vs. Saídas', score: 22 },
  { id: '2', label: 'Aderência ao Planejamento', score: 20 },
  { id: '3', label: 'Aporte em Investimentos', score: 14 },
  { id: '4', label: 'Consistência do Histórico', score: 25 },
];

function getScoreColor(score: number): string {
  if (score >= 20) return 'text-primary-green';
  if (score >= 12) return 'text-amber-500';
  return 'text-rose-500';
}

export function ScoreCardDashboard() {
  return (
    <DashboardCard className='flex flex-col gap-5'>
      <div>
        <p className='text-xs text-primary-green font-semibold tracking-widest'>
          SCORE FINANCEIRO
        </p>
        <p className='text-[10px] text-slate-400 mt-0.5'>
          Saúde do seu dinheiro · calculada por IA
        </p>
      </div>

      <div className='flex gap-5 items-center'>
        <ScoreProgressbar />
        <div className='space-y-1.5'>
          <p className='text-sm font-bold dark:text-white'>
            Boa saúde financeira
          </p>
          <div className='flex gap-1.5 text-primary-green items-center'>
            <TrendingUpIcon className='w-2.5 h-2.5' />
            <p className='text-xs font-bold'>Evoluindo</p>
          </div>
        </div>
      </div>

      <div className='border-t border-slate-100 dark:border-slate-800/80 pt-3 space-y-2'>
        {MOCK_CRITERIA.map(item => {
          const scoreColorClass = getScoreColor(item.score);

          return (
            <div
              key={item.id}
              className='flex items-center justify-between text-[11px]'
            >
              <span className='text-slate-500 dark:text-slate-400'>
                {item.label}
              </span>
              <span className={`font-mono font-semibold ${scoreColorClass}`}>
                {item.score}/25
              </span>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}
