import React from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Button, IconButton } from '@mui/material';
import { Event, Description, Delete, Edit } from '@mui/icons-material';

const announcements = [
  {
    title: 'Exam Schedule Update',
    date: '2025-07-25',
    content: 'The exam schedule for the upcoming semester has been updated. Please check your department notice board for more details.',
    type: 'academic'
  },
  {
    title: 'Library Hours Extension',
    date: '2025-07-25',
    content: 'The library will have extended hours during exam week. New schedule: Monday-Saturday: 8:00 AM - 10:00 PM',
    type: 'library'
  },
  {
    title: 'Sports Day Registration',
    date: '2025-07-25',
    content: 'Registration for the annual sports day is now open. Please register through the sports department portal.',
    type: 'sports'
  }
];

const Announcements = () => {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ bgcolor: '#f5f5f5', p: 3 }}>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            Announcements
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Latest campus news and updates
          </Typography>
        </Container>
      </Box>

      {/* Announcements List */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {announcements.map((announcement, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Event sx={{ mr: 2 }} />
                    <Typography variant="subtitle1" color="text.secondary">
                      {new Date(announcement.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {announcement.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {announcement.content}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      size="small"
                    >
                      Read More
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      size="small"
                      startIcon={<Edit />}
                    >
                      Edit
                    </Button>
                    <IconButton color="error" size="small">
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Add New Announcement */}
      <Container sx={{ py: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Description />} 
          fullWidth
        >
          Add New Announcement
        </Button>
      </Container>
    </Box>
  );
};

export default Announcements;
