import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initTelegram } from './services/telegramService';
import TonProvider from './services/tonService';
import HomePage from './pages/HomePage';
import StudentDashboard from './pages/StudentDashboard';
import OrganizerPanel from './pages/OrganizerPanel';

function App() {
  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <TonProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/organizer" element={<OrganizerPanel />} />
        </Routes>
      </Router>
    </TonProvider>
  );
}

export default App;