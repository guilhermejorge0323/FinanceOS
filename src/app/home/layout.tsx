'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/home/sidebar';
import { Header } from '@/components/home/header';
import { TabProvider } from '@/components/home/context/homeContext';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <TabProvider>
      <div className='flex min-h-screen bg-primary-background dark:bg-primary-dark-background text-slate-900'>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className='flex flex-1 flex-col lg:pl-60'>
          <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

          <main className='flex-1 p-4 lg:p-6'>{children}</main>
        </div>
      </div>
    </TabProvider>
  );
}
