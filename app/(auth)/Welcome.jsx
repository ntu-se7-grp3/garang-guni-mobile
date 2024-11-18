import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { hp, wp } from "../../common";
import welcomeImg from "../../assets/icons/logo.png";
import { theme } from "../../constants/theme";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import ScreenWrapper from "../../components/ScreenWrapper";
import { routes } from "../../constants/routes";
import HomeButton from "../../components/HomeButton";

const Welcome = () => {
  const router = useRouter();
  const ROUTES = routes;
  return (
    <ScreenWrapper bg={theme.colors.whiteGreen}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <HomeButton router={router} />

        {/* Welcome Home Image */}
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={welcomeImg}
        />

        {/* Welcome Home */}
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>Haul Up!</Text>
          <Text style={styles.catchPhrase}>
            Turning Trash into Treasure, One Item at a Time!
          </Text>
        </View>

        {/* Welcome Home Footer */}
        <View style={styles.footer}>
          <Button
            title="Getting Started"
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => {
              router.push(ROUTES.SIGN_UP);
            }}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account!</Text>
            <Pressable
              onPress={() => {
                router.push(ROUTES.LOGIN);
              }}
            >
              <Text
                style={[
                  styles.loginText,
                  {
                    color: theme.colors.primaryDark,
                    fontWeight: theme.fonts.fontWeight.semibold,
                  },
                ]}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

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
    fontSize: hp(4),
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
