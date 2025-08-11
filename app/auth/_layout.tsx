import { Stack } from "expo-router";


export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="account" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="addcontact" options={{ headerShown: false }} />
    </Stack>
  )
}
