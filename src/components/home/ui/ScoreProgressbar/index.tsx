import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export function ScoreProgressbar({ value = 8 }: { value?: number }) {
  return (
    <div className='relative w-20 h-20'>
      <CircularProgressbar
        value={value}
        strokeWidth={10}
        styles={buildStyles({
          rotation: 0,
          strokeLinecap: 'round',
          pathColor: '#10b981', // Verde do seu tema (ou cor dinâmica)
          trailColor: '#10b98120', // Fundo clarinho
        })}
      />
      {/* Texto customizado centralizado */}
      <div className='absolute inset-0 flex flex-col items-center justify-center font-dm'>
        <span className='text-xl font-bold text-slate-900 dark:text-white leading-none'>
          {value}
        </span>
        <span className='text-[10px] text-slate-400 leading-none mt-0.5'>
          /100
        </span>
      </div>
    </div>
  );
}
