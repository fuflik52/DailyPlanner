import { useStore } from '../../store';

export function WelcomeSection() {
  const theme = useStore((state) => state.theme);
  const user = useStore((state) => state.user);

  return (
    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Добро пожаловать, {user?.username || 'Гость'}!
      </h1>
      <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Начните свой день с планирования задач и отслеживания прогресса.
      </p>
    </div>
  );
}