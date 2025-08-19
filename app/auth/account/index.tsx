import { ActionAccount } from "@/components/Account/ActionAccount";
import { ItemDetail } from "@/components/Account/ItemDetail";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { useSession } from "@/hooks/useSession";
import LocalStorage from "@/utils/storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Lock, LogOut } from 'lucide-react-native';
import { Text } from "react-native";
export default function DetailScreen() {
  const {session} = useSession()
  if (!session) return null
  
  const handleLogout = async()=>{
    try {
      const storage = new LocalStorage()
      if(!session) return
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
          source={require('@/assets/images/profile.png')}
          style={{width:'100%',height:'100%'}} 
          contentFit="contain"
        />
      </Box>
      <Box className="w-3/5">
        <Text className="text-2xl font-bold text-white">Bienvenido</Text>
        <Text className="text-sm text-white">{session.name}</Text>
      </Box>
     </Box>
    <ItemDetail label="Nombre" value={`${session.name} ${session.lastName}`} />
     <ItemDetail label="Correo" value={session.email} />
     <ItemDetail label="Telefono" value={session.phone ?? 'Sin telefono'} />
     <Divider className="my-5 bg-white w-5/6" orientation="horizontal" />
     <Box className="flex-column gap-7 mt-5 w-full px-10">
        <ActionAccount
          handleAction={handleLogout}
          icon={<LogOut size={25} color='white' />}
          label="Cerrar sesión"
        />
        <ActionAccount
          handleAction={() => router.navigate('/auth/account/password')}
          icon={<Lock size={25} color='white' />}
          label="Cambiar contraseña"
        />
     </Box>
    </Box>
  )
}