import { useState, useEffect } from 'react';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Заглушка для fetch с бэкенда (в будущем: реальный API)
    const fetchEvents = async () => {
      // const response = await fetch('/api/events');
      // const data = await response.json();
      const mockData: Event[] = [
        { id: '1', title: 'Лекция по блокчейну', date: '2025-09-01', description: 'Узнай о TON' },
        { id: '2', title: 'Хакатон СПбГУ', date: '2025-09-15', description: 'Разработка мини-приложений' },
      ];
      setEvents(mockData);
    };
    fetchEvents();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {events.map(event => (
        <div key={event.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="text-lg font-bold">{event.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;