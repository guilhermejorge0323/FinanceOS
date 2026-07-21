import { cn } from "@/utils/mergeTailwind";
import { ComponentProps } from "react";



export function IntroductionHeaderLinks({className}: ComponentProps<'a'>) {
  const buttonClasses = cn('text-sm text-white/60 hover:text-white/90', className);

  return (
    <>
      <a href='#resources' className={buttonClasses}>
        Recursos
      </a>

      <a href='#how-it-works' className={buttonClasses}>
        Como funciona
      </a>
    </>
  );
}
