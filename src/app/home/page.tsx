import { HomeTabContent } from '@/components/home/HomeTabContent';
import { DashBoard } from '@/components/home/sections/dashboard';

export default function Home() {
  return (
    <HomeTabContent
      dashboardSlot={<DashBoard />}
    />
  );
}
