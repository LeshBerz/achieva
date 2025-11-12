import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
  Chip,
} from '@mui/material';
import { ArrowUpward, ArrowDownward, Person } from '@mui/icons-material';
import { ParticipantsListVM } from '../model/ParticipantsListVM';
import './ParticipantsList.scss';

interface ParticipantsListProps {
  viewModel: ParticipantsListVM;
}

export const ParticipantsList: React.FC<ParticipantsListProps> = observer(({ viewModel }) => {
  if (viewModel.isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} className="participants-list">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Участник</TableCell>
            <TableCell
              onClick={() => viewModel.toggleSort('rewardsCount')}
              sx={{ cursor: 'pointer', userSelect: 'none' }}
            >
              Награды{' '}
              {viewModel.sortBy === 'rewardsCount' ? (
                <ArrowUpward fontSize="small" />
              ) : (
                <ArrowDownward fontSize="small" />
              )}
            </TableCell>
            <TableCell
              onClick={() => viewModel.toggleSort('engagementScore')}
              sx={{ cursor: 'pointer', userSelect: 'none' }}
            >
              Вовлеченность{' '}
              {viewModel.sortBy === 'engagementScore' ? (
                <ArrowUpward fontSize="small" />
              ) : (
                <ArrowDownward fontSize="small" />
              )}
            </TableCell>
            <TableCell>Последняя активность</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {viewModel.participants.map(participant => (
            <TableRow key={participant.id} hover>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Person color="primary" /> {participant.name}
                </Box>
              </TableCell>
              <TableCell>{participant.rewardsCount}</TableCell>
              <TableCell>
                <Chip
                  label={`${participant.engagementScore}%`}
                  color={participant.engagementScore > 80 ? 'success' : 'warning'}
                  size="small"
                />
              </TableCell>
              <TableCell>{participant.lastActivity}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() =>
                    viewModel.handleViewParticipant(
                      participant.id,
                      participant.name,
                      participant.rewardsCount,
                      participant.engagementScore
                    )
                  }
                >
                  Просмотр
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

