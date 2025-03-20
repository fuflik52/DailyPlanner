import { PlusCircle, Calendar, CheckSquare, BellRing } from 'lucide-react';
import { useStore } from '../../store';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
}

const ActionCard = ({ title, description, icon, onClick, color }: ActionCardProps) => {
  const theme = useStore((state) => state.theme);
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center p-4 rounded-lg transition-all hover:shadow-md ${
        theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className={`p-3 rounded-full mr-4 ${color}`}>
        {icon}
      </div>
      <div className="text-left">
        <h3 className="font-semibold">{title}</h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {description}
        </p>
      </div>
    </button>
  );
};

export function QuickActions() {
  const theme = useStore((state) => state.theme);
  const setNotification = useStore((state) => state.setNotification);
  
  const handleNewTask = () => {
    window.history.pushState({}, '', '/tasks');
    window.dispatchEvent(new Event('popstate'));
    setNotification({
      message: 'Переход к созданию новой задачи',
      type: 'info'
    });
  };
  
  const handleNewEvent = () => {
    window.history.pushState({}, '', '/calendar');
    window.dispatchEvent(new Event('popstate'));
    setNotification({
      message: 'Переход к созданию нового события',
      type: 'info'
    });
  };
  
  const handleViewTasks = () => {
    window.history.pushState({}, '', '/tasks');
    window.dispatchEvent(new Event('popstate'));
  };
  
  return (
    <div className="mb-8">
      <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Быстрые действия
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ActionCard
          title="Новая задача"
          description="Добавить задачу"
          icon={<PlusCircle className="h-6 w-6 text-blue-500" />}
          onClick={handleNewTask}
          color="bg-blue-100"
        />
        
        <ActionCard
          title="Расписание"
          description="Создать событие"
          icon={<Calendar className="h-6 w-6 text-purple-500" />}
          onClick={handleNewEvent}
          color="bg-purple-100"
        />
        
        <ActionCard
          title="Задачи"
          description="Все задачи"
          icon={<CheckSquare className="h-6 w-6 text-green-500" />}
          onClick={handleViewTasks}
          color="bg-green-100"
        />
        
        <div className={`flex flex-col items-center justify-center p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'} border border-dashed ${theme === 'dark' ? 'border-blue-700' : 'border-blue-200'}`}>
          <div className="text-center p-3">
            <p className="text-blue-500 font-medium mb-1">В разработке</p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Модуль напоминаний появится в следующем обновлении
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}