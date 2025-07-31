import { IUser } from "@/data/IUser"
import LocalStorage from "@/utils/storage"
import { router } from "expo-router"
import { useEffect, useState } from "react"


export const useSesion = ()=>{
  const [session,setSession] = useState<IUser | null>(null)
  useEffect(()=>{
    const getSession = async()=>{
      try {
        const storage = new LocalStorage()
        const sesion = await storage.getSession()
        if (!sesion) return router.replace('/login')
        setSession(sesion)
      } catch (error) {
        console.log(error)
        router.replace('/login')
      }
      
    }
    getSession()
  },[])

  return {session}
}