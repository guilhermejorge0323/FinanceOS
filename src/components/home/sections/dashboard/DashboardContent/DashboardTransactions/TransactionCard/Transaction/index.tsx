import clsx from "clsx";
import { Trash2Icon } from "lucide-react";

export function Transaction() {
  return (
    <div className='group px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors'>
      <div className='flex items-center gap-3'>
        <div className='w-9 h-9 rounded-full bg-slate-100 dark:bg-[#26334d] flex items-center justify-center text-sm shrink-0'>
          💼
        </div>
        <div className='flex flex-col gap-0.5'>
          <p className='text-xs font-semibold text-slate-800 dark:text-white'>
            Salário
          </p>
          <div className='flex gap-2 items-center'>
            <span className='text-[9px] font-medium px-1.5 py-0.5 bg-slate-100 dark:bg-[#26334d] rounded text-slate-500 dark:text-slate-300'>
              Renda
            </span>
            <span className='text-[9px] text-slate-400 dark:text-slate-500'>
              09/10/2026
            </span>
          </div>
        </div>
      </div>

      {/* Valor e Botão de Deletar agrupados à direita */}
      <div className='flex items-center gap-3'>
        <p className='text-xs font-dm font-semibold text-primary-green text-right'>
          +R$ 13.612,80
        </p>

        {/* Botão de Deletar: Oculto por padrão, aparece no hover do group */}
        <button
          type='button'
          title='Excluir transação'
          className={clsx(
            'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
            'p-1.5 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-500/10',
          )}
        >
          <Trash2Icon className='w-3.5 h-3.5' />
        </button>
      </div>
    </div>
  );
}
