import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Cuenta' }} />
      <Stack.Screen name="password" options={{ title: 'Cambiar contraseña' }} />
      <Stack.Screen name="alerts" options={{ title: 'Alertas' }} />
    </Stack>
  );
}