import axios from 'axios';

const API_BASE_URL = 'https://campus-connect-backend-7ubg.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Skill API functions
export const skillApi = {
  // Get all approved skills (public)
  getAllSkills: async (params = {}) => {
    const response = await api.get('/skills/all', { params });
    return response.data;
  },

  // Get skill categories (public)
  getCategories: async () => {
    const response = await api.get('/skills/categories');
    return response.data;
  },

  // Get experience levels (public)
  getExperienceLevels: async () => {
    const response = await api.get('/skills/experience-levels');
    return response.data;
  },

  // Get skill by ID (public)
  getSkillById: async (id) => {
    const response = await api.get(`/skills/${id}`);
    return response.data;
  },

  // Create new skill (student only)
  createSkill: async (skillData) => {
    const response = await api.post('/skills/create', skillData);
    return response.data;
  },

  // Get student's own skills (student only)
  getMySkills: async () => {
    const response = await api.get('/skills/student/my-skills');
    return response.data;
  },

  // Update skill (student only)
  updateSkill: async (id, skillData) => {
    const response = await api.put(`/skills/${id}`, skillData);
    return response.data;
  },

  // Delete skill (student only)
  deleteSkill: async (id) => {
    const response = await api.delete(`/skills/${id}`);
    return response.data;
  },

  // Admin: Get all skills for moderation
  getAllSkillsForAdmin: async (params = {}) => {
    const response = await api.get('/skills/admin/all', { params });
    return response.data;
  },

  // Admin: Moderate skill (approve/reject)
  moderateSkill: async (id, status) => {
    const response = await api.put(`/skills/admin/${id}/moderate`, { status });
    return response.data;
  },

  // Admin: Delete skill
  adminDeleteSkill: async (id) => {
    const response = await api.delete(`/skills/admin/${id}`);
    return response.data;
  },
};

// Booking API functions
export const bookingApi = {
  // Create new booking (student only)
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings/create', bookingData);
    return response.data;
  },

  // Get student's bookings (as learner)
  getMyBookings: async (params = {}) => {
    const response = await api.get('/bookings/student/my-bookings', { params });
    return response.data;
  },

  // Get sessions provided by student (as teacher)
  getProvidedSessions: async (params = {}) => {
    const response = await api.get('/bookings/student/my-provided-sessions', { params });
    return response.data;
  },

  // Cancel booking (student only)
  cancelBooking: async (id, reason) => {
    const response = await api.put(`/bookings/${id}/cancel`, { reason });
    return response.data;
  },

  // Complete booking (skill provider only)
  completeBooking: async (id) => {
    const response = await api.put(`/bookings/${id}/complete`);
    return response.data;
  },

  // Admin: Get all bookings
  getAllBookings: async (params = {}) => {
    const response = await api.get('/bookings/admin/all', { params });
    return response.data;
  },

  // Admin: Update booking status
  updateBookingStatus: async (id, status) => {
    const response = await api.put(`/bookings/admin/${id}/status`, { status });
    return response.data;
  },

  // Admin: Delete booking
  adminDeleteBooking: async (id) => {
    const response = await api.delete(`/bookings/admin/${id}`);
    return response.data;
  },
};

// Auth API functions
export const authApi = {
  // Student login
  loginStudent: async (credentials) => {
    const response = await api.post('/users/student/login', credentials);
    return response.data;
  },

  // Admin login
  loginAdmin: async (credentials) => {
    const response = await api.post('/users/admin/login', credentials);
    return response.data;
  },

  // Student registration
  registerStudent: async (studentData) => {
    const response = await api.post('/users/student/register', studentData);
    return response.data;
  },
};

export default api; 