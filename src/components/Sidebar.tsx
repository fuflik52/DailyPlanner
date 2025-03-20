import { useEffect, useState } from 'react';
import { 
  Home, 
  Calendar, 
  CheckSquare, 
  Settings,
  PlusCircle,
  Search,
  Menu,
  Bell,
  Sun,
  Moon
} from 'lucide-react';
import { useStore } from '../store';
import type { NavigationItem } from '../types';

const navigationItems: NavigationItem[] = [
  { name: 'Главная', href: '/', icon: Home, current: false },
  { name: 'Календарь', href: '/calendar', icon: Calendar, current: false },
  { name: 'Задачи', href: '/tasks', icon: CheckSquare, current: false },
  { name: 'Настройки', href: '/settings', icon: Settings, current: false },
];

export function Sidebar() {
  const user = useStore((state) => state.user);
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);
  const [activeNavItem, setActiveNavItem] = useState<string>('Главная');
  
  // Отслеживаем текущий URL для определения активного элемента
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/calendar') setActiveNavItem('Календарь');
    else if (path === '/tasks') setActiveNavItem('Задачи');
    else if (path === '/settings') setActiveNavItem('Настройки');
    else setActiveNavItem('Главная');
  }, []);

  const handleNavClick = (item: NavigationItem) => {
    setActiveNavItem(item.name);
    // Обновляем URL при клике на элемент навигации
    window.history.pushState({}, '', item.href);
    
    // Вызываем popstate вручную, чтобы обработчик в App.tsx сработал
    window.dispatchEvent(new Event('popstate'));
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`flex h-full flex-col gap-y-5 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} px-6 py-4`}>
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-x-3">
          <Menu className={`h-6 w-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-400'}`} />
          <span className="text-xl font-semibold">Планировщик</span>
        </div>
        <div className="flex items-center gap-x-2">
          <button
            type="button"
            className={`relative rounded-lg p-2 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className={`rounded-lg p-2 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            className={`rounded-lg p-2 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <PlusCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="relative">
        <Search className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Поиск..."
          className={`h-10 w-full rounded-md border-0 ${theme === 'dark' ? 'bg-gray-700 text-white ring-gray-600 placeholder:text-gray-400' : 'bg-gray-50 text-gray-900 ring-gray-200 placeholder:text-gray-400'} pl-10 pr-4 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-blue-600`}
        />
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigationItems.map((item) => {
                const isActive = activeNavItem === item.name;
                const IconComponent = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item);
                      }}
                      className={`
                        group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                        ${
                          isActive
                            ? theme === 'dark' 
                              ? 'bg-gray-700 text-blue-400'
                              : 'bg-gray-50 text-blue-600'
                            : theme === 'dark'
                              ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                        }
                      `}
                    >
                      <IconComponent
                        className={`h-5 w-5 shrink-0 ${
                          isActive 
                            ? theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                            : theme === 'dark'
                              ? 'text-gray-400 group-hover:text-blue-400'
                              : 'text-gray-400 group-hover:text-blue-600'
                        }`}
                      />
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
          
          <li className="mt-auto">
            <div className={`flex items-center gap-x-4 px-2 py-3 ${theme === 'dark' ? 'border-t border-gray-700' : ''}`}>
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt=""
                  className={`h-8 w-8 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-50'}`}
                />
              ) : (
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <span className="text-sm font-medium">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="min-w-0">
                <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{user?.username}</p>
                <p className={`truncate text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{user?.email}</p>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}