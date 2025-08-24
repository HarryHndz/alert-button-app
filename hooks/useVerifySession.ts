import { IUser } from "@/data/interfaces/IUser"
import { refreshSession } from "@/service/authService"
import LocalStorage from "@/utils/storage"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { Platform } from "react-native"


/**
 * Custom hook to verify user session in LocalStorage to initialize app state
 * @returns boolean - loading state
 */

export const useVerifySession = ()=>{
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const verifySession = async()=>{
      try {
        if (Platform.OS === 'web') {
          await new Promise(resolve => setTimeout(resolve, 300))
        }
        const storage = new LocalStorage()
        const session = await storage.getSession()
        
        if (!session) {
          await storage.removeSession()
          return setIsLoading(false)
        }

        if (!session.dateEndLogin) {
          await storage.removeSession()
          return setIsLoading(false)
        }

        if(new Date() > new Date(session.dateEndLogin)){
          const newToken = await refreshSession(session.token)
          if (!newToken) {
            await storage.removeSession()
            return setIsLoading(false)
          }
          const dateLogin = new Date()
            const newSession:IUser = {
              ...session,
              token:newToken,
              dateLogin:dateLogin,
              dateEndLogin:new Date(dateLogin.getTime() + 23 * 60 * 60 * 1000)
            }
            await storage.setSession(newSession)
        }
        setIsLoading(false)
        router.replace('/auth/(tabs)')
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    
    // Agregar retry logic para web
    const initSession = async () => {
      if (Platform.OS === 'web') {
        // En web, intentar hasta 3 veces con delay
        for (let i = 0; i < 3; i++) {
          try {
            await verifySession()
            break
          } catch (error) {
            console.log(error)
            if (i < 2) {
              await new Promise(resolve => setTimeout(resolve, 500))
            } else {
              setIsLoading(false)
            }
          }
        }
      } else {
        await verifySession()
      }
    }
    
    initSession()
  },[])
  return {isLoading}
}