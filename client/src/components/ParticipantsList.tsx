import { useState, useEffect } from 'react';
import { FaSort, FaUser } from 'react-icons/fa'; // Иконки для сортировки и пользователей

interface Participant {
  id: string;
  name: string;
  rewardsCount: number;
  engagementScore: number; // Метрика вовлеченности (баллы, mock)
  lastActivity: string;
}

const ParticipantsList: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [sortBy, setSortBy] = useState<'rewardsCount' | 'engagementScore'>('engagementScore');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    // Заглушка для fetch с бэкенда (в будущем: /api/participants)
    const fetchParticipants = async () => {
      const mockData: Participant[] = [
        { id: '1', name: 'Иван Иванов', rewardsCount: 5, engagementScore: 85, lastActivity: '2025-09-20' },
        { id: '2', name: 'Мария Петрова', rewardsCount: 3, engagementScore: 92, lastActivity: '2025-09-22' },
        { id: '3', name: 'Алексей Сидоров', rewardsCount: 7, engagementScore: 78, lastActivity: '2025-09-18' },
      ];
      setParticipants(mockData);
    };
    fetchParticipants();
  }, []);

  const sortedParticipants = [...participants].sort((a, b) => {
    if (sortBy === 'rewardsCount') {
      return sortAsc ? a.rewardsCount - b.rewardsCount : b.rewardsCount - a.rewardsCount;
    }
    return sortAsc ? a.engagementScore - b.engagementScore : b.engagementScore - a.engagementScore;
  });

  const toggleSort = (field: 'rewardsCount' | 'engagementScore') => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Участник
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('rewardsCount')}>
              Награды <FaSort className="inline ml-1" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort('engagementScore')}>
              Вовлеченность <FaSort className="inline ml-1" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Последняя активность
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Действия
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {sortedParticipants.map(participant => (
            <tr key={participant.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                <FaUser className="text-blue-500" /> {participant.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{participant.rewardsCount}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded ${participant.engagementScore > 80 ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200' : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'}`}>
                  {participant.engagementScore}%
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{participant.lastActivity}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">Просмотр</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantsList;