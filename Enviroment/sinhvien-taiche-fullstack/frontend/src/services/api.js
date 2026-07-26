import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ======================
// Auth API
// ======================
export const authAPI = {
  login: (data) => apiClient.post('/auth/login', data),
  register: (data) => apiClient.post('/auth/register', data),
  getProfile: () => apiClient.get('/auth/profile'),
  updateProfile: (data) => apiClient.put('/auth/profile', data),
};

// ======================
// Schedules API
// ======================
export const scheduleAPI = {
  create: (data) => apiClient.post('/schedules', data),
  getAll: (params) => apiClient.get('/schedules', { params }),
  getById: (id) => apiClient.get(`/schedules/${id}`),
  updateStatus: (id, status) => apiClient.patch(`/schedules/${id}/status`, { status }),
  delete: (id) => apiClient.delete(`/schedules/${id}`),
};

// ======================
// Articles API
// ======================
export const articleAPI = {
  getAll: (params) => apiClient.get('/articles', { params }),
  getBySlug: (slug) => apiClient.get(`/articles/${slug}`),
  create: (data) => apiClient.post('/articles', data),
  update: (id, data) => apiClient.put(`/articles/${id}`, data),
  delete: (id) => apiClient.delete(`/articles/${id}`),
};

// ======================
// Team API
// ======================
export const teamAPI = {
  getAll: () => apiClient.get('/team'),
};

// ======================
// Partners API
// ======================
export const partnerAPI = {
  create: (data) => apiClient.post('/partners', data),
  getAll: (params) => apiClient.get('/partners', { params }),
};

// ======================
// Vouchers API
// ======================
export const voucherAPI = {
  getAll: () => apiClient.get('/vouchers'),
  redeem: (data) => apiClient.post('/vouchers/redeem', data),
  getUserVouchers: (userId) => apiClient.get(`/vouchers/user/${userId}`),
};

export default apiClient;

