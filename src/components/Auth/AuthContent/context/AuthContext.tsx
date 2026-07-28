'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
  activeTab: 'login' | 'register';
  setActiveTab: (tab: 'login' | 'register') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <AuthContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}
