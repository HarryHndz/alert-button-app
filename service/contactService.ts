import { AxiosError } from "axios"
import api from "./api"


export const getContacts = async(token:string)=>{
  try {
    const response = await api.get('/emergency-contacts',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    console.log(response.data.data)
    return response.data.data
    
  } catch (error) {
    if(error instanceof AxiosError){
      console.log(error.response?.data)
      throw error.response?.data.message
    }
    throw 'Error al obtener los contactos'
  }
}