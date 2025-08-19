import { IAlert } from '@/data/interfaces/IAlert';
import { IContact } from '@/data/interfaces/IContact';
import { IResUser } from '@/data/interfaces/IUser';
import type { RegisterData } from '@/data/validations/validation';
import api from '@/service/api';
import { AxiosError } from 'axios';

export const registerUser = async (data: RegisterData): Promise<IResUser> => {
  const response = await api.post('auth/signup', data);
  console.log("Respuesta de api al crear o intentar registrarse", response)
  return response.data;
}; 


export const addContact = async (token:string,data: IContact):Promise<IContact> => {
  try {
    const response = await api.post('emergency-contacts',
      {
        name:data.name,
        user_id:data.userId,
        last_name:data.lastName,
        phone_number:data.phone,
        relationship:data.relationship,
        active:true,
        contact_id:null
              
      },
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
    const contact = response.data
    const responseContact:IContact = {
      id:parseInt(contact.id),
      name:contact.name,
      lastName:contact.last_name,
      phone:contact.phone_number,
      relationship:contact.relationship,
      active:contact.active,
      userId:parseInt(contact.user_id),
    }
    return responseContact
  } catch (error) {
    if(error instanceof AxiosError){
      console.log(error.response?.data)
      throw error.response?.data.message ?? 'Error al crear el contacto'
    }
    throw 'Error al crear el contacto'
  }
  
}

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