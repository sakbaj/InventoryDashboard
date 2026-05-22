import axios from 'axios';

// Enterprise-ready Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // e.g., attach auth token
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling (e.g., logout on 401, show toast on 500)
    if (error.response?.status === 401) {
      console.warn('Unauthorized access - redirecting to login');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
