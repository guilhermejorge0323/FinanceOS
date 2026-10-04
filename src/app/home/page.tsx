import { Suspense } from 'react';
import { HomeTabContent } from '@/components/home/HomeTabContent';
import { DashBoard } from '@/components/home/sections/dashboard';
import { getSession } from '@/lib/session';

interface HomeProps {
  searchParams: Promise<{ tab?: string }>;
}

async function HomeContent({ searchParams }: HomeProps) {
  const session = await getSession();

  return (
    <HomeTabContent
      userId={session?.userId || ''}
      dashboardSlot={<DashBoard searchParams={searchParams} />}
    />
  );
}

export default function Home(props: HomeProps) {
  return (
    <Suspense fallback={<div className='p-6 animate-pulse'>Carregando...</div>}>
      <HomeContent {...props} />
    </Suspense>
  );
}
