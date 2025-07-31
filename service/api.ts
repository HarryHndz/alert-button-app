import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.72:3000/',
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