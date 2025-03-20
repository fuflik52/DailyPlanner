import { useState } from 'react';
import { X, Calendar as CalendarIcon } from 'lucide-react';
import { useStore } from '../../store';
import { format } from 'date-fns';
import type { Task } from '../../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const theme = useStore((state) => state.theme);
  const addTask = useStore((state) => state.addTask);
  const setNotification = useStore((state) => state.setNotification);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setNotification({
        message: 'Введите название задачи',
        type: 'error'
      });
      return;
    }

    const now = new Date();
    const task: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: now,
      updatedAt: now,
      dueDate: new Date(dueDate),
      priority,
      status: 'active',
      tags: [],
      checklist: []
    };

    addTask(task);
    setNotification({
      message: 'Задача добавлена',
      type: 'success'
    });
    
    setTitle('');
    setDescription('');
    setDueDate(format(new Date(), 'yyyy-MM-dd'));
    setPriority('medium');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0" onClick={onClose} />
        
        <div className={`inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl rounded-2xl`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-medium leading-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Новая задача
            </h3>
            <button
              onClick={onClose}
              className={`rounded-full p-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <X className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Название
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'border-gray-300 focus:border-blue-500'
                } focus:ring-blue-500 sm:text-sm`}
                placeholder="Введите название задачи"
              />
            </div>

            <div>
              <label htmlFor="description" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Описание
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'border-gray-300 focus:border-blue-500'
                } focus:ring-blue-500 sm:text-sm`}
                placeholder="Введите описание задачи"
              />
            </div>

            <div>
              <label htmlFor="dueDate" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Срок выполнения
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={`block w-full pl-10 rounded-md shadow-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  } focus:ring-blue-500 sm:text-sm`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Приоритет
              </label>
              <div className="mt-2 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPriority('low')}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    priority === 'low'
                      ? theme === 'dark'
                        ? 'bg-green-900 text-green-300'
                        : 'bg-green-100 text-green-700'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Низкий
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('medium')}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    priority === 'medium'
                      ? theme === 'dark'
                        ? 'bg-yellow-900 text-yellow-300'
                        : 'bg-yellow-100 text-yellow-700'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Средний
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('high')}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    priority === 'high'
                      ? theme === 'dark'
                        ? 'bg-red-900 text-red-300'
                        : 'bg-red-100 text-red-700'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Высокий
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Добавить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 