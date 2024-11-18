import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { theme } from "../constants/theme";
import { routes } from "../constants/routes";

const HomeButton = ({ size = 24, router }) => {
  return (
    <Pressable onPress={() => router.push(routes.HOME)} style={styles.button}>
      <Ionicons name="home" size={size} color={theme.colors.text} />
    </Pressable>
  );
};

export default HomeButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primaryLightTransparent,
  },
});
