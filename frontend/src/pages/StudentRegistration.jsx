import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button, TextField, FormControl, InputLabel, Select, MenuItem, Paper, Alert } from '@mui/material';
import { Save } from '@mui/icons-material';

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    password: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Password is hidden by default
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    if (!formData.rollNumber || !formData.name || !formData.email || !formData.department || !formData.semester || !formData.password) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    // Save student data to localStorage
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    students.push({ ...formData });
    localStorage.setItem('students', JSON.stringify(students));

    setSuccessMessage('Student registered successfully!');
    setErrorMessage('');

    setFormData({
      rollNumber: '',
      name: '',
      email: '',
      phone: '',
      department: '',
      semester: '',
      password: ''
    });

    setTimeout(() => {
      navigate('/dashboard/admin');
    }, 2000);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Register New Student
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="rollNumber"
                  label="Roll Number"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  required
                  helperText="Enter student's roll number"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  helperText="Enter student's full name"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  helperText="Enter student's email address"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  helperText="Enter student's phone number"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    <MenuItem value="">Select Department</MenuItem>
                    <MenuItem value="CSE">Computer Science & Engineering</MenuItem>
                    <MenuItem value="ECE">Electronics & Communication Engineering</MenuItem>
                    <MenuItem value="MECH">Mechanical Engineering</MenuItem>
                    <MenuItem value="CIVIL">Civil Engineering</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Semester</InputLabel>
                  <Select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    required
                  >
                    <MenuItem value="">Select Semester</MenuItem>
                    <MenuItem value="1">Semester 1</MenuItem>
                    <MenuItem value="2">Semester 2</MenuItem>
                    <MenuItem value="3">Semester 3</MenuItem>
                    <MenuItem value="4">Semester 4</MenuItem>
                    <MenuItem value="5">Semester 5</MenuItem>
                    <MenuItem value="6">Semester 6</MenuItem>
                    <MenuItem value="7">Semester 7</MenuItem>
                    <MenuItem value="8">Semester 8</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* ...other fields... */}
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  helperText="Enter student's password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          tabIndex={-1}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<Save />}
                  sx={{ mt: 3 }}
                >
                  Register Student
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default StudentRegistration;
