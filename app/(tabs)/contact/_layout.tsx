import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function ContactLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        headerStyle: { backgroundColor: '#18181b' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' },
        contentStyle: { backgroundColor: '#18181b' }
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Contactos',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="addContact" 
        options={{ 
          title: 'Crear contacto',
          headerShown: true,
          // En web, ocultar la navegación de tabs cuando esté en addContact
          ...(Platform.OS === 'web' && { 
            headerStyle: { backgroundColor: '#18181b' },
            headerTintColor: '#fff'
          })
        }} 
      />
    </Stack>
  );
} 