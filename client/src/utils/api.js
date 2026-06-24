import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' }
});

// Attach the admin JWT (if present) to every request automatically.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('aome_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
