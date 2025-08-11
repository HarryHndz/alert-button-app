import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { useSesion } from "@/hooks/useSession";
import LocalStorage from "@/utils/storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ChevronRight, Lock, LogOut } from 'lucide-react-native';
import { Pressable, Text } from "react-native";
export default function DetailScreen() {
  const {session} = useSesion()
  if (!session) return null
  
  const handleLogout = async()=>{
    try {
      const storage = new LocalStorage()
      if(!session) return
      //await logoutService(session.token)
      console.log('remove session')
      await storage.removeSession()
      return router.replace('/')
    } catch (error) {
      console.log('error',error)
    }
  }

  return (
    <Box className="flex-1 w-full bg-neutral-900 items-center pt-10">
     <Box className="flex-row w-full items-center mb-10">
      <Box className="w-2/5 h-24">
        <Image 
          source={require('@/assets/images/react-logo.png')}
          style={{width:'100%',height:'100%'}} 
          contentFit="contain"
        />
      </Box>
      <Box className="w-3/5">
        <Text className="text-2xl font-bold text-white">Bienvenido</Text>
        <Text className="text-sm text-white">{session.name}</Text>
      </Box>
     
     </Box>
     <Box className="flex-row w-full items-center gap-2 justify-between px-10 py-2">
      <Text className="text-lg font-bold text-white">Nombre</Text>
      <Text className="text-base text-white">{session.name} {session.lastName}</Text>
     </Box>
     <Box className="flex-row w-full items-center gap-2 justify-between px-10 py-2">
      <Text className="text-lg font-bold text-white">Correo</Text>
      <Text className="text-base text-white">{session.email}</Text>
     </Box>
     <Box className="flex-row w-full items-center gap-2 justify-between px-10 py-2">
      <Text className="text-lg font-bold text-white">Telefono</Text>
      <Text className="text-base text-white">{session.phone}</Text>
     </Box>
     <Divider className="my-5 bg-white w-5/6" orientation="horizontal" />
     <Box className="flex-column gap-7 mt-5 w-full px-10">
        <Pressable 
          onPress={handleLogout} 
          className="flex-row items-center justify-between gap-2 bg-black rounded-lg px-4 py-5">
          <Box className="flex-row items-center gap-3">
            <LogOut size={25} color='white' />
            <Text className="text-lg font-bold text-white">Cerrar sesión</Text>
          </Box>
          <ChevronRight size={25} color='white' />
        </Pressable>
        <Pressable 
          onPress={() => router.navigate('/auth/account/password')}
          className="flex-row items-center justify-between gap-2 bg-black rounded-lg px-4 py-5">
          <Box className="flex-row items-center gap-3">
            <Lock size={25} color='white' />
            <Text className="text-lg font-bold text-white">Cambiar contraseña</Text>
          </Box>
          <ChevronRight size={25} color='white' />
        </Pressable>
     </Box>

    </Box>
  )
}