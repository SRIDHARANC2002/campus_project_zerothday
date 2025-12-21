import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Alert } from '@mui/material';
import { authApi } from '../api/skillApi';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);



  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form data
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.loginAdmin(formData);

      // Store token and user data (response has user fields at root)
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      const userData = {
        role: response.role || 'admin',
        email: response.email || formData.email,
        name: response.name || '',
        _id: response._id || null
      };
      localStorage.setItem('user', JSON.stringify(userData));

      // Navigate to admin dashboard
      navigate('/dashboard/admin');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Admin Login Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} autoComplete="off">
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="off"
          autoFocus
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="admin-password"
          autoComplete="new-password"
          inputProps={{ autoComplete: 'new-password' }}
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? 'Logging in...' : 'Login as Admin'}
        </Button>
      </Box>
    </Box>
  );
};

export default AdminLogin;