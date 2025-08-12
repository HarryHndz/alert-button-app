import { HapticTab } from '@/components/HapticTab';
import { HeaderMenu } from '@/components/HeaderMenu';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Image } from 'expo-image';
import { Link, Slot, Tabs, usePathname } from 'expo-router';
import { House, MapPin, Phone } from 'lucide-react-native';
import { Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isWeb = Platform.OS === 'web';
  const pathname = usePathname();
  const isAddContact = pathname.includes('addcontact');


  if (isWeb) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#18181b' }}>
        {/* Header web - solo mostrar si NO está en addContact */}
        {!isAddContact && (
          <View className="w-full flex flex-row items-center justify-between px-8 py-4 bg-neutral-900">
            <View className="flex flex-row items-center gap-4">
              <Image source={{uri: 'https://ui-avatars.com/api/?name=App'}} style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#fff' }} />
              <Text className="text-white text-lg font-bold">Nombre de la App</Text>
            </View>
            <View className="flex flex-row gap-8">
              <Link href="/auth/(tabs)" asChild>
                <Text className={`text-white text-base font-medium ${pathname === '/(tabs)' || pathname === '/(tabs)/index' ? 'underline underline-offset-8 decoration-2 decoration-red-500' : 'text-white/60'}`}>Botón</Text>
              </Link>
              <Link href="/auth/(tabs)/contact" asChild>
                <Text className={`text-white text-base font-medium ${pathname === '/(tabs)/contact' ? 'underline underline-offset-8 decoration-2 decoration-red-500' : 'text-white/60'}`}>Contactos</Text>
              </Link>
              <Link href="/auth/(tabs)/map" asChild>
                <Text className={`text-white text-base font-medium ${pathname === '/(tabs)/map' ? 'underline underline-offset-8 decoration-2 decoration-red-500' : 'text-white/60'}`}>Mapa</Text>
              </Link>
            </View>
            <HeaderMenu />
            
          </View>
        )}
        {/* Contenido de la pestaña activa */}
        <Slot />
      </SafeAreaView>
    );
  }

  // Móvil: tabs abajo
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          // Eliminar position absolute para evitar conflictos con Stack
          tabBarStyle: {
            backgroundColor: 'transparent'
          }
          
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color,focused }) => <House size={28} color={ focused ? color : 'gray'} />, 
            headerShown:true,
            header:(e)=><HeaderMenu />
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: 'Map',
            tabBarIcon: ({ color,focused }) => <MapPin size={28} color={ focused ? color : 'gray'} />, 
            headerShown:true,
            header:(e)=><HeaderMenu />
          }}
        />
        <Tabs.Screen
          name="contact"
          options={{
            title: 'Contact',
            headerShown: true,
            tabBarIcon: ({ color,focused }) => <Phone size={28} color={ focused ? color : 'gray'} />, 
            header:(e)=><HeaderMenu />
          }}
        />
      </Tabs>
    </View>
  );
}
