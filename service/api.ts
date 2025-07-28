import axios from 'axios';

const api = axios.create({
  baseURL: 'https://2pwfb4tn-3000.usw3.devtunnels.ms/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    // Aquí puedes agregar un token si lo necesitas
    // const token = await AsyncStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo global de errores
    return Promise.reject(error);
  }
);

export default api;