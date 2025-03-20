import { useState } from 'react';
import { useStore } from '../store';

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const theme = useStore((state) => state.theme);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === '1' && loginData.password === '1') {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <form onSubmit={handleLogin} className={`p-8 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <input
            type="text"
            value={loginData.username}
            onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
            className={`mb-4 p-2 w-full rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            placeholder="Логин"
          />
          <input
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
            className={`mb-4 p-2 w-full rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            placeholder="Пароль"
          />
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Войти
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={`p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <h1 className="text-3xl font-bold mb-6">Панель администратора</h1>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <h2 className="text-xl font-semibold mb-4">Статистика</h2>
          <div className="space-y-4">
            <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className="text-sm text-gray-500">Всего пользователей</p>
              <p className="text-2xl font-bold">1</p>
            </div>
            <div className={`p-4 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className="text-sm text-gray-500">Активных задач</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
        
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <h2 className="text-xl font-semibold mb-4">Системные настройки</h2>
          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Очистить кэш
            </button>
            <button className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">
              Сбросить настройки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 