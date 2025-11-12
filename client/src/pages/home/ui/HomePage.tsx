import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import { EmojiEvents, Person, Business } from '@mui/icons-material';
import { Layout } from '../../../shared/ui/Layout/Layout';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  return (
    <Layout>
      <Paper className="home-page">
        <Box textAlign="center" py={4}>
          <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={2}>
            <EmojiEvents fontSize="large" color="primary" />
            <Typography variant="h3" component="h1" fontWeight="bold">
              Добро пожаловать в Achieva!
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" mb={4} maxWidth="600px" mx="auto">
            Система цифровых наград для студентов и организаторов на базе TON блокчейна. Получайте токены cSBT за участие в мероприятиях и анализируйте вовлеченность.
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
            <Button
              component={Link}
              to="/student"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<Person />}
              className="home-button"
            >
              Войти как студент
            </Button>
            <Button
              component={Link}
              to="/organizer"
              variant="contained"
              color="success"
              size="large"
              startIcon={<Business />}
              className="home-button"
            >
              Войти как организатор
            </Button>
          </Box>
        </Box>
      </Paper>
    </Layout>
  );
};

