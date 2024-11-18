import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
