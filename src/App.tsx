import { useEffect, useState } from 'react';
import { useStore } from './store';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { CalendarPage } from './pages/CalendarPage';
import { TasksPage } from './pages/TasksPage';
import { AdminPage } from './pages/AdminPage';
import { RegisterForm } from './components/auth/RegisterForm';
import { Notification } from './components/Notification';

type Page = 'home' | 'calendar' | 'tasks' | 'admin';

function App() {
  const user = useStore((state) => state.user);
  const theme = useStore((state) => state.theme);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      if (path === '/calendar') setCurrentPage('calendar');
      else if (path === '/tasks') setCurrentPage('tasks');
      else if (path === '/boss/admin') setCurrentPage('admin');
      else setCurrentPage('home');
    };

    window.addEventListener('popstate', handleUrlChange);
    handleUrlChange();

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  useEffect(() => {
    const newPath = currentPage === 'home' ? '/' : 
                   currentPage === 'admin' ? '/boss/admin' : 
                   `/${currentPage}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  }, [currentPage]);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  if (!user) {
    return (
      <>
        <RegisterForm />
        <Notification />
      </>
    );
  }

  if (currentPage === 'admin') {
    return <AdminPage />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 overflow-y-auto pb-16 px-4">
        <div className="max-w-lg mx-auto w-full">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'calendar' && <CalendarPage />}
          {currentPage === 'tasks' && <TasksPage />}
        </div>
        <Notification />
      </main>
      <Sidebar />
    </div>
  );
}

export default App;