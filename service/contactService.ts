import { IContact } from "@/data/interfaces/IContact"
import { AxiosError } from "axios"
import api from "./api"

/**
 * Get user emergency contacts
 * @param token - user token
 * @param userId - user ID
 * @returns list of emergency contacts
 */
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

/**
 * Add a new emergency contact
 * @param token - user token
 * @param data - contact data
 * @returns created contact
 */
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

/**
 * update a emergency contact
 * @param token - user token
 * @param dataContact - contact data
 * @returns updated contact
 */
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

/**
 * Delete an emergency contact
 * @param token - user token
 * @param id - contact ID
 * @returns void
 */
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