import { ILogin } from "@/data/interfaces/ILogin";
import { IUser } from "@/data/interfaces/IUser";
import api from "./api";


/**
 * Login service
 * @param dataAuth - login credentials
 * @returns user - IUser
 */
export const loginService = async(dataAuth:ILogin):Promise<IUser>=>{
  try {
    const response = await api.post('/auth/login',{
      email:dataAuth.email,
      password:dataAuth.password
    })
    const data = response.data
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
    throw error
  }
}

/**
 * Logout service
 * @param token - user token
 * @returns void
 */
export const logoutService = async():Promise<void>=>{
  try {
    await api.post('/auth/logout',{})
  } catch (error) {
    throw error
  }
}

/**
 * Change password service
 * @param currentPassword - current user password
 * @param newPassword - new user password
 * @param token - user token
 */
export const changePasswordService = async(currentPassword:string,newPassword:string):Promise<void>=>{
  try {
    await api.post('/auth/change-password',{
      newPassword:newPassword,
      currentPassword:currentPassword
    })
    
  } catch (error) {
    throw error
  }
}

/**
 * Verify user session
 * @param token - user token
 * @returns user profile data
 */
export const verifySessionActivate =async():Promise<any>=>{
  try {
    const response = await api.get('/auth/profile')
    const data = response.data
    return data
  } catch (error) {
    throw error
  }
}


/**
 * Refresh user session
 * @param token - user token
 * @returns new access token
 */
export const refreshSession =async():Promise<string>=>{
  try {
    const response = await api.post('/auth/refresh')
    console.log('response',response.data)
    const data = response.data
    return data.access_token
  } catch (error) {
    throw error
  }
}