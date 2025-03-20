import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useStore } from '../../store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function TasksSummary() {
  const tasks = useStore((state) => state.tasks);

  const data = {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    datasets: [
      {
        label: 'Выполненные задачи',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Статистика по неделям',
      },
    },
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Прогресс задач</h2>
      <div className="h-64">
        <Line options={options} data={data} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-gray-600">Выполнено</p>
          <p className="text-2xl font-bold text-blue-600">0</p>
        </div>
        <div className="rounded-lg bg-yellow-50 p-4">
          <p className="text-sm text-gray-600">В процессе</p>
          <p className="text-2xl font-bold text-yellow-600">0</p>
        </div>
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-gray-600">Просрочено</p>
          <p className="text-2xl font-bold text-red-600">0</p>
        </div>
      </div>
    </div>
  );
}