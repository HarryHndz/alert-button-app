import type { RegisterData } from '../validation/validation';
import api from './api';

export const registerUser = async (data: RegisterData) => {
  const response = await api.post('users', data);
  console.log("Respuesta de api al crear o intentar registrarse", response)
  return response.data;
}; 