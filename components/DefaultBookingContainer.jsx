import { StyleSheet } from "react-native";
import React from "react";
import BookingContainer from "./BookingContainer";
import { useRouter } from "expo-router";
import { routes } from "../constants/routes";

const DefaultBookingContainer = () => {
  const router = useRouter();
  return (
    <BookingContainer
      content={[
        {
          contentHeader: "You have no bookings yet",
          contentBody: " ",
        },
      ]}
      buttons={[
        {
          buttonStyle: {},
          title: "Schedule a Pickup",
          onPress: () => {
            router.push(routes.SCHEDULE_PICKUP);
          },
        },
      ]}
    />
  );
};

export default DefaultBookingContainer;

const styles = StyleSheet.create({});
