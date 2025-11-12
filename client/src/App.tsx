import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { StoreProvider, useStore } from './app/providers/StoreProvider';
import TonProvider from './services/tonService';
import { HomePage } from './pages/home';
import { StudentDashboard, DashboardVM } from './pages/participant/dashboard';
import { OrganizerPanel, OrganizerDashboardVM } from './pages/organizer/dashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const AppRoutes: React.FC = () => {
  const rootStore = useStore();
  const dashboardVM = new DashboardVM(rootStore);
  const organizerDashboardVM = new OrganizerDashboardVM(rootStore);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student" element={<StudentDashboard viewModel={dashboardVM} />} />
        <Route path="/organizer" element={<OrganizerPanel viewModel={organizerDashboardVM} />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TonProvider>
          <AppRoutes />
        </TonProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;