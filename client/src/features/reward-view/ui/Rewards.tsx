import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Typography, Button, List, ListItem, Paper, CircularProgress } from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import { RewardsVM } from '../model/RewardsVM';
import './Rewards.scss';

interface RewardsProps {
  viewModel: RewardsVM;
}

export const Rewards: React.FC<RewardsProps> = observer(({ viewModel }) => {
  if (!viewModel.isConnected) {
    return (
      <Paper className="rewards-container">
        <Box textAlign="center" p={3}>
          <Typography variant="body1" color="text.secondary" mb={2}>
            Подключите TON Wallet, чтобы увидеть ваши награды
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => viewModel.connectWallet()}
            disabled={viewModel.isLoading}
            className="connect-wallet-button"
          >
            {viewModel.isLoading ? 'Подключение...' : 'Подключить TON Wallet'}
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper className="rewards-container">
      <Typography variant="h6" gutterBottom>
        Ваши награды (cSBT):
      </Typography>
      {viewModel.rewards.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          У вас пока нет наград. Участвуйте в мероприятиях, чтобы получить cSBT токены!
        </Typography>
      ) : (
        <List>
          {viewModel.rewards.map(reward => (
            <ListItem key={reward.id} className="reward-item">
              <Box display="flex" alignItems="center" gap={2}>
                <EmojiEvents fontSize="large" color="warning" />
                <Typography variant="body1">{reward.title}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
});

