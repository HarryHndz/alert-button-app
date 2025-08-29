import { AuthContext } from "@/context/AuthContext"
import { SplashScreen } from "expo-router"
import { PropsWithChildren, use, useEffect } from "react"


SplashScreen.preventAutoHideAsync()

export const SplashScreenController = ({children}:PropsWithChildren)=>{
  const {isLoading} = use(AuthContext)
  useEffect(()=>{
    if (isLoading)return
    SplashScreen.hideAsync()
  },[isLoading])

  return <>{children}</>
}