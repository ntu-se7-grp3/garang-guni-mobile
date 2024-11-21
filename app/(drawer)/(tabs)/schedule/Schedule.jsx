import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
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
import Button from "../../../../components/Button";

const Schedule = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
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
        const today = new Date();
        const updatedUpcomingBookingList =
          user.bookingSummaries
            ?.filter((booking) => {
              const bookingDate = new Date(parseDate(booking.date));
              return bookingDate >= today;
            })
            .sort(
              (a, b) =>
                new Date(parseDate(a.date)) - new Date(parseDate(b.date))
            ) || [];
        setUpcomingBookings(updatedUpcomingBookingList);
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
    }, [user?.bookingSummaries])
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
            setUser({ ...user, bookingSummaries: updatedSummaries });
          },
        },
      ]
    );
  };

  const handleNavigateToSchedulePickUp = (bookingId = null) => {
    router.push({
      pathname: routes.SCHEDULE_PICKUP,
      params: bookingId ? bookingId : {},
    });
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.scheduleTitle}>UPCOMING BOOKINGS</Text>
        {user && upcomingBookings.length === 0 && <DefaultBookingContainer />}
        {user &&
          upcomingBookings.map(
            (
              {
                bookingId,
                address,
                date,
                time,
                itemsToRecycle,
                remarks,
                images,
              },
              idx
            ) => (
              <BookingContainer
                key={idx}
                icon={
                  <FontAwesome5 name="calendar-alt" size={24} color="black" />
                }
                date={date}
                content={[
                  address && {
                    contentHeader: "Address",
                    contentBody: address,
                  },
                  time && {
                    contentHeader: "Pickup Time",
                    contentBody: time,
                  },
                  itemsToRecycle.length !== 0 && {
                    contentHeader: "Items to Recycle",
                    contentList: itemsToRecycle,
                  },
                  remarks && {
                    contentHeader: "Remark",
                    contentBody: remarks,
                  },
                  images.length !== 0 && {
                    contentHeader: "Uploaded Images",
                    contentImgs: images,
                  },
                ].filter(Boolean)}
                buttons={[
                  {
                    buttonStyle: {},
                    title: "Rechedule Booking",
                    onPress: () =>
                      handleNavigateToSchedulePickUp({
                        bookingId,
                      }),
                  },
                  {
                    buttonStyle: styles.invertedColorButton,
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
        {upcomingBookings.length !== 0 && (
          <View style={styles.floatingMarginCreater}></View>
        )}
      </ScrollView>
      {upcomingBookings.length !== 0 && (
        <Button
          title={"+"}
          buttonStyle={styles.floatingButton}
          onPress={() => handleNavigateToSchedulePickUp(null)}
        />
      )}
    </>
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
  invertedColorButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  floatingButton: {
    position: "absolute",
    bottom: 15,
    right: 10,
    width: hp(7),
    height: hp(7),
    borderRadius: hp(7) / 2,
  },
  floatingMarginCreater: {
    height: hp(8),
  },
});
