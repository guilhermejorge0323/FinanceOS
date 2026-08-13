'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab deve ser usado dentro de um TabProvider');
  }
  return context;
}
