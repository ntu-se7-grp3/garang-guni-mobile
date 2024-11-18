import { Stack } from "expo-router";
import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { StatusBar } from "expo-status-bar";
import { theme } from "../constants/theme";

const RootLayout = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor={theme.colors.primary} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
