import { errorCodeHandle, errorInternalHandle } from '@/utils/errorHandle';
import LocalStorage from '@/utils/storage';
import axios from 'axios';

/**
 * Axios instance for API calls
 */
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_URL_SERVER ?? '',
  headers: {
    'Content-Type': 'application/json',
  },
});

const ENDPOINTS_PUBLIC = [
  '/auth/login',
  '/auth/signup'
]

api.interceptors.request.use(
  async (config) => {
    const store = new LocalStorage()
    const session = await store.getSession()
    const token = session?.token ?? ''
    if (token && !ENDPOINTS_PUBLIC.includes(config.url ?? '')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return Promise.reject(errorCodeHandle(error.response.status.toString()))
    }
    return Promise.reject(errorInternalHandle(error.code));
  }
);

export default api;