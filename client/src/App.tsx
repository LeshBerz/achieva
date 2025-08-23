import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initTelegram } from './services/telegramService';
import TonProvider from './services/tonService';
import EventList from './components/EventList';
import Rewards from './components/Rewards';

function App() {
  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <TonProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/organizer" element={<OrganizerPanel />} />
          </Routes>
        </div>
      </Router>
    </TonProvider>
  );
}

function Home() {
  return <h1 className="text-2xl font-bold text-center py-10">Добро пожаловать в Achieva!</h1>;
}

function StudentDashboard() {
  return (
    <div className="p-4">
      <h2>Дашборд студента</h2>
      <EventList />
      <Rewards />
    </div>
  );
}

function OrganizerPanel() {
  return (
    <div className="p-4">
      <h2>Панель организатора</h2>
      {/* Здесь список участников, выдача токенов */}
    </div>
  );
}

export default App;