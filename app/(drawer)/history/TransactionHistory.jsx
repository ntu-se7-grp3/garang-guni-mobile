import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useFocusEffect } from "expo-router";
import { useAuth } from "../../../contexts/AuthContext";
import Loading from "../../../components/Loading";
import { hp, parseDate, wp } from "../../../common";
import BookingContainer from "../../../components/BookingContainer";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { theme } from "../../../constants/theme";
import TabHeader from "../../../components/TabHeader";
import DefaultBookingHistoryContainer from "../../../components/DefaultBookingHistoryContainer";

const TransactionHistory = () => {
  const [isLoading, setLoading] = useState(true);
  const { user } = useAuth();
  const usingFakeData = true;

  useFocusEffect(
    useCallback(() => {
      if (user.bookingSummaries && user.bookingSummaries.length > 0) {
        setLoading(false);
        return;
      }

      if (usingFakeData && !user.hasPreloadedOnce) {
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

  if (isLoading) {
    return <Loading />;
  }

  const today = new Date();
  const pastBookings =
    user.bookingSummaries
      ?.filter((booking) => {
        const bookingDate = new Date(parseDate(booking.date));
        return bookingDate < today;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date)) || [];

  return (
    <ScreenWrapper>
      <TabHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.historyTitle}>TRANSCATION HISTORY</Text>
        {!user.bookingSummaries && <DefaultBookingHistoryContainer />}
        {pastBookings.map(
          ({ address, date, time, itemsToRecycle, remarks, images }, idx) => (
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
              buttons={[]}
            />
          )
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: theme.colors.whiteGreen,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  historyTitle: {
    alignSelf: "left",
    fontWeight: theme.fonts.fontWeight.bold,
    fontSize: hp(3.5),
    margin: hp(3),
    marginBottom: 0,
    marginLeft: 0,
  },
});
