import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Typography, Paper, Stack } from '@mui/material';
import { People, CardGiftcard } from '@mui/icons-material';
import { Layout } from '../../../../shared/ui/Layout/Layout';
import { ParticipantsList } from '../../../../widgets/ParticipantsList';
import { IssueToken } from '../../../../features/reward-issue';
import { OrganizerDashboardVM } from '../model/OrganizerDashboardVM';
import './OrganizerPanel.scss';

interface OrganizerPanelProps {
  viewModel: OrganizerDashboardVM;
}

export const OrganizerPanel: React.FC<OrganizerPanelProps> = observer(({ viewModel }) => {
  return (
    <Layout>
      <Box className="organizer-panel">
        <Typography variant="h4" component="h2" textAlign="center" mb={4} fontWeight="bold" color="success.main">
          Панель организатора
        </Typography>

        <Paper className="panel-section" sx={{ mb: 3 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <People color="success" />
            <Typography variant="h5" component="h3">
              Список участников и аналитика
            </Typography>
          </Box>
          <ParticipantsList viewModel={viewModel.participantsListVM} />
        </Paper>

        <Paper className="panel-section">
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <CardGiftcard color="secondary" />
            <Typography variant="h5" component="h3">
              Выдача наград
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {viewModel.participantsListVM.participants.map(participant => (
              <IssueToken
                key={participant.id}
                viewModel={viewModel.getIssueTokenVM(participant.id)}
              />
            ))}
          </Stack>
        </Paper>
      </Box>
    </Layout>
  );
});

