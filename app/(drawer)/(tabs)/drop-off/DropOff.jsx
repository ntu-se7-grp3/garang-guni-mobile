// npm install @react-native-picker/picker
import { StyleSheet, Text, ScrollView, View, Image, Dimensions, StatusBar } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import locationsData from "../../../../constants/dropOffData";
import { theme } from "../../../../constants/theme";
import ScreenWrapper from "../../../../components/ScreenWrapper";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const DropOff = () => {
  const navigation = useNavigation();
  const [selectedRegion, setSelectedRegion] = useState("All Location");
  const [selectedDay, setSelectedDay] = useState("Any Day");

  useFocusEffect(
    useCallback(() => {
      navigation.closeDrawer();
    }, [navigation])
  );

  const filteredLocations = locationsData.filter((location) => {
    const matchesRegion = selectedRegion === "All Location" || location.region === selectedRegion;
    const matchesDay = selectedDay === "Any Day" || location.days.includes(selectedDay);
    return matchesRegion && matchesDay;
  });

  return (
    <ScreenWrapper bg={theme.colors.whiteGreen}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.pageTitle}>DROP OFF POINTS</Text>

        {/* Filters */}
        <View style={styles.filterContainer}>
          <Picker
            selectedValue={selectedRegion}
            onValueChange={(value) => setSelectedRegion(value)}
            style={styles.picker}
          >
            <Picker.Item label="All Location" value="All Location" />
            <Picker.Item label="West" value="West" />
            <Picker.Item label="North East" value="North East" />
            <Picker.Item label="North West" value="North West" />
            <Picker.Item label="East" value="East" />
            <Picker.Item label="Central" value="Central" />
          </Picker>

          <Picker
            selectedValue={selectedDay}
            onValueChange={(value) => setSelectedDay(value)}
            style={styles.picker}
          >
            <Picker.Item label="Any Day" value="Any Day" />
            <Picker.Item label="Mon" value="Mon" />
            <Picker.Item label="Tue" value="Tue" />
            <Picker.Item label="Wed" value="Wed" />
            <Picker.Item label="Thu" value="Thu" />
            <Picker.Item label="Fri" value="Fri" />
            <Picker.Item label="Sat" value="Sat" />
            <Picker.Item label="Sun" value="Sun" />
          </Picker>
        </View>

        {/* Locations */}
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location, index) => (
            <View key={index} style={styles.locationCard}>
              {/* Green Label at Top-Right */}
              <View style={styles.regionTag}>
                <Text style={styles.regionTagText}>{location.region}</Text>
              </View>

              <Text style={styles.locationName}>{location.name}</Text>
              <Image source={location.map} style={styles.mapImage} />
              <Text style={styles.addressText}>Address: {location.address}</Text>
              <Text style={styles.detailsText}>Day: {location.days.join(", ")}</Text>
              <Text style={styles.detailsText}>Time: {location.time}</Text>
            </View>
          ))
        ) : (
          <View style={styles.noLocationsContainer}>
            <Text style={styles.noLocationsText}>Hang on, we are coming soon!</Text>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default DropOff;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.whiteGreen,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: screenWidth * 0.4,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  locationCard: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    position: "relative",
  },
  regionTag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    zIndex: 10,
  },
  regionTagText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  locationName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 25,
  },
  mapImage: {
    width: "100%",
    height: screenHeight * 0.25,
    resizeMode: "contain",
    marginBottom: 10,
  },
  addressText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 14,
    color: "#555",
  },
  noLocationsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noLocationsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
  },
});
