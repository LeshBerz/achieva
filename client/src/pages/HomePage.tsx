import Layout from '../components/Layout';
import { FaAward, FaUsers } from 'react-icons/fa'; // Иконки для украшения

const HomePage = () => {
  return (
    <Layout>
      <div className="text-center py-12 bg-gradient-to-b from-blue-100 to-white dark:from-blue-900 dark:to-gray-900 rounded-xl shadow-lg p-8 animate-fade-in">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-700 dark:text-blue-300 flex justify-center items-center gap-2">
          <FaAward /> Добро пожаловать в Achieva!
        </h1>
        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Система цифровых наград для студентов и организаторов на базе TON блокчейна. Получайте токены cSBT за участие в мероприятиях и анализируйте вовлеченность.
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="/student"
            className="bg-blue-600 text-white px-8 py-4 rounded-full shadow-md hover:bg-blue-700 hover:shadow-xl transition transform hover:scale-105 flex items-center gap-2"
            aria-label="Войти как студент"
          >
            <FaUsers /> Войти как студент
          </a>
          <a
            href="/organizer"
            className="bg-green-600 text-white px-8 py-4 rounded-full shadow-md hover:bg-green-700 hover:shadow-xl transition transform hover:scale-105 flex items-center gap-2"
            aria-label="Войти как организатор"
          >
            <FaUsers /> Войти как организатор
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;