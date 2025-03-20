import { useEffect, useState } from 'react';
import { 
  Home, 
  Calendar, 
  CheckSquare
} from 'lucide-react';
import { useStore } from '../store';
import type { NavigationItem } from '../types';

const navigationItems: NavigationItem[] = [
  { name: 'Главная', href: '/', icon: Home, current: false },
  { name: 'Календарь', href: '/calendar', icon: Calendar, current: false },
  { name: 'Задачи', href: '/tasks', icon: CheckSquare, current: false },
];

export function Sidebar() {
  const theme = useStore((state) => state.theme);
  const [activeNavItem, setActiveNavItem] = useState<string>('Главная');
  
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/calendar') setActiveNavItem('Календарь');
    else if (path === '/tasks') setActiveNavItem('Задачи');
    else setActiveNavItem('Главная');
  }, []);

  const handleNavClick = (item: NavigationItem) => {
    setActiveNavItem(item.name);
    window.history.pushState({}, '', item.href);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div className="fixed bottom-4 left-4 right-4">
      <nav className={`rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex justify-around items-center h-16">
          {navigationItems.map((item) => {
            const isActive = activeNavItem === item.name;
            const IconComponent = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-colors ${
                  isActive 
                    ? theme === 'dark'
                      ? 'text-blue-400 bg-gray-700/50'
                      : 'text-blue-600 bg-blue-50'
                    : ''
                }`}
              >
                <IconComponent
                  className={`h-6 w-6 mb-1 ${
                    isActive 
                      ? theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      : theme === 'dark'
                        ? 'text-gray-400' : 'text-gray-400'
                  }`}
                />
                <span className={`text-xs ${
                  isActive 
                    ? theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    : theme === 'dark'
                      ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}