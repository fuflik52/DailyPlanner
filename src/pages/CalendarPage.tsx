import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday, 
  addMonths, 
  subMonths,
  getDay,
  startOfWeek,
  endOfWeek,
  isWeekend
} from 'date-fns';
import { ru } from 'date-fns/locale';

// Дни недели в правильном порядке (ПН-ВС)
const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

export function CalendarPage() {
  const theme = useStore((state) => state.theme);
  const events = useStore((state) => state.events);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const renderHeader = () => {
    const dateFormat = 'LLLL yyyy';
    return (
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-2xl font-bold">
          {format(currentMonth, dateFormat, { locale: ru }).charAt(0).toUpperCase() + format(currentMonth, dateFormat, { locale: ru }).slice(1)}
        </h2>
        <div className="flex space-x-2">
          <button
            className={`rounded-md p-2 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className={`rounded-md p-2 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}
            onClick={() => setCurrentMonth(new Date())}
          >
            Сегодня
          </button>
          <button
            className={`rounded-md p-2 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    return (
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className={`font-semibold text-center ${
              index >= 5 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    
    // Начальная и конечная дата для отображения календаря
    // Начинаем с понедельника на первую неделю месяца и заканчиваем воскресеньем последней недели
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // 1 - Monday
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    
    const dateFormat = 'd';
    const rows = [];

    let days = eachDayOfInterval({ start: startDate, end: endDate });
    let formattedDays = [];

    for (let day of days) {
      // Определяем, является ли день выходным
      const isWeekendDay = isWeekend(day);
      
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate.getDate() === day.getDate() &&
               eventDate.getMonth() === day.getMonth() &&
               eventDate.getFullYear() === day.getFullYear();
      });

      formattedDays.push(
        <div
          key={day.toString()}
          className={`min-h-[100px] p-2 border ${
            theme === 'dark' 
              ? 'border-gray-700' 
              : 'border-gray-200'
          } ${
            !isSameMonth(day, monthStart)
              ? theme === 'dark' ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'
              : isToday(day)
              ? theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
              : isWeekendDay
              ? theme === 'dark' ? 'bg-red-900/10' : 'bg-red-50'
              : theme === 'dark' ? 'bg-green-900/10' : 'bg-green-50'
          }`}
        >
          <div className={`text-right ${
            isToday(day) 
              ? 'font-bold text-blue-500' 
              : isWeekendDay
              ? 'text-red-500'
              : 'text-green-600'
          }`}>
            {format(day, dateFormat)}
          </div>
          <div className="mt-1">
            {dayEvents.map(event => (
              <div 
                key={event.id} 
                className={`mb-1 px-2 py-1 text-xs rounded truncate`}
                style={{ backgroundColor: event.color + (theme === 'dark' ? '30' : '20') }}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Разбиваем дни на недели (по 7 дней)
    const totalDays = formattedDays.length;
    const totalWeeks = Math.ceil(totalDays / 7);
    
    for (let i = 0; i < totalWeeks; i++) {
      rows.push(
        <div key={`week-${i}`} className="grid grid-cols-7">
          {formattedDays.slice(i * 7, (i + 1) * 7)}
        </div>
      );
    }

    return <div className="overflow-auto space-y-1">{rows}</div>;
  };

  return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
} 