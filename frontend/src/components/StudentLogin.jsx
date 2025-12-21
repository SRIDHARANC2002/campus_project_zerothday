import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Alert } from '@mui/material';
import { authApi } from '../api/skillApi';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.rollNumber || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Use backend API for authentication
      const response = await authApi.loginStudent({
        rollNumber: formData.rollNumber,
        password: formData.password
      });

      // Store token and user info
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        role: 'student',
        rollNumber: formData.rollNumber,
        token: response.token
      }));

      console.log('Student login successful:', response);
      navigate('/dashboard/student');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="rollNumber"
          label="Roll Number"
          name="rollNumber"
          autoComplete="off"
          autoFocus
          value={formData.rollNumber}
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="student-password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login as Student'}
        </Button>
      </Box>
    </Box>
  );
};

export default StudentLogin;
