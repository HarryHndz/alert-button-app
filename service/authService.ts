import { ILogin } from "@/data/ILogin";
import { AxiosError } from "axios";
import api from "./api";


export const loginService = async(dataAuth:ILogin)=>{
  try {
    const response = await api.post('/auth/login',{
      email:dataAuth.email,
      password:dataAuth.password
    })
    return response.data.data
  } catch (error) {
    if(error instanceof AxiosError){
      console.log(error.response?.data)
      throw error.response?.data.message
    }
    throw 'Error al iniciar sesión'
  }
}