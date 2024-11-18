import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { routes } from "../constants/routes";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function App() {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const ROUTES = routes;

  useEffect(() => {
    const checkWelcomeScreen = async () => {
      const seenWelcome = await AsyncStorage.getItem("hasSeenWelcome");
      setHasSeenWelcome(seenWelcome === "true");
      setIsLoading(false);
    };

    checkWelcomeScreen();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (hasSeenWelcome) {
        router.push(ROUTES.HOME);
      } else {
        router.push(ROUTES.ONBOARDING);
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <>
        <View style={styles.loadingBar}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
        <View style={styles.preloadIconsLib}>
          <Feather name="mail" size={0.1} color="white" />
          <Entypo name="home" size={0.1} color="eye" />
          <Ionicons name="home" size={0.1} color="white" />
          <FontAwesome5 name="home" size={0.1} color="white" />
        </View>
      </>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  preloadIconsLib: {
    height: 0,
    overflow: "hidden",
  },
  loadingBar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
