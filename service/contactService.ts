import { IContact } from "@/data/IContact"
import { AxiosError } from "axios"
import api from "./api"


export const getContacts = async(token:string,userId:number):Promise<IContact[]>=>{
  try {
    const response = await api.get(`/emergency-contacts/user/${userId}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    const data = response.data
    
    const responseData:IContact[] = data.map((contact:any)=>({
      id:contact.id,
      name:contact.name,
      lastName:contact.last_name,
      phone:contact.phone_number,
      relationship:contact.relationship,
      userId:contact.user_id,
      active:contact.active
    }))
    return responseData
  } catch (error) {
    if(error instanceof AxiosError){
      console.log(error.response?.data)
      throw error.response?.data.message ?? 'Error al obtener los contactos'
    }
    throw 'Error al obtener los contactos'
  }
}