import type { IAlert } from '@/data/interfaces/IAlert';
import type { IResUser } from '@/data/interfaces/IUser';
import type { RegisterData } from '@/data/validations/validation';
import api from '@/service/api';
import { AxiosError } from 'axios';

/**
 * Register a new user
 * @param data - user registration data
 * @returns created user
 */
export const registerUser = async (data: RegisterData): Promise<IResUser> => {
  try {
    const response = await api.post('auth/signup', data)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw error.response?.data.message ?? 'Error al registrar el usuario'
    }
    throw 'Error al registrar el usuario'
  }
}; 


/**
 * Create a new alert
 * @param token - user token
 * @param data - alert data
 * @returns created alert
 */
export const newAlert = async (token:string,data:IAlert) => {
  try {
    const response = await api.post('alerts', {
      user_id: data.user_id,
      alert_type_id: data.alert_type_id,
      dive_type_id: data.dive_type_id,
      location_lat: data.location_lat,
      location_lng: data.location_lng,
      real_time_url:data.url
    },{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    if(error instanceof AxiosError){
      console.log(error.response?.data)
      throw error.response?.data.message ?? 'Error al crear la alerta'
    }
    throw 'Error al crear la alerta'
  }
}