import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Tabs, Tab, Zoom } from '@mui/material';
import { Person, AdminPanelSettings } from '@mui/icons-material';
import AdminLogin from '../components/AdminLogin';
import StudentLogin from '../components/StudentLogin';

const LoginPage = () => {
  const [tabValue, setTabValue] = useState(0);
  // const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      {/* Subtle Corporate Background Decoration (optional, or just clean) */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '30vh',
        bgcolor: 'primary.dark',
        zIndex: 0
      }} />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={700} gutterBottom sx={{ color: 'white' }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Sign in to access your campus dashboard
          </Typography>
        </Box>

        <Card sx={{ backdropFilter: 'blur(20px)', bgcolor: 'rgba(255,255,255,0.8)' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab icon={<Person />} iconPosition="start" label="Student" />
            <Tab icon={<AdminPanelSettings />} iconPosition="start" label="Admin" />
          </Tabs>

          <CardContent sx={{ p: 4 }}>
            {/* Student Login Tab */}
            <div role="tabpanel" hidden={tabValue !== 0}>
              {tabValue === 0 && (
                <Zoom in={tabValue === 0}>
                  <Box>
                    <StudentLogin />
                  </Box>
                </Zoom>
              )}
            </div>

            {/* Admin Login Tab */}
            <div role="tabpanel" hidden={tabValue !== 1}>
              {tabValue === 1 && (
                <Zoom in={tabValue === 1}>
                  <Box>
                    <AdminLogin />
                  </Box>
                </Zoom>
              )}
            </div>
          </CardContent>
        </Card>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
          © 2024 CampusLink System
        </Typography>
      </Container>
    </Box>
  );
};

export default LoginPage;
