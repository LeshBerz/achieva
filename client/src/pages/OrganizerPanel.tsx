import Layout from '../components/Layout';
import ParticipantsList from '../components/ParticipantsList';
import IssueToken from '../components/IssueToken';
import { FaUserFriends, FaGift } from 'react-icons/fa';

const OrganizerPanel = () => {
  return (
    <Layout>
      <div className="space-y-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700 dark:text-green-300 animate-fade-in">Панель организатора</h2>
        
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <FaUserFriends className="text-green-500" /> Список участников и аналитика
          </h3>
          <ParticipantsList />
        </section>
        
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <FaGift className="text-purple-500" /> Выдача наград
          </h3>
          <div className="flex flex-wrap gap-4">
            <IssueToken participantId="1" />
            {/* Можно добавить больше кнопок динамически, например, для каждого участника из списка */}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default OrganizerPanel;