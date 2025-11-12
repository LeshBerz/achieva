import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Typography, Paper } from '@mui/material';
import { CalendarToday, EmojiEvents } from '@mui/icons-material';
import { Layout } from '../../../../shared/ui/Layout/Layout';
import { EventList } from '../../../../widgets/EventList';
import { Rewards } from '../../../../features/reward-view';
import { DashboardVM } from '../model/DashboardVM';
import './StudentDashboard.scss';

interface StudentDashboardProps {
  viewModel: DashboardVM;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = observer(({ viewModel }) => {
  return (
    <Layout>
      <Box className="student-dashboard">
        <Typography variant="h4" component="h2" textAlign="center" mb={4} fontWeight="bold">
          Дашборд студента
        </Typography>

        <Paper className="dashboard-section" sx={{ mb: 3 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <CalendarToday color="primary" />
            <Typography variant="h5" component="h3">
              Доступные мероприятия
            </Typography>
          </Box>
          <EventList viewModel={viewModel.eventListVM} />
        </Paper>

        <Paper className="dashboard-section">
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <EmojiEvents color="warning" />
            <Typography variant="h5" component="h3">
              Ваши награды (cSBT)
            </Typography>
          </Box>
          <Rewards viewModel={viewModel.rewardsVM} />
        </Paper>
      </Box>
    </Layout>
  );
});

