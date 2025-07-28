import LocalStorage from "@/utils/storage"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { Platform } from "react-native"

export const useVerifySession = ()=>{
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=>{
    const verifySession = async()=>{
      try {
        console.log('🔍 Iniciando verificación de sesión...')
        console.log('🌐 Plataforma:', Platform.OS)
        
        // En web, agregar un pequeño delay para asegurar que AsyncStorage esté listo
        if (Platform.OS === 'web') {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
        
        const storage = new LocalStorage()
        console.log('📦 Storage inicializado')
        
        const session = await storage.getSession()
        console.log('🔑 Sesión obtenida:', session)
        
        if (!session) {
          console.log('❌ No hay sesión, redirigiendo a login...')
          setIsLoading(false)
          return router.replace('/login')
        }
        
        console.log('✅ Sesión válida encontrada')
        setIsLoading(false)
        
      } catch (error) {
        console.error('💥 Error en verifySession:', error)
        setIsLoading(false)
        // En caso de error, también redirigir a login
        router.replace('/login')
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
            console.log(`🔄 Intento ${i + 1} falló, reintentando...`)
            if (i < 2) {
              await new Promise(resolve => setTimeout(resolve, 500))
            } else {
              console.error('❌ Todos los intentos fallaron')
              setIsLoading(false)
              router.replace('/login')
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