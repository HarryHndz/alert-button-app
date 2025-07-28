import { IAddContact, INewAlert, IResUser } from '@/data/IUser';
import api from '@/service/api';
import LocalStorage from '@/utils/storage';
import type { RegisterData } from '@/validation/validation';

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
      user_id: Number(user?.id),
      ...data,
      contact_id: null
            
    }
  )
  console.log("Response to api for make a new contact", response)
  return response.data
}

export const newAlert = async (data: INewAlert) => {
  const storage = new LocalStorage()
  const user = await storage.getSession()
  const response = await api.post('alerts', {
    user_id: Number(user?.id),
    ...data
  })
  return response.data
}