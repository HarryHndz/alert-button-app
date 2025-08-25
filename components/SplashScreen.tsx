import { AuthContext } from "@/context/AuthContext"
import { SplashScreen } from "expo-router"
import { PropsWithChildren, use, useEffect } from "react"


SplashScreen.preventAutoHideAsync()

export const SplashScreenController = ({children}:PropsWithChildren)=>{
  const {isLoading} = use(AuthContext)
  useEffect(()=>{
    console.log("SplashScreenController: isLoading", isLoading)
    if (isLoading)return
    console.log("Hiding Splash Screen")
    SplashScreen.hideAsync()
  },[isLoading])

  return <>{children}</>
}