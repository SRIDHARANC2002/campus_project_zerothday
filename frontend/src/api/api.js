import axios from 'axios';

const API_BASE_URL = 'https://campus-connect-backend-7ubg.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to log requests
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Sending request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to log responses
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Authentication API
export const authApi = {
  registerStudent: async (studentData) => {
    try {
      const response = await api.post('/api/auth/student/register', studentData);
      console.log('✅ Student registered:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Registration failed:', error);
      throw error;
    }
  },
  loginStudent: async (credentials) => {
    try {
      const response = await api.post('/api/auth/student/login', credentials);
      console.log('✅ Student logged in:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  }
};

// Event API
export const eventApi = {
  getEvents: async () => {
    try {
      const response = await api.get('/api/events');
      console.log('✅ Events fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to fetch events:', error);
      throw error;
    }
  },
  createEvent: async (eventData) => {
    try {
      const response = await api.post('/api/events', eventData);
      console.log('✅ Event created:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to create event:', error);
      throw error;
    }
  },
  updateEvent: async (eventId, eventData) => {
    try {
      const response = await api.put(`/api/events/${eventId}`, eventData);
      console.log('✅ Event updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to update event:', error);
      throw error;
    }
  },
  deleteEvent: async (eventId) => {
    try {
      const response = await api.delete(`/api/events/${eventId}`);
      console.log('✅ Event deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to delete event:', error);
      throw error;
    }
  }
};
