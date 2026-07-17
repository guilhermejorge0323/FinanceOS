import clsx from 'clsx';

export function AreaImageS1() {
  return (
    <div className='relative z-2'>
      <div
        className={clsx(
          'absolute z-0 -bottom-10 left-1/2 -translate-x-1/2',
          'w-3/4 h-20',
          'blur-3xl opacity-30 bg-primary-green',
        )}
      ></div>
      <div
        className={clsx(
          'h-60 md:h-80 lg:h-118 w-full',
          'rounded-lg',
          'relative z-1',
          'bg-[#0b1120]',
          'flex items-center justify-center',
          'text-3xl font-bold',
        )}
      >
        Imagem
      </div>
    </div>
  );
}
