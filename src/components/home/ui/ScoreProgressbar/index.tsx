'use client';

// 🟢 1. Importação dos hooks do React (useState e useEffect)
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export function ScoreProgressbar({ value = 8 }: { value?: number }) {
  // 🟢 2. Criação do estado para controlar se o componente já foi montado no navegador
  const [isMounted, setIsMounted] = useState(false);

  // 🟢 3. Executado apenas após o componente ser montado no cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 🟢 4. Proteção contra o erro de hidratação: retorna apenas um container vazio durante a renderização no servidor (SSR)
  if (!isMounted) {
    return <div className="w-20 h-20" />;
  }

  return (
    <div className="relative w-20 h-20">
      <CircularProgressbar
        value={value}
        strokeWidth={10}
        styles={buildStyles({
          rotation: 0,
          strokeLinecap: 'round',
          pathColor: '#10b981',
          trailColor: '#10b98120',
        })}
      />
      {/* Texto customizado centralizado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center font-dm">
        <span className="text-xl font-bold text-slate-900 dark:text-white leading-none">
          {value}
        </span>
        <span className="text-[10px] text-slate-400 leading-none mt-0.5">
          /100
        </span>
      </div>
    </div>
  );
}
