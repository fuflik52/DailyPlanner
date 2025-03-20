import { useStore } from '../../store';

export function TaskProgress() {
  const tasks = useStore((state) => state.tasks);
  const theme = useStore((state) => state.theme);

  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Прогресс выполнения задач
        </span>
        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {progress}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {completed} из {total} задач выполнено
        </span>
      </div>
    </div>
  );
} 