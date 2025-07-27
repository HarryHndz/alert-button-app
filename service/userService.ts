import { IAddContact, IResUser } from '@/data/IUser';
import type { RegisterData } from '../validation/validation';
import api from './api';
import LocalStorage from './localStorage';

export const registerUser = async (data: RegisterData): Promise<IResUser> => {
  const response = await api.post('auth/signup', data);
  console.log("Respuesta de api al crear o intentar registrarse", response)
  return response.data;
}; 


export const addContact = async (data: IAddContact) => {
  const storage = new LocalStorage()
  const user = await storage.getSession()
  console.log('Data user', user)
  const response = await api.post('emergency-contacts',
    {
      headers: {
        Authorization:`Bearer ${user?.token}`
      },
      user_id: user?.id,
      ...data,
            
    }
  )
  console.log("Response to api for make a new contact", response)
  return response.data
}
