import React from 'react';
import { useStore } from '../../store';

export function WelcomeSection() {
  const user = useStore((state) => state.user);
  const currentHour = new Date().getHours();

  const getGreeting = () => {
    if (currentHour < 12) return 'Доброе утро';
    if (currentHour < 18) return 'Добрый день';
    return 'Добрый вечер';
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">
        {getGreeting()}, {user?.name}!
      </h1>
      <p className="mt-2 text-gray-600">
        Вот что запланировано на сегодня.
      </p>
    </div>
  );
}