import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { useFocusEffect, router } from "expo-router";
import { routes } from "../../../../constants/routes";
import { theme } from "../../../../constants/theme";
import Button from "../../../../components/Button";
import ScreenWrapper from "../../../../components/ScreenWrapper";

import homeCoinImage from "../../../../assets/home/home-coin.png";
import homeItem1Image from "../../../../assets/home/home-item1.png";
import homeItem2Image from "../../../../assets/home/home-item2.png";
import homeItem3Image from "../../../../assets/home/home-item3.png";
import homeScheduleImage from "../../../../assets/home/home-schedule.png";
import homeLocateImage from "../../../../assets/home/home-locate.png";
import bulletImage from "../../../../assets/home/bullet.png";

const { height: screenHeight } = Dimensions.get("window");

const Home = () => {
  useFocusEffect(
    React.useCallback(() => {
      router.replace(routes.HOME);
    }, [])
  );

  return (
    <ScreenWrapper bg={theme.colors.whiteGreen}>
      <StatusBar
        StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="dark-content"
        translucent
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Homepage Section */}
        <View style={styles.section}>
          <Text style={styles.headerTitle}>SELL YOUR JUNK,</Text>
          <Text style={styles.headerTitle}>GET PAID CASH!</Text>
          <Image source={homeCoinImage} style={styles.image} />
          <Text style={styles.headerSubtitle}>
            Your trusted partner for hassle-free junk removal. We offer top
            rates and convenient pickup services.
          </Text>
        </View>

        {/* Items Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>WE ACCEPT THESE ITEMS</Text>
          <View style={styles.photoRow}>
            <Image source={homeItem1Image} style={styles.photo} />
            <Image source={homeItem2Image} style={styles.photo} />
            <Image source={homeItem3Image} style={styles.photo} />
          </View>
          <Button
            title="See the full list of items with the rates"
            buttonStyle={styles.fullWidthButton}
            textStyle={styles.fullWidthButtonText}
            onPress={() => router.push(routes.RATES)}
          />
        </View>

        {/* Procedure Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>READY TO DECLUTTER?</Text>
          <Image source={homeScheduleImage} style={styles.image} />
          <View style={styles.bulletRow}>
            <Text style={styles.bulletText}>1. Sign Into Your Account</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletText}>2. Declare All Your Items</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletText}>3. Schedule a Pickup Date</Text>
          </View>
          <View style={styles.buttonRow}>
            <Button
              title="Create Account"
              buttonStyle={styles.outlinedButton}
              textStyle={styles.outlinedButtonText}
              onPress={() => router.push(routes.SIGN_UP)}
            />
            <Button
              title="Sign-in"
              buttonStyle={styles.filledButton}
              textStyle={styles.filledButtonText}
              onPress={() => router.push(routes.LOGIN)}
            />
          </View>
        </View>

        {/* Drop-off Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EARN MORE BY DROPPING OFF</Text>
          <Image source={homeLocateImage} style={styles.image} />
          <Button
            title="Locate Our Drop Off Points"
            buttonStyle={styles.fullWidthButton}
            textStyle={styles.fullWidthButtonText}
            onPress={() => router.push(routes.DROP_OFF)}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.whiteGreen,
  },
  contentContainer: {
    alignItems: "center",
    paddingTop: StatusBar.currentHeight || 0,
  },
  section: {
    paddingVertical: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    height: screenHeight * 0.4,
    resizeMode: "contain",
    marginBottom: 15,
  },
  photoRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
  },
  photo: {
    height: screenHeight * 0.2,
    resizeMode: "contain",
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bulletIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  bulletText: {
    fontSize: 16,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    width: "90%",
    alignSelf: "center",
  },
  fullWidthButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    padding: 12,
    width: "90%",
    alignSelf: "center",
    marginVertical: 15,
  },
  fullWidthButtonText: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  outlinedButton: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 12,
    marginHorizontal: 5,
  },
  outlinedButtonText: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  filledButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 12,
    marginHorizontal: 5,
  },
  filledButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
