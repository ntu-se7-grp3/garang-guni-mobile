import { Alert, ScrollView, StyleSheet, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { useRouter, useNavigation, useFocusEffect } from "expo-router";
import { routes } from "../../../../constants/routes";
import { useAuth } from "../../../../contexts/AuthContext";
import { theme } from "../../../../constants/theme";
import { hp, parseDate, wp } from "../../../../common";
import BookingContainer from "../../../../components/BookingContainer";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import DefaultBookingContainer from "../../../../components/DefaultBookingContainer";
import {
  generateBookingSummary,
  getBookingIds,
  getItemIds,
} from "../../../../utils/bookingUtils";
import {
  fakeGetAllBookingResponse,
  fakeGetAllImageFromItemResponse,
  fakeGetAllItemFromBookingResponse,
} from "../../../../constants/fakeBooking";
import Loading from "../../../../components/Loading";

const Schedule = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const { user, setUser } = useAuth();
  const usingFakeData = true;

  useFocusEffect(
    useCallback(() => {
      navigation.closeDrawer();

      if (!user) {
        router.push(routes.LOGIN_SIGN_UP_WELCOME);
        return;
      }

      if (user && user.bookingSummaries && user.bookingSummaries.length > 0) {
        setLoading(false);
        return;
      }

      if (user && usingFakeData && !user.hasPreloadedOnce) {
        // Call get all booking with user-id (Fake)
        const response = fakeGetAllBookingResponse;
        const bookingIds = getBookingIds(response);
        // Call get all items with booking IDs (Fake)
        const bookingSummaries = [];
        for (const bookingId of bookingIds) {
          const allItemReponse = fakeGetAllItemFromBookingResponse(bookingId);
          const bookingSummary = generateBookingSummary(allItemReponse);
          const allItemId = getItemIds(allItemReponse);
          const images = [];
          for (const itemId of allItemId) {
            images.push(fakeGetAllImageFromItemResponse(itemId));
          }
          bookingSummary.bookingId = bookingId;
          bookingSummary.images = images;
          bookingSummaries.push(bookingSummary);
        }
        user.bookingSummaries = bookingSummaries;
      }
      user.hasPreloadedOnce = true;
      setLoading(false);
    }, [])
  );

  if (!user) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleDeleteBooking = (bookingId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this booking?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedSummaries = user.bookingSummaries.filter(
              (summary) => summary.bookingId !== bookingId
            );
            console.log(updatedSummaries);
            console.log(bookingId);
            setUser({ ...user, bookingSummaries: updatedSummaries });
          },
        },
      ]
    );
  };

  const today = new Date();
  const upcomingBookings =
    user.bookingSummaries
      ?.filter((booking) => {
        const bookingDate = new Date(parseDate(booking.date));
        return bookingDate >= today;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date)) || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.scheduleTitle}>UPCOMING BOOKINGS</Text>
      {user && upcomingBookings.length === 0 && <DefaultBookingContainer />}
      {user &&
        upcomingBookings.map(
          (
            { bookingId, address, date, time, itemsToRecycle, remarks, images },
            idx
          ) => (
            <BookingContainer
              key={idx}
              icon={
                <FontAwesome5 name="calendar-alt" size={24} color="black" />
              }
              date={date}
              content={[
                {
                  contentHeader: "Address",
                  contentBody: address,
                },
                {
                  contentHeader: "Pickup Time",
                  contentBody: time,
                },
                {
                  contentHeader: "Items to Recycle",
                  contentList: itemsToRecycle,
                },
                {
                  contentHeader: "Remark",
                  contentBody: remarks,
                },
                {
                  contentHeader: "Uploaded Images",
                  contentImgs: images,
                },
              ]}
              buttons={[
                {
                  buttonStyle: {},
                  title: "Rechedule Booking",
                  onPress: () => {},
                },
                {
                  buttonStyle: {
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: theme.colors.primary,
                  },
                  textStyle: {
                    color: theme.colors.primary,
                  },
                  title: "Cancel Booking",
                  onPress: () => handleDeleteBooking(bookingId),
                },
              ]}
            />
          )
        )}
    </ScrollView>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: theme.colors.whiteGreen,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  scheduleTitle: {
    alignSelf: "left",
    fontWeight: theme.fonts.fontWeight.bold,
    fontSize: hp(3.5),
    margin: hp(3),
    marginBottom: 0,
    marginLeft: 0,
  },
});
