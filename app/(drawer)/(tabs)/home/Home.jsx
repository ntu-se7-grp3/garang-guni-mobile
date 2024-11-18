import React, { useCallback, useRef } from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";

const { height: screenHeight } = Dimensions.get("window");

const Home = ({ language = "en" }) => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.closeDrawer();
    }, [])
  );

  const sectionsRef = useRef([]);

  const scrollToSection = (index) => {
    sectionsRef.current[index]?.scrollTo({
      y: index * screenHeight,
      animated: true,
    });
  };

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={screenHeight}
        ref={(el) => (sectionsRef.current = el)}
      >
        {/* <HomeMain />
        <HomeAccept />
        <HomeSchedule />
        <HomeDropOff />
        <HomeTestimonials />
        <HomeContactUs /> */}
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#333",
    paddingVertical: 10,
  },
  navItem: {
    color: "#fff",
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    height: screenHeight,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  stepText: {
    fontSize: 16,
    marginVertical: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    width: "80%",
  },
});
