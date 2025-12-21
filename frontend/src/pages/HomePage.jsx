import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  AppBar,
  Toolbar,
  Link
} from '@mui/material';
import {
  School,
  Event,
  Poll,
  Assignment,
  ArrowForward,
  Login
} from '@mui/icons-material';

const HomePage = () => {

  const features = [
    {
      icon: <Assignment fontSize="large" color="primary" />,
      title: 'Digital Timetables',
      description: 'Access your class schedules instantly and never miss a lecture again.'
    },
    {
      icon: <Event fontSize="large" color="secondary" />,
      title: 'Campus Events',
      description: 'Stay updated with the latest workshops, cultural fests, and seminars.'
    },
    {
      icon: <School fontSize="large" color="error" />,
      title: 'Skill Exchange',
      description: 'Connect with peers to learn new skills or share your expertise.'
    },
    {
      icon: <Poll fontSize="large" color="success" />,
      title: 'Live Polls',
      description: 'Participate in campus decisions through interactive voting.'
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Navbar */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.05)', bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <School color="primary" sx={{ fontSize: 32 }} />
              <Typography variant="h5" color="text.primary" fontWeight={700} sx={{ letterSpacing: '-0.5px' }}>
                Campus<Box component="span" color="primary.main">Link</Box>
              </Typography>
            </Stack>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              startIcon={<Login />}
              sx={{ px: 3 }}
            >
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ pt: { xs: 8, md: 16 }, pb: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
        {/* Background blobs - simplified/removed for corporate look, just clean background */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="secondary" fontWeight={600} sx={{ letterSpacing: 2 }}>
                CAMPUS MANAGEMENT REIMAGINED
              </Typography>
              <Typography variant="h1" sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 2,
                color: 'text.primary',
                lineHeight: 1.1,
                letterSpacing: '-1px'
              }}>
                Inspiration & Innovation.
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6, fontWeight: 400 }}>
                Your centralized hub for student utilities. From announcements to complaint tracking, empower your academic journey with a unified platform designed for the modern campus.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{ fontSize: '1.1rem', px: 4, py: 1.5 }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ fontSize: '1.1rem', px: 4, py: 1.5 }}
                >
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Campus Life"
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom color="text.primary">
            Why CampusLink?
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}>
            Everything you need to manage your campus life efficiently, all in one place.
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', border: 'none', boxShadow: 'none', bgcolor: 'transparent', textAlign: 'center' }}>
                  <CardContent>
                    <Box sx={{ mb: 3, p: 2, borderRadius: 4, bgcolor: 'action.hover', display: 'inline-block' }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, bgcolor: 'primary.main', color: 'white', mt: 'auto' }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              © 2024 CampusLink. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={3}>
              <Link href="#" color="inherit" underline="hover">Privacy</Link>
              <Link href="#" color="inherit" underline="hover">Terms</Link>
              <Link href="#" color="inherit" underline="hover">Contact</Link>
            </Stack>
          </Stack>
        </Container>
      </Box>

    </Box>
  );
};

export default HomePage;