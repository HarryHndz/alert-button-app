import LocalStorage from "@/service/localStorage"
import { router } from "expo-router"
import { useEffect, useState } from "react"

export const useVerifySession = ()=>{
  const [isLoading,setIsLoading] = useState(true)
  useEffect(()=>{
    const verifySession = async()=>{
      try {
        setIsLoading(true)
        const storage = new LocalStorage()
        const session = await storage.getSession()
        if (!session) {
          console.log('no session')
          return router.replace('/login')
        }
        console.log('session')
      } catch (error) {
        console.log('error',error)
      } finally {
        setIsLoading(false)
      }
    }
    verifySession()
  },[])
  return {isLoading}
}