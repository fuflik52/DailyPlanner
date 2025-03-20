import { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../store';

export function Notification() {
  const notification = useStore((state) => state.notification);
  const setNotification = useStore((state) => state.setNotification);
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  if (!notification) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return theme === 'dark' ? 'bg-green-900' : 'bg-green-50';
      case 'error':
        return theme === 'dark' ? 'bg-red-900' : 'bg-red-50';
      case 'info':
        return theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50';
      default:
        return theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50';
    }
  };

  const getTextColor = () => {
    switch (notification.type) {
      case 'success':
        return theme === 'dark' ? 'text-green-100' : 'text-green-800';
      case 'error':
        return theme === 'dark' ? 'text-red-100' : 'text-red-800';
      case 'info':
        return theme === 'dark' ? 'text-blue-100' : 'text-blue-800';
      default:
        return theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`${getBgColor()} ${getTextColor()} p-4 rounded-lg shadow-lg max-w-sm flex items-start`}>
        <div className="flex-shrink-0 mr-3">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
        <button
          onClick={() => setNotification(null)}
          className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
} 