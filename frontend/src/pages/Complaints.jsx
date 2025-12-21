import React from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Button, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, CardActions } from '@mui/material';
import { Delete, Edit, Send } from '@mui/icons-material';

const complaintTypes = [
  'Maintenance',
  'Academic',
  'Security',
  'Transport',
  'Food',
  'Other'
];

// Use localStorage for complaints persistence
function getStoredComplaints() {
  const stored = localStorage.getItem('complaints');
  return stored ? JSON.parse(stored) : [];
}


const Complaints = () => {
  const [complaints, setComplaints] = React.useState(getStoredComplaints());
  const [newComplaint, setNewComplaint] = React.useState({
    type: '',
    description: '',
    department: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComplaint(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add student info if available
    const user = localStorage.getItem('user');
    let student = {};
    if (user) {
      const parsed = JSON.parse(user);
      student = { studentName: parsed.name || '', studentRoll: parsed.rollNumber || '' };
    }
    const complaintToAdd = {
      ...newComplaint,
      ...student,
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      status: 'Pending',
    };
    const updated = [...complaints, complaintToAdd];
    setComplaints(updated);
    localStorage.setItem('complaints', JSON.stringify(updated));
    setNewComplaint({
      type: '',
      description: '',
      department: ''
    });
  };


  // Determine if user is admin
  const user = localStorage.getItem('user');
  let isAdmin = false;
  if (user) {
    const parsed = JSON.parse(user);
    isAdmin = parsed.role === 'admin';
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ bgcolor: '#f5f5f5', p: 3 }}>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            Complaints
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Report and track campus issues
          </Typography>
        </Container>
      </Box>

      {/* Show complaint form only for non-admins */}
      {!isAdmin && (
        <Container sx={{ py: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Submit New Complaint
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Type</InputLabel>
                      <Select
                        name="type"
                        value={newComplaint.type}
                        onChange={handleInputChange}
                        label="Type"
                      >
                        {complaintTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="department"
                      label="Department"
                      value={newComplaint.department}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="description"
                      label="Description"
                      value={newComplaint.description}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<Send />}
                      fullWidth
                    >
                      Submit Complaint
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Container>
      )}

      {/* Complaints List */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {complaints.map((complaint) => (
            <Grid item xs={12} key={complaint.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography variant="subtitle1" color="text.secondary">
                        {new Date(complaint.date).toLocaleDateString()}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {complaint.type}
                      </Typography>
                      {complaint.studentName && (
                        <Typography color="text.secondary">
                          Student: {complaint.studentName} {complaint.studentRoll ? `(${complaint.studentRoll})` : ''}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton color="primary" size="small">
                        <Edit />
                      </IconButton>
                      <IconButton color="error" size="small">
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography paragraph>
                    {complaint.description}
                  </Typography>
                  <Typography color="text.secondary">
                    Department: {complaint.department}
                  </Typography>
                  <Typography color="text.secondary">
                    Status: {complaint.status}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                  >
                    Track Status
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Complaints;
