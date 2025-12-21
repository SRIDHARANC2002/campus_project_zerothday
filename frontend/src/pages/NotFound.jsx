import React from 'react';
import { Box, Container, Typography, Button, Link, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: { xs: '4rem', md: '6rem' } }}>
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" paragraph>
            The page you are looking for doesn't exist or has been moved.
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="contained"
            color="primary"
            startIcon={<ArrowBack />}
            size="large"
          >
            Go Back Home
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound;
