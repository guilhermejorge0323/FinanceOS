import { ReactNode } from "react";

type AsideCardProps = {
    content: string,
    identification: string,
}

export function AsideCard({content, identification}: AsideCardProps) {
  return (
    <div className='bg-white/5 border border-white/10 rounded-xl p-4'>
      <p className='text-2xl font-semibold tabular-nums'>{content}</p>
      <p className='text-xs text-slate-400 mt-1'>{identification}</p>
    </div>
  );
}
