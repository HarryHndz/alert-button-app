import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { useVerifySession } from '@/hooks/useVerifySession';
import LocalStorage from '@/service/localStorage';
import { router } from 'expo-router';
import { ActivityIndicator, Platform, Pressable, Text } from 'react-native';

export default function HomeScreen() {
  const {isLoading} = useVerifySession()

  const handleLogout = async()=>{
    try {
      const storage = new LocalStorage()
      await storage.removeSession()
      return router.replace('/login')
    } catch (error) {
      console.log('error',error)
    }
  }
  if (isLoading) {
    return(
      <Box className='flex-1 items-center justify-center'>
        <ActivityIndicator size='large' color='white' />
      </Box>
    )
  }

  return (
    <Box className="flex-1 bg-neutral-900 w-full h-full justify-center items-center">
      <Box className="flex-1 w-full flex flex-col justify-center items-center">
        <Text className="text-white font-bold text-3xl md:text-6xl text-center mt-8">Botón de Emergencia</Text>
        <Text className="text-neutral-400 text-base md:text-lg text-center mt-2 mb-8 max-w-xl">
          En caso de emergencia, presiona el botón para enviar tu ubicación a todos tus contactos de emergencia.
        </Text>
        <Box className="flex flex-col items-center justify-center my-4">
          <Pressable
            style={{
              width: Platform.OS === 'web' ? 300 : 220,
              height: Platform.OS === 'web' ? 300 : 220,
              borderRadius: 150,
              backgroundColor: '#dc6b6b',
              borderWidth: 8,
              borderColor: '#a94444',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 16,
              elevation: 12,
            }}
            onPress={() => {}}>
            <Text className="text-white text-2xl md:text-3xl font-semibold">Presionar</Text>
          </Pressable>
        </Box>
        <Text className="text-neutral-400 text-center mt-8 mb-2">
          2 contactos guardados
        </Text>
        <Text className="text-neutral-600 text-center text-xs">
          Ubicación: 17.457834, -92.453267
        </Text>
        <Button onPress={handleLogout} className='bg-red-500'>
          <ButtonText>Cerrar sesión</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
