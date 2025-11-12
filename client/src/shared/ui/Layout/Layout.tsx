import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Container, Button, IconButton } from '@mui/material';
import { Home, Person, Business } from '@mui/icons-material';
import './Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <Box className="layout">
      <AppBar position="sticky" className="layout-header">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Home /> Achieva
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/student"
              color="inherit"
              startIcon={<Person />}
              className={location.pathname === '/student' ? 'active' : ''}
            >
              Студент
            </Button>
            <Button
              component={Link}
              to="/organizer"
              color="inherit"
              startIcon={<Business />}
              className={location.pathname === '/organizer' ? 'active' : ''}
            >
              Организатор
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="layout-main">
        {children}
      </Container>

      <Box component="footer" className="layout-footer">
        <Typography variant="body2" align="center">
          © 2025 Achieva. На базе TON и Telegram. Все права защищены.
        </Typography>
      </Box>
    </Box>
  );
};

