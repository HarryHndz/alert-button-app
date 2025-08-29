import { IUser } from "@/data/interfaces/IUser";
import { verifySessionActivate } from "@/service/authService";
import LocalStorage from "@/utils/storage";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const login = useCallback(async(data:IUser)=>{
    try {
      const storage = new LocalStorage()
      await storage.setSession(data)
      setUser(data)
    } catch (error) {
      console.log("Error logging in:",error)
    }
    
  },[])

  const logout = useCallback(async()=>{
    try {
      const storage = new LocalStorage()
      await storage.removeSession()
      setUser(null)
    } catch (error) {
      console.log("Error logging out:",error)
    }
  },[])

  useEffect(()=>{
    const verifySession = async()=>{
      try {
        console.log("Checking stored session...")
        const storage = new LocalStorage()
        const sessionStore = await storage.getSession()
        if (!sessionStore)return setIsLoading(false)
        const verify = await verifySessionActivate()
        if (!verify){
          console.log("Session invalid, removing...")
          await storage.removeSession()
          return setIsLoading(false)
        }
        console.log("session valida")
        setUser(sessionStore)
        setIsLoading(false)
        
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
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