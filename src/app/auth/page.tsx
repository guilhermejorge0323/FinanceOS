import { AsideAuth } from '@/components/Auth/AsideAuth';
import { AreaAsideText } from '@/components/Auth/AsideAuth/AreaAsideText';
import { AuthContent } from '@/components/Auth/AuthContent';
import { IntroductionTitle } from '@/components/Introduction/ui/IntroductionTitle';
import { Logo } from '@/components/ui/logo';
import { ShieldCheck, ShieldCheckIcon } from 'lucide-react';

export default function AuthPage() {
  return (
    <>
    <AsideAuth />

    <AuthContent />
    </>
  );
}
