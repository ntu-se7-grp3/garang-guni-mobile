import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { theme } from "../../../constants/theme";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { router } from "expo-router";
import { routes } from "../../../constants/routes";

const ratesData = [
  {
    category: "Recyclables",
    items: [
      { name: "Newspaper", pickup: "$0.14", dropOff: "$0.25", unit: "/Kg" },
      { name: "Paper", pickup: "$0.14", dropOff: "$0.25", unit: "/Kg" },
      { name: "Magazine", pickup: "$0.14", dropOff: "$0.25", unit: "/Kg" },
      { name: "Books", pickup: "$0.14", dropOff: "$0.25", unit: "/Kg" },
      { name: "Brochures", pickup: "$0.14", dropOff: "$0.25", unit: "/Kg" },
      { name: "Cardboard", pickup: "$0.14", dropOff: "$0.25", unit: "/Kg" },
      { name: "Cans", pickup: "$0.51", dropOff: "$0.73", unit: "/Kg" },
      { name: "Scrap Metal", pickup: "$0.51", dropOff: "$0.73", unit: "/Kg" },
    ],
  },
  {
    category: "Clothings",
    items: [
      { name: "Clothes", pickup: "$0.14", dropOff: "$0.25", unit: "/Kg" },
      { name: "Shoes", pickup: "$0.10", dropOff: "$0.15", unit: "/Pair" },
      { name: "Bags", pickup: "$0.20", dropOff: "$0.30", unit: "/Bag" },
      { name: "Curtain", pickup: "$0.14", dropOff: "$0.25", unit: "/Kg" },
    ],
  },
  {
    category: "Electronics",
    items: [
      { name: "Television", pickup: "$5.00", dropOff: "$7.00", unit: "/Unit" },
      { name: "Radio", pickup: "$2.00", dropOff: "$3.00", unit: "/Unit" },
      { name: "Mobile Phone", pickup: "$1.00", dropOff: "$1.50", unit: "/Unit" },
      { name: "Laptop", pickup: "$3.00", dropOff: "$5.00", unit: "/Unit" },
      { name: "Power Supply", pickup: "$0.50", dropOff: "$0.80", unit: "/Unit" },
    ],
  },
];

const RatesPage = () => {
  return (
    <ScreenWrapper bg={theme.colors.whiteGreen}>
      {/* Top-Left Home Button */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.replace(routes.HOME)}
      >
        <Text style={styles.homeButtonText}>Go back to Home</Text>
      </TouchableOpacity>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>OUR RATES</Text>

        {ratesData.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.category}</Text>

            <View style={styles.table}>
              {/* Table Header */}
              <View style={[styles.row, styles.headerRow]}>
                <Text style={[styles.cell, styles.headerCell]}>Items</Text>
                <Text style={[styles.cell, styles.headerCell]}>Pickup</Text>
                <Text style={[styles.cell, styles.headerCell]}>Drop off</Text>
                <Text style={[styles.cell, styles.headerCell]}>Units</Text>
              </View>

              {/* Table Data */}
              {category.items.map((item, itemIndex) => (
                <View
                  key={itemIndex}
                  style={[
                    styles.row,
                    itemIndex % 2 === 0 ? styles.evenRow : styles.oddRow,
                  ]}
                >
                  <Text style={styles.cell}>{item.name}</Text>
                  <Text style={styles.cell}>{item.pickup}</Text>
                  <Text style={styles.cell}>{item.dropOff}</Text>
                  <Text style={styles.cell}>{item.unit}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default RatesPage;

const styles = StyleSheet.create({
  homeButton: {
    position: "absolute",
    top: 30,
    left: 10,
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    zIndex: 10,
  },
  homeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  headerRow: {
    backgroundColor: "#d9f2d9",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  cell: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
  },
  headerCell: {
    fontWeight: "bold",
  },
});
