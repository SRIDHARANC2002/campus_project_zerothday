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

// Poll API functions
export const pollApi = {
  // Get poll categories (public)
  getCategories: async () => {
    try {
      const response = await api.get('/polls/categories');
      return response.data;
    } catch (error) {
      // If the endpoint is not available (404) return an empty categories list to avoid noisy errors
      if (error.response && error.response.status === 404) {
        console.warn('Poll categories endpoint not found; proceeding with empty categories.');
        return { categories: [] };
      }
      throw error;
    }
  },

  // Get poll statistics (public)
  getStats: async () => {
    const response = await api.get('/polls/stats');
    return response.data;
  },

  // Get active polls (student only)
  getActivePolls: async (params = {}) => {
    const response = await api.get('/polls/active', { params });
    return response.data;
  },

  // Get poll by ID (student only)
  getPollById: async (id) => {
    const response = await api.get(`/polls/${id}`);
    return response.data;
  },

  // Vote on poll (student only)
  voteOnPoll: async (pollId, selectedOptions) => {
    const response = await api.post(`/polls/${pollId}/vote`, { selectedOptions });
    return response.data;
  },

  // Create poll (admin only)
  createPoll: async (pollData) => {
    const response = await api.post('/polls/create', pollData);
    return response.data;
  },

  // Get all polls for admin (admin only)
  getAllPollsForAdmin: async (params = {}) => {
    const response = await api.get('/polls/admin/all', { params });
    return response.data;
  },

  // Update poll status (admin only)
  updatePollStatus: async (id, status) => {
    const response = await api.put(`/polls/admin/${id}/status`, { status });
    return response.data;
  },

  // Delete poll (admin only)
  deletePoll: async (id) => {
    const response = await api.delete(`/polls/admin/${id}`);
    return response.data;
  },
};

export default api; 