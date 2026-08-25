'use client';

import { LayoutDashboard, CreditCardIcon, BotIcon } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import clsx from 'clsx';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useTab } from '../context/homeContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { id: 'Dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'Transações', name: 'Transações', icon: CreditCardIcon },
  { id: 'Análise IA', name: 'Análise IA', icon: BotIcon },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { activeTab, setActiveTab } = useTab();

  return (
    <>
      <div
        onClick={onClose}
        className={clsx(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity 2xl:hidden',
          {
            'opacity-100 pointer-events-auto': isOpen,
            'opacity-0 pointer-events-none': !isOpen,
          },
        )}
      />
      <aside
        className={clsx(
          'fixed left-0 top-0 z-50',
          'h-screen w-60 flex flex-col justify-between',
          'bg-primary-blue dark:bg-[#070d1a] text-white',
          'transition-transform duration-300 ease-in-out',
          '2xl:translate-x-0',
          {
            'translate-x-0': isOpen,
            '-translate-x-full': !isOpen,
          },
        )}
      >
        <div>
          <div className='px-5 py-6 border-b border-border-color'>
            <Logo size='lg' />
          </div>

          <nav className='px-3 py-4'>
            {navigation.map(item => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <PrimaryButton
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  className={clsx(
                    'flex items-center gap-3 w-full px-3 py-2.5 mb-1 rounded-2xl font-medium transition-all duration-150',
                    {
                      'bg-primary-green text-white': isActive,
                      'text-text-sidebar/70 hover:bg-secondary-dark-background':
                        !isActive,
                    },
                  )}
                >
                  <Icon className='w-4 h-4' />
                  {item.name}
                </PrimaryButton>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
