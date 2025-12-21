import React from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Button, IconButton, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Description, Add, Delete, Edit } from '@mui/icons-material';

const items = [
  {
    id: 1,
    type: 'Wallet',
    description: 'Black leather wallet with college ID',
    location: 'Library',
    date: '2025-07-25',
    status: 'Found'
  },
  {
    id: 2,
    type: 'Laptop Charger',
    description: 'Apple MacBook charger',
    location: 'Cafeteria',
    date: '2025-07-24',
    status: 'Lost'
  },
  {
    id: 3,
    type: 'Student ID Card',
    description: 'College ID card with name and photo',
    location: 'Main Gate',
    date: '2025-07-23',
    status: 'Found'
  }
];

const LostAndFound = () => {
  const [newItem, setNewItem] = React.useState({
    type: '',
    description: '',
    location: '',
    status: 'Lost'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Submitting new item:', newItem);
    setNewItem({
      type: '',
      description: '',
      location: '',
      status: 'Lost'
    });
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ bgcolor: '#f5f5f5', p: 3 }}>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            Lost & Found
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Report lost items or claim found items
          </Typography>
        </Container>
      </Box>

      {/* Report New Item */}
      <Container sx={{ py: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Report New Item
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      name="type"
                      value={newItem.type}
                      onChange={handleInputChange}
                      label="Type"
                    >
                      <MenuItem value="Wallet">Wallet</MenuItem>
                      <MenuItem value="Phone">Phone</MenuItem>
                      <MenuItem value="Laptop">Laptop</MenuItem>
                      <MenuItem value="ID Card">ID Card</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={newItem.status}
                      onChange={handleInputChange}
                      label="Status"
                    >
                      <MenuItem value="Lost">Lost</MenuItem>
                      <MenuItem value="Found">Found</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="description"
                    label="Description"
                    value={newItem.description}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="location"
                    label="Location"
                    value={newItem.location}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    startIcon={<Add />}
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>

      {/* Items List */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      {item.status === 'Lost' ? 'Lost' : 'Found'} Item
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton color="primary" size="small">
                        <Edit />
                      </IconButton>
                      <IconButton color="error" size="small">
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="subtitle1" gutterBottom>
                    {item.type}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {item.description}
                  </Typography>
                  <Typography color="text.secondary">
                    Location: {item.location}
                  </Typography>
                  <Typography color="text.secondary">
                    Date: {new Date(item.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LostAndFound;
