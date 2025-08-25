import { IUser } from "@/data/interfaces/IUser"
import LocalStorage from "@/utils/storage"
// import { router } from "expo-router"
import { verifySessionActivate } from "@/service/authService"
import { useEffect, useState } from "react"
import { Platform } from "react-native"

/**
 * Custom hook to verify user session in LocalStorage to initialize app state
 * @returns boolean - loading state
 */

export const useVerifySession = ()=>{
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<IUser | null>(null)
  useEffect(()=>{
    const verifySession = async()=>{
      try {
        if (Platform.OS === 'web') {
          await new Promise(resolve => setTimeout(resolve, 300))
        }
        const storage = new LocalStorage()
        const sessionStore = await storage.getSession()

        if (!sessionStore)return setIsLoading(false)

        const verify = await verifySessionActivate(sessionStore.token)
        if (!verify){
          await storage.removeSession()
          return setIsLoading(false)
        }
        setSession(sessionStore)
        setIsLoading(false)
        // router.replace('/auth/(tabs)')
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
  return {isLoading,session}
}