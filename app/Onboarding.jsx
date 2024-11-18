import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { theme } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import { hp, wp } from "../common";
import welcomeImg from "../assets/icons/logo.png";
import { routes } from "../constants/routes";

const Onboarding = () => {
  const router = useRouter();
  const ROUTES = routes;

  const handleContinue = async () => {
    await AsyncStorage.setItem("hasSeenWelcome", "true");
    router.push(ROUTES.HOME);
  };

  return (
    <ScreenWrapper bg={theme.colors.whiteGreen}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* First time page Image */}
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={welcomeImg}
        />

        {/* First time page */}
        <View>
          <Text style={styles.title}>Discover Endless</Text>
          <Text style={styles.titleEnd}>Possibility with Garang Guni</Text>
          <Text style={styles.catchPhrase}>
            Turning Trash into Treasure, One Item at a Time!
          </Text>
        </View>

        {/* First time Button*/}
        <View style={styles.footer}>
          <Button
            title="Continue"
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={handleContinue}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: theme.colors.whiteGreen,
    marginHorizontal: wp(4),
  },
  welcomeImage: {
    height: hp(40),
    width: wp(100),
    alignSelf: "center",
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fonts.fontSize["2xl"],
    textAlign: "center",
    fontWeight: theme.fonts.fontWeight.bold,
  },
  titleEnd: {
    color: theme.colors.text,
    paddingBottom: 20,
    fontSize: theme.fonts.fontSize["2xl"],
    textAlign: "center",
    fontWeight: theme.fonts.fontWeight.bold,
  },
  punchLine: {
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.text,
  },
  footer: {
    gap: 30,
    width: "100%",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  loginText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
