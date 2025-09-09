import { Stack } from "expo-router";

export default function NotiLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Error" />
      <Stack.Screen name="MaintenanceScreen" />
      <Stack.Screen name="NoSupport" />
      <Stack.Screen name="NoSupport1" />
    </Stack>
  );
}
