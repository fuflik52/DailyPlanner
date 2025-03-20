import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useStore } from '../store';

export function SettingsPage() {
  const user = useStore((state) => state.user);
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);
  const setUser = useStore((state) => state.setUser);
  const setNotification = useStore((state) => state.setNotification);
  
  const handleChange = (name: string, value: any) => {
    if (name === 'theme') {
      setTheme(value as 'light' | 'dark');
    }
    
    // Обновляем предпочтения пользователя
    if (user) {
      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          [name]: value,
        },
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setNotification({
        message: 'Настройки сохранены',
        type: 'success',
      });
      
      setTimeout(() => {
        setNotification(null);
      }, 2000);
    }
  };

  return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
      <h2 className="text-2xl font-bold mb-6">Настройки</h2>
      
      <div className="space-y-6">
        {/* Тема */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Тема оформления
          </h3>
          <div className="flex gap-4">
            <label className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer ${
              theme === 'light'
                ? 'bg-blue-50 border-blue-500'
                : theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}>
              <Sun className={`h-8 w-8 mb-2 ${theme === 'light' ? 'text-blue-500' : 'text-gray-500'}`} />
              <span className={`${theme === 'light' ? 'text-blue-700' : ''}`}>Светлая</span>
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={(e) => handleChange('theme', e.target.value)}
                className="sr-only"
              />
            </label>
            
            <label className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer ${
              theme === 'dark'
                ? 'bg-blue-900 border-blue-500'
                : theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}>
              <Moon className={`h-8 w-8 mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-gray-500'}`} />
              <span className={`${theme === 'dark' ? 'text-blue-400' : ''}`}>Темная</span>
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={(e) => handleChange('theme', e.target.value)}
                className="sr-only"
              />
            </label>
          </div>
        </div>
        
        {/* Язык */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Язык
          </h3>
          <select
            name="language"
            value={user?.preferences.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className={`block w-full rounded-md border-0 py-2 px-3 ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white border-gray-600' 
                : 'bg-white text-gray-900 border-gray-300'
            } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>
        
        {/* Уведомления */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Уведомления
          </h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={user?.preferences.notifications}
              onChange={(e) => handleChange('notifications', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2">Включить уведомления</span>
          </label>
        </div>
        
        {/* Вид календаря */}
        <div>
          <h3 className={`text-lg font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Вид календаря по умолчанию
          </h3>
          <div className="flex gap-4">
            <label className={`flex items-center p-2 rounded-lg border cursor-pointer ${
              user?.preferences.calendarView === 'month'
                ? 'bg-blue-50 border-blue-500'
                : theme === 'dark'
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-200'
            }`}>
              <input
                type="radio"
                name="calendarView"
                value="month"
                checked={user?.preferences.calendarView === 'month'}
                onChange={(e) => handleChange('calendarView', e.target.value)}
                className="sr-only"
              />
              <span className={user?.preferences.calendarView === 'month' ? 'text-blue-700' : ''}>Месяц</span>
            </label>
            
            <label className={`flex items-center p-2 rounded-lg border cursor-pointer ${
              user?.preferences.calendarView === 'week'
                ? 'bg-blue-50 border-blue-500'
                : theme === 'dark'
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-200'
            }`}>
              <input
                type="radio"
                name="calendarView"
                value="week"
                checked={user?.preferences.calendarView === 'week'}
                onChange={(e) => handleChange('calendarView', e.target.value)}
                className="sr-only"
              />
              <span className={user?.preferences.calendarView === 'week' ? 'text-blue-700' : ''}>Неделя</span>
            </label>
            
            <label className={`flex items-center p-2 rounded-lg border cursor-pointer ${
              user?.preferences.calendarView === 'day'
                ? 'bg-blue-50 border-blue-500'
                : theme === 'dark'
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-200'
            }`}>
              <input
                type="radio"
                name="calendarView"
                value="day"
                checked={user?.preferences.calendarView === 'day'}
                onChange={(e) => handleChange('calendarView', e.target.value)}
                className="sr-only"
              />
              <span className={user?.preferences.calendarView === 'day' ? 'text-blue-700' : ''}>День</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
} 