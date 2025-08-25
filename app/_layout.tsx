import { SplashScreenController } from '@/components/SplashScreen';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AuthContext } from '@/context/AuthContext';
import { AuthProvider } from '@/context/AuthProvider';
import { ContactProvider } from '@/context/ContactProvider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { use } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';
import 'react-native-reanimated';
import "../global.css";



export default function RootLayout() {
  const colorScheme = useNativeColorScheme() ?? 'light'; // Asegura que nunca sea null
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GluestackUIProvider mode={colorScheme}>
        <AuthProvider>
          <SplashScreenController>
            <RootNavigator />
          </SplashScreenController>
        </AuthProvider>
      </GluestackUIProvider>
    </ThemeProvider>
  );
}

function RootNavigator(){
  const {user} = use(AuthContext)
  console.log("User in RootNavigator:", user)
  return(
    <ContactProvider>
       <Stack>
        <Stack.Protected guard={user ? true : false}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="account" options={{ headerShown: false }} />
          <Stack.Screen name="addcontact" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="login" options={{ title: 'Iniciar sesión' }} />
          <Stack.Screen name="register" options={{ title: 'Registrate' }} />
        </Stack.Protected>
      </Stack>
    </ContactProvider>
   
  )
}