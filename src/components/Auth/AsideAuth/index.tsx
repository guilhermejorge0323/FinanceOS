import { Logo } from "@/components/ui/logo";
import { AreaAsideText } from "./AreaAsideText";
import { ShieldCheckIcon } from "lucide-react";

export function AsideAuth() {
  return (
    <aside className='hidden lg:flex w-130 flex-col justify-between bg-primary-blue-auth  text-white p-12 bg-auth-glow'>
      <Logo size='lg' />

      <AreaAsideText />

      <div className='flex items-center gap-3'>
        <ShieldCheckIcon className='text-primary-green w-4 h-4' />
        <span className='text-slate-400 text-sm'>
          Dados criptografados com AES-256. Open Banking certificado pelo BCB.
        </span>
      </div>
    </aside>
  );
}
