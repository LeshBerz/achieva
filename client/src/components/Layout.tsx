import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserGraduate, FaUserTie } from 'react-icons/fa';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-blue-950 text-gray-900 dark:text-gray-100">
      <header className="bg-blue-700 dark:bg-blue-900 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-extrabold flex items-center gap-2 hover:text-blue-300 transition">
            <FaHome /> Achieva
          </Link>
          <nav className="flex gap-6">
            <Link to="/student" className="flex items-center gap-1 hover:text-blue-300 transition text-lg">
              <FaUserGraduate /> Студент
            </Link>
            <Link to="/organizer" className="flex items-center gap-1 hover:text-blue-300 transition text-lg">
              <FaUserTie /> Организатор
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6 md:p-8">
        {children}
      </main>

      <footer className="bg-blue-700 dark:bg-blue-900 text-white p-4 text-center shadow-lg mt-auto">
        © 2025 Achieva. На базе TON и Telegram. Все права защищены.
      </footer>
    </div>
  );
};

export default Layout;