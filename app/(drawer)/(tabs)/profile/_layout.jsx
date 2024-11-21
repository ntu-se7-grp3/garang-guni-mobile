import { router, Stack, useFocusEffect } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" options={{ headerShown: false }} />
    </Stack>
  );
}
