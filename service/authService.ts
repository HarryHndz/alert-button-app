import { ILogin } from "@/data/interfaces/ILogin";
import { IUser } from "@/data/interfaces/IUser";
import { AxiosError } from "axios";
import api from "./api";


export const loginService = async(dataAuth:ILogin):Promise<IUser>=>{
  try {
    const response = await api.post('/auth/login',{
      email:dataAuth.email,
      password:dataAuth.password
    })
    const data = response.data
    console.log('data',response.data)
    const dateLogin = new Date()
    const responseData:IUser ={
      id:data.user.id,
      token:data.access_token,
      name:data.user.name,
      email:data.user.email,
      active:data.user.active,
      username:data.supabase_user,
      lastName:data.user.last_name,
      phone:data.user.phone_number,
      dateLogin:dateLogin ,
      dateEndLogin:new Date(dateLogin.getTime() + 23 * 60 * 60 * 1000)
    } 
    return responseData
  } catch (error) {
    if(error instanceof AxiosError){
      console.log(error.response?.data)
      throw error.response?.data.message ?? 'Error al iniciar sesión'
    }
    throw 'Error al iniciar sesión'
  }
}

export const logoutService = async(token:string):Promise<void>=>{
  try {
    await api.post('/auth/logout',{},{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    if(error instanceof AxiosError){
      console.log(error.response?.data)
      throw error.response?.data.message ?? 'Error al cerrar sesión'
    }
    throw 'Error al cerrar sesión'
  }
}

export const changePasswordService = async(currentPassword:string,newPassword:string,token:string):Promise<void>=>{
  try {
    await api.post('/auth/change-password',{
      newPassword:newPassword,
      currentPassword:currentPassword
    },{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    
  } catch (error) {
    if(error instanceof AxiosError){
      console.log(error.response?.data)
      throw error.response?.data.message ?? 'Error al cambiar contraseña'
    }
    throw 'Error al cambiar contraseña'
  }
}

export const verifySessionActivate =async(token:string):Promise<any>=>{
  try {
    const response = await api.get('/auth/profile',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    console.log('response',response.data)
    const data = response.data
    return data
  } catch (error) {
    if(error instanceof AxiosError){
      console.log(error.response?.data)
      throw error.response?.data.message ?? 'Error al verificar sesión'
    }
    throw 'Error al verificar sesión'
  }
}

export const refreshSession =async(token:string):Promise<string>=>{
  try {
    const response = await api.post('/auth/refresh',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    console.log('response',response.data)
    const data = response.data
    return data.access_token
  } catch (error) {
    if(error instanceof AxiosError){
      console.log(error.response?.data)
      throw error.response?.data.message ?? 'Error al verificar sesión'
    }
    throw 'Error al verificar sesión'
  }
}