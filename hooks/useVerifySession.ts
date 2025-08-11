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
          console.log('❌ No hay sesión')
          return setIsLoading(false)
        }
        
        console.log('✅ Sesión válida encontrada, redirigiendo a home...')
        setIsLoading(false)
        router.replace('/auth/(tabs)')
      } catch (error) {
        console.error('💥 Error en verifySession:', error)
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
            console.log(`🔄 Intento ${i + 1} falló, reintentando...`)
            if (i < 2) {
              await new Promise(resolve => setTimeout(resolve, 500))
            } else {
              console.error('❌ Todos los intentos fallaron')
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