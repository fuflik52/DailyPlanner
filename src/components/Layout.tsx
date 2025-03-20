import React from 'react';
import { Sidebar } from './Sidebar';
import { Notification } from './Notification';
import { useStore } from '../store';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const theme = useStore((state) => state.theme);

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`w-64 border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <Sidebar />
      </div>
      
      <main className="flex-1 overflow-y-auto">
        <div className="px-8 py-6">
          {children}
        </div>
      </main>
      
      <Notification />
    </div>
  );
} 