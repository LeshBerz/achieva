import React from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { EventListVM } from '../model/EventListVM';
import './EventList.scss';

interface EventListProps {
  viewModel: EventListVM;
}

export const EventList: React.FC<EventListProps> = observer(({ viewModel }) => {
  if (viewModel.isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2} className="event-list">
      {viewModel.events.map(event => (
        <Grid item xs={12} md={6} key={event.id}>
          <Card 
            className="event-card"
            onClick={() => viewModel.selectEvent(event)}
            sx={{ cursor: 'pointer' }}
          >
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                {event.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {event.date}
              </Typography>
              <Typography variant="body2">
                {event.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});

