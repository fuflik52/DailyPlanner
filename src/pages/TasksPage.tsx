import { useState } from 'react';
import { CheckCircle, Circle, Clock, Plus, Trash, Edit, ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import { Task } from '../types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export function TasksPage() {
  const theme = useStore((state) => state.theme);
  const tasks = useStore((state) => state.tasks);
  const addTask = useStore((state) => state.addTask);
  const updateTask = useStore((state) => state.updateTask);
  const deleteTask = useStore((state) => state.deleteTask);
  const setNotification = useStore((state) => state.setNotification);
  
  const [newTask, setNewTask] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: crypto.randomUUID(),
      title: newTask.trim(),
      completed: false,
      priority: 'medium',
      tags: [],
      checklist: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    addTask(task);
    setNewTask('');
    setNotification({ message: 'Задача добавлена', type: 'success' });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    setNotification({ message: 'Задача удалена', type: 'info' });
  };

  const handleToggleComplete = (task: Task) => {
    updateTask({ ...task, completed: !task.completed, updatedAt: new Date() });
  };

  const handleStartEdit = (task: Task) => {
    setEditingTask(task.id);
    setEditText(task.title);
  };

  const handleSaveEdit = (task: Task) => {
    if (!editText.trim()) return;
    
    updateTask({ ...task, title: editText.trim(), updatedAt: new Date() });
    setEditingTask(null);
    setNotification({ message: 'Задача обновлена', type: 'success' });
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
      <h2 className="text-2xl font-bold mb-6">Мои задачи</h2>
      
      {/* Форма добавления задачи */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Добавить новую задачу..."
          className={`flex-1 rounded-md border-0 py-2 px-3 ${
            theme === 'dark' 
              ? 'bg-gray-700 text-white placeholder:text-gray-400 ring-gray-600'
              : 'bg-gray-50 text-gray-900 placeholder:text-gray-400 ring-gray-200'
          } ring-1 ring-inset focus:ring-2 focus:ring-blue-600`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddTask();
          }}
        />
        <button
          onClick={handleAddTask}
          className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-1" /> Добавить
        </button>
      </div>

      {/* Фильтры */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-sm rounded-md ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Все
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 text-sm rounded-md ${
            filter === 'active'
              ? 'bg-blue-600 text-white'
              : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Активные
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 text-sm rounded-md ${
            filter === 'completed'
              ? 'bg-blue-600 text-white'
              : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Завершенные
        </button>
      </div>

      {/* Список задач */}
      <div className="space-y-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className={`p-4 rounded-lg border ${
                theme === 'dark' 
                  ? 'border-gray-700 bg-gray-700/50' 
                  : 'border-gray-200 bg-gray-50'
              } flex items-center`}
            >
              <button
                onClick={() => handleToggleComplete(task)}
                className="flex-shrink-0 mr-3"
              >
                {task.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6 text-gray-400" />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                {editingTask === task.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className={`w-full rounded-md border-0 py-1.5 px-3 ${
                      theme === 'dark' 
                        ? 'bg-gray-600 text-white'
                        : 'bg-white text-gray-900'
                    } focus:ring-2 focus:ring-blue-600`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEdit(task);
                      if (e.key === 'Escape') setEditingTask(null);
                    }}
                    autoFocus
                  />
                ) : (
                  <>
                    <h3 className={`text-base font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </h3>
                    <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{format(new Date(task.createdAt), 'PPp', { locale: ru })}</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex-shrink-0 ml-3 flex items-center space-x-2">
                {editingTask === task.id ? (
                  <button
                    onClick={() => handleSaveEdit(task)}
                    className="p-1 text-blue-500 hover:text-blue-600"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleStartEdit(task)}
                    className={`p-1 ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className={`p-1 ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-red-500'
                      : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Trash className="h-5 w-5" />
                </button>
                <button
                  className={`p-1 ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={`p-8 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>Нет задач для отображения</p>
          </div>
        )}
      </div>
    </div>
  );
} 