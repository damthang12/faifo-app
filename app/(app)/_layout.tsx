import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FaifoCamera" />
      <Stack.Screen name="FavoritesScreen" />
      <Stack.Screen name="chatbot" />
      <Stack.Screen name="currency" />
      <Stack.Screen name="history" />
      <Stack.Screen name="invite" />
      <Stack.Screen name="language" />
      <Stack.Screen name="map" />
      <Stack.Screen name="profileDetail" />
      <Stack.Screen name="search" />
    </Stack>
  );
}
