import Layout from '../components/Layout';
import EventList from '../components/EventList';
import Rewards from '../components/Rewards';
import { FaCalendarAlt, FaTrophy } from 'react-icons/fa';

const StudentDashboard = () => {
  return (
    <Layout>
      <div className="space-y-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700 dark:text-blue-300 animate-fade-in">Дашборд студента</h2>
        
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <FaCalendarAlt className="text-blue-500" /> Доступные мероприятия
          </h3>
          <EventList />
        </section>
        
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <FaTrophy className="text-yellow-500" /> Ваши награды (cSBT)
          </h3>
          <Rewards />
        </section>
      </div>
    </Layout>
  );
};

export default StudentDashboard;