import { Suspense } from 'react';
import { Container } from '@/components/ui/container';
import { DashboardTopBar } from './DashboardTopBar';
import { DashboardContent } from './DashboardContent';
import { DashboardMode } from '@/utils/calculate-financial-summary';
import { getSession } from '@/lib/session';

interface DashBoardProps {
  searchParams?: Promise<{ tab?: string }>;
}

export async function DashBoard({ searchParams }: DashBoardProps) {
  const user = await getSession();
  const resolvedParams = await searchParams;
  const activeTab: DashboardMode =
    resolvedParams?.tab === 'SCHEDULED' ? 'SCHEDULED' : 'CURRENT';

  return (
    <section>
      <Container className='flex-col gap-6 p-0'>
        <DashboardTopBar userName={user?.name || ''}/>

        <Suspense
          key={activeTab}
          fallback={
            <div className='h-40 w-full rounded-xl bg-slate-100 dark:bg-slate-800/40 animate-pulse flex items-center justify-center'>
              <span className='text-xs font-medium text-slate-400 dark:text-slate-500'>
                Carregando dados do dashboard...
              </span>
            </div>
          }
        >
          <DashboardContent activeTab={activeTab}  />
        </Suspense>
      </Container>
    </section>
  );
}
