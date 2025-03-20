import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CalendarPage } from './pages/CalendarPage';
import { TasksPage } from './pages/TasksPage';
import { SettingsPage } from './pages/SettingsPage';
import { RegisterForm } from './components/auth/RegisterForm';
import { Notification } from './components/Notification';
import { useStore } from './store';

type Page = 'home' | 'calendar' | 'tasks' | 'settings';

function App() {
  const user = useStore((state) => state.user);
  const theme = useStore((state) => state.theme);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  // Функция для смены страницы, будет передаваться в компоненты
  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };
  
  // Слушаем URL изменения для обновления текущей страницы
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      if (path === '/calendar') setCurrentPage('calendar');
      else if (path === '/tasks') setCurrentPage('tasks');
      else if (path === '/settings') setCurrentPage('settings');
      else setCurrentPage('home');
    };

    window.addEventListener('popstate', handleUrlChange);
    handleUrlChange(); // Проверяем начальный URL

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  // Обновляем URL при изменении страницы
  useEffect(() => {
    const newPath = currentPage === 'home' ? '/' : `/${currentPage}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
  }, [currentPage]);

  // Применяем тему к body элементу
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

  // Отображаем соответствующую страницу в зависимости от currentPage
  const renderPage = () => {
    switch (currentPage) {
      case 'calendar':
        return <CalendarPage />;
      case 'tasks':
        return <TasksPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

export default App;