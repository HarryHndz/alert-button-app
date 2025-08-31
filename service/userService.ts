import type { IAlert, IAlerts } from '@/data/interfaces/IAlert';
import type { IResUser } from '@/data/interfaces/IUser';
import type { RegisterData } from '@/data/validations/validation';
import api from '@/service/api';

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
    throw error
  }
}; 


/**
 * Create a new alert
 * @param token - user token
 * @param data - alert data
 * @returns created alert
 */
export const newAlert = async (data:IAlert) => {
  try {
    const response = await api.post('alerts', {
      user_id: data.user_id,
      alert_type_id: data.alert_type_id,
      dive_type_id: data.dive_type_id,
      location_lat: data.location_lat,
      location_lng: data.location_lng,
      real_time_url:data.url
    })
    return response.data
  } catch (error) {
    throw error
  }
}


export const getAlerts = async(userId:number,signal:AbortSignal,page:number):Promise<IAlerts[]>=>{
  try {
    const response = await api.get(`alerts/user/${userId}`, { signal ,params:{page}})
    const dataAlert: IAlerts[] = response.data.map((alert:any)=>({
      location_lat: alert.location_lat,
      location_lng: alert.location_lng,
      user_id: alert.user_id,
      alert_type_id: alert.alert_type_id,
      dive_type_id: alert.dive_type_id,
      date: alert.created_at,
      key: alert.id
    }))
    return dataAlert
  } catch (error) {
    throw error
  }
}