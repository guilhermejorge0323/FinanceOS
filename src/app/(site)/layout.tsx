import { IntroductionHeader } from '@/components/Introduction/IntroductionHeader';
import { IntroductionFooter } from '@/components/Introduction/IntroductionFooter';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-primary-black-introduction text-white">
      <IntroductionHeader />
      <main>
        {children}
      </main>
      <IntroductionFooter />
    </div>
  );
}
