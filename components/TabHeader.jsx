import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp } from "../common";
import { theme } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "expo-router";
import PressableOpacity from "./PressableOpacity";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const TabHeader = () => {
  const { user } = useAuth();
  const name = user ? `${user.lastName} ${user.firstName}` : null;
  const navigation = useNavigation();

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftHeaderContent}>
        <PressableOpacity style={styles.hamburgerIcon} onPress={toggleDrawer}>
          <FontAwesome5 name="bars" size={24} color="black" />
        </PressableOpacity>
        <Text style={styles.text}>Garang Guni</Text>
      </View>
      {name && <Text style={styles.name}>Welcome, {name}</Text>}
    </View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  headerContainer: {
    height: hp(7),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    padding: 10,
    marginTop: -5,
  },
  leftHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  hamburgerIcon: {
    paddingLeft: 10,
    paddingRight: 20,
  },
  text: {
    fontSize: hp(2.3),
    color: "white",
    fontWeight: theme.fonts.fontWeight.bold,
  },
  name: {
    fontSize: hp(1.5),
    color: "white",
    fontWeight: theme.fonts.fontWeight.bold,
  },
});
