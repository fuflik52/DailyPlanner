import { X } from 'lucide-react';
import { useStore } from '../store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const theme = useStore((state) => state.theme);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const setTheme = useStore((state) => state.setTheme);
  const setNotification = useStore((state) => state.setNotification);

  if (!isOpen) return null;

  const handleChange = (name: string, value: any) => {
    if (name === 'theme') {
      setTheme(value as 'light' | 'dark');
    }
    
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

  // Данные для графика
  const data = [
    { name: 'Пн', tasks: 0 },
    { name: 'Вт', tasks: 0 },
    { name: 'Ср', tasks: 0 },
    { name: 'Чт', tasks: 0 },
    { name: 'Пт', tasks: 0 },
    { name: 'Сб', tasks: 0 },
    { name: 'Вс', tasks: 0 },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-gray-900">
      <div className="min-h-screen w-full">
        {/* Шапка */}
        <div className={`sticky top-0 z-10 flex items-center justify-between p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Настройки
          </h2>
          <button
            onClick={onClose}
            className={`rounded-full p-2 ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <X className={`h-6 w-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
        </div>

        {/* Контент с прокруткой */}
        <div className="overflow-y-auto p-4 space-y-8">
          {/* Прогресс задач */}
          <section>
            <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Прогресс задач
            </h3>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
                    <XAxis 
                      dataKey="name" 
                      stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                    />
                    <YAxis 
                      stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                      domain={[-1, 1]}
                      ticks={[-1, -0.5, 0, 0.5, 1]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="tasks" 
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Выполнено</p>
                  <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>0</p>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>В процессе</p>
                  <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>0</p>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-red-50'}`}>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Просрочено</p>
                  <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>0</p>
                </div>
              </div>
            </div>
          </section>

          {/* Тема */}
          <section>
            <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Тема оформления
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <label className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer ${
                theme === 'light'
                  ? 'bg-blue-50 border-blue-500'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}>
                <span className={`${theme === 'light' ? 'text-blue-700' : 'text-gray-900'}`}>Светлая</span>
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
                  ? 'bg-gray-800 border-blue-500'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}>
                <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-gray-900'}`}>Темная</span>
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
          </section>

          {/* Уведомления */}
          <section>
            <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Уведомления
            </h3>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Включить уведомления
                  </p>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Получайте уведомления о новых задачах и дедлайнах
                  </p>
                </div>
                <span className="text-xs text-blue-500">В разработке</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 