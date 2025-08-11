import { IContact } from "@/data/interfaces/IContact"
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
      id:parseInt(contact.id),
      name:contact.name,
      lastName:contact.last_name,
      phone:contact.phone_number,
      relationship:contact.relationship,
      userId:parseInt(contact.user_id),
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

export const updateContact = async(token:string,dataContact:IContact):Promise<IContact>=>{
  try {
    const response = await api.patch(`/emergency-contacts/${dataContact.id}`,{
      name:dataContact.name,
      user_id:dataContact.userId,
      last_name:dataContact.lastName,
      phone_number:dataContact.phone,
      relationship:dataContact.relationship,
      active:dataContact.active,
      contact_id:null
    },{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    const data = response.data
    const contact:IContact = {
      id:parseInt(data.id),
      name:data.name,
      lastName:data.last_name,
      phone:data.phone_number,
      relationship:data.relationship,
      active:data.active,
      userId:parseInt(data.user_id)
    }
    return contact
  } catch (error) {
    if(error instanceof AxiosError){
      console.log(error.response?.data)
      throw error.response?.data.message ?? 'Error al actualizar el contacto'
    }
    throw 'Error al actualizar el contacto'
  }
}

export const deleteContact = async(token:string,id:number):Promise<void>=>{
  try {
    await api.delete(`/emergency-contacts/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  } catch (error) {
    if(error instanceof AxiosError){
      console.log(error.response?.data)
      throw error.response?.data.message ?? 'Error al eliminar el contacto'
    }
    throw 'Error al eliminar el contacto'
  }
}