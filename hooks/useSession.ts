import { IUser } from "@/data/interfaces/IUser"
import LocalStorage from "@/utils/storage"
import { router } from "expo-router"
import { useEffect, useState } from "react"


export const useSession = ()=>{
  const [session,setSession] = useState<IUser | null>(null)
  useEffect(()=>{
    const getSession = async()=>{
      try {
        const storage = new LocalStorage()
        const sesion = await storage.getSession()
        if (!sesion) return router.replace('/')
        setSession(sesion)
      } catch (error) {
        console.log(error)
        router.replace('/')
      }
      
    }
    getSession()
  },[])

  return {session}
}