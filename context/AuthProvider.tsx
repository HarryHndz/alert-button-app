import { IUser } from "@/data/interfaces/IUser";
import { verifySessionActivate } from "@/service/authService";
import LocalStorage from "@/utils/storage";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";
import { AuthContext } from "./AuthContext";

const IS_WEB = Platform.OS === 'web'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const login = useCallback(async(data:IUser)=>{
    try {
      if (IS_WEB) {
        localStorage.setItem('session',JSON.stringify(data))
      }else{
        const storage = new LocalStorage()
        await storage.setSession(data)
      }
      setUser(data)
    } catch (error) {
      console.log("Error logging in:",error)
    }
    
  },[])

  const logout = useCallback(async()=>{
    try {
      if (IS_WEB) {
      localStorage.removeItem('session')
      }else{
        const storage = new LocalStorage()
        await storage.removeSession()
      }
      setUser(null)
    } catch (error) {
      console.log("Error logging out:",error)
    }
  },[])

  useEffect(()=>{
    const verifySession = async()=>{
      try {
        let sessionStore: IUser | null = null
        console.log("Checking stored session...")
        if (IS_WEB) {
          console.log("Web platform detected")
          if (typeof localStorage === 'undefined')return setIsLoading(false)
          const storageWeb = localStorage.getItem('session')
          if (!storageWeb) return setIsLoading(false)
          sessionStore = JSON.parse(storageWeb) as IUser
          const verify = await verifySessionActivate(sessionStore.token)
          if (!verify) {
            localStorage.removeItem('session')
            return setIsLoading(false)
          }
          setUser(sessionStore)
          setIsLoading(false)
        }else{
          console.log("Mobile platform detected")
          const storageMobile = new LocalStorage()
          sessionStore = await storageMobile.getSession()
          if (!sessionStore)return setIsLoading(false)
          console.log("Mobile session found:", sessionStore)
          const verify = await verifySessionActivate(sessionStore.token)
          console.log("Session verification result:", verify)
          if (!verify){
            console.log("Session invalid, removing...")
            await storageMobile.removeSession()
            return setIsLoading(false)
          }
          console.log("session valida")
          setUser(sessionStore)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    console.log("Verifying session...")
    verifySession()
  },[])

  const values = useMemo(() => ({
    user,
    isLoading,
    login,
    logout
  }), [user, isLoading, login, logout])

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};