import { IAddContact, IResUser } from '@/data/IUser';
import type { RegisterData } from '../validation/validation';
import api from './api';

export const registerUser = async (data: RegisterData): Promise<IResUser> => {
  const response = await api.post('auth/signup', data);
  console.log("Respuesta de api al crear o intentar registrarse", response)
  return response.data;
}; 


export const addContact = async (data: IAddContact) => {
  const response = await api.post('emergency-contacts', data)
  console.log("Response to api for make a new contact")
  return response.data
}