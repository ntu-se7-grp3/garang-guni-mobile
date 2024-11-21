import { Stack } from "expo-router";

export default function ScheduleLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Schedule" options={{ headerShown: false }} />
    </Stack>
  );
}
