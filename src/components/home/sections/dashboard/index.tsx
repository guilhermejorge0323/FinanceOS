import { Container } from '@/components/ui/container';
import { DashboardTopBar } from './DashboardTopBar';
import { DashboardContent } from './DashboardContent';

export function DashBoard() {
  return (
    <section>
      <Container className='flex-col gap-6 p-0'>
        <DashboardTopBar />
        <DashboardContent />
      </Container>
    </section>
  );
}
