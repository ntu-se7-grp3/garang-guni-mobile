import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { routes } from "../../../../constants/routes";

export default function ScheduleLayout() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      router.replace(routes.BOOKINGS);
    }, [])
  );

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Schedule" options={{ headerShown: false }} />
    </Stack>
  );
}
