import { HomeTabContent } from '@/components/home/HomeTabContent';
import { DashBoard } from '@/components/home/sections/dashboard';

interface HomeProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  return (
    <HomeTabContent
      dashboardSlot={<DashBoard searchParams={searchParams} />}
    />
  );
}
