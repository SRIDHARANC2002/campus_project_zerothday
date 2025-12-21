import React, { useContext } from 'react';
import { EventContext } from './EventContext';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';

const StudentProfile = () => {
  const { events } = useContext(EventContext);
  // Show all events (no date filter)
  const allEvents = events;

  return (
    <Box sx={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)`,
      py: 6,
      position: 'relative',
      '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'url(https://www.transparenttextures.com/patterns/cubes.png)',
        opacity: 0.08,
        zIndex: 0,
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{
          borderRadius: 5,
          boxShadow: 6,
          background: 'rgba(255,255,255,0.98)',
          px: { xs: 2, md: 6 },
          py: { xs: 3, md: 5 },
          mb: 4,
          textAlign: 'center',
        }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, color: '#1a237e', letterSpacing: 1 }}>
            👤 Student Profile
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
            View your upcoming events
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#3949ab', letterSpacing: 0.5 }}>
            📅 Upcoming Events
          </Typography>
        </Box>
        {allEvents.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18, textAlign: 'center', mt: 4 }}>
            No events available.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {[...allEvents].reverse().map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card sx={{
                  borderRadius: 5,
                  boxShadow: 6,
                  background: 'linear-gradient(120deg, #f8fafc 60%, #e3eafc 100%)',
                  transition: 'transform 0.2s',
                  position: 'relative',
                  overflow: 'visible',
                  '&:hover': { transform: 'translateY(-8px) scale(1.03)', boxShadow: 10 },
                }}>
                  <CardContent sx={{ p: 3, position: 'relative' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        boxShadow: 3,
                      }}>
                        <span role="img" aria-label="event" style={{ fontSize: 26 }}>🎈</span>
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#1976d2', mb: 0 }}>
                        {event.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{
                        background: 'linear-gradient(90deg, #42a5f5 60%, #1976d2 100%)',
                        color: '#fff',
                        borderRadius: 2,
                        px: 1.5,
                        py: 0.5,
                        fontWeight: 700,
                        fontSize: 15,
                        mr: 1.5,
                        minWidth: 90,
                        textAlign: 'center',
                        letterSpacing: 0.5,
                        boxShadow: 1,
                      }}>
                        {event.date ? new Date(event.date).toLocaleDateString() : ''}
                      </Box>
                      <Typography color="text.secondary" sx={{ fontSize: 15 }}>
                        {event.location}
                      </Typography>
                    </Box>
                    <Typography color="text.secondary" sx={{ mb: 1, fontSize: 15, minHeight: 40 }}>
                      <strong>Description:</strong> {event.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default StudentProfile;