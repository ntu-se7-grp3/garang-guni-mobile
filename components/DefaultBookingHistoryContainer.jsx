import { StyleSheet } from "react-native";
import React from "react";
import BookingContainer from "./BookingContainer";
import { useRouter } from "expo-router";
import { routes } from "../constants/routes";

const DefaultBookingHistoryContainer = () => {
  const router = useRouter();
  return (
    <BookingContainer
      content={[
        {
          contentHeader: "No Past Transcations Found",
          contentBody: " ",
        },
      ]}
      buttons={[
        {
          buttonStyle: {},
          title: "Plan a Pickup",
          onPress: () => {
            router.push(routes.SCHEDULE_PICKUP);
          },
        },
      ]}
    />
  );
};

export default DefaultBookingHistoryContainer;

const styles = StyleSheet.create({});
