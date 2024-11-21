import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { theme } from "../../../../constants/theme";
import { convertDate, hp, wp } from "../../../../common";
import { useLocalSearchParams, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { Calendar } from "react-native-calendars";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import PressableOpacity from "../../../../components/PressableOpacity";
import CheckBoxList from "../../../../components/CheckBoxList";
import { useAuth } from "../../../../contexts/AuthContext";
import { routes } from "../../../../constants/routes";
import { randomUUID } from "expo-crypto";
import { launchImageLibraryAsync } from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import uploadImg from "../../../../assets/upload-photo.png";

const SchedulePickUp = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const { bookingId } = useLocalSearchParams();
  const currentBooking = user.bookingSummaries
    ? user.bookingSummaries.find((booking) => booking.bookingId === bookingId)
    : null;
  const bookingSummary = {
    address: currentBooking?.address || "",
    date: currentBooking?.date || "",
    time: currentBooking?.time || "",
    itemsToRecycle: currentBooking?.itemsToRecycle || [],
    remarks: currentBooking?.remarks || "",
    images: currentBooking?.images || [],
  };
  const isEditing = !!bookingId;
  const itemToRecycleDic = {
    Recyclables: [
      "Newspaper",
      "Brochures",
      "Paper",
      "Cardboard",
      "Magazine",
      "Cans",
      "Books",
      "Scrap Metal",
    ],
    Clothings: ["Clothes", "Bags", "Shoes", "Curtain"],
    Electronics: [
      "Television",
      "Laptop",
      "Radio",
      "Power Supply",
      "Mobile Phone",
    ],
  };
  const initialCheckedItems = Object.keys(itemToRecycleDic).reduce(
    (acc, category) => {
      acc[category] = itemToRecycleDic[category].reduce((itemAcc, item) => {
        itemAcc[item] =
          Object.keys(bookingSummary).length !== 0
            ? bookingSummary.itemsToRecycle.includes(item)
            : false;
        return itemAcc;
      }, {});
      return acc;
    },
    {}
  );

  const [isShowingCalendar, setIsShowingCalendar] = useState(false);
  const [checkedItems, setCheckedItems] = useState(initialCheckedItems);
  const [booking, setBooking] = useState(bookingSummary);

  const handleOnChange = (field, value) => {
    setBooking((oldBooking) => {
      return {
        ...oldBooking,
        [field]: value,
      };
    });
  };

  const handleSave = () => {
    if (
      !booking.address ||
      !booking.date ||
      !booking.time ||
      getCheckedItems(checkedItems).length === 0
    ) {
      Alert.alert(
        "Data Missing",
        "Please fill in address, datetime and the item!"
      );
      return;
    }
    const updatedBooking = {
      ...booking,
      bookingId: bookingId ? bookingId : randomUUID(),
      itemsToRecycle: getCheckedItems(checkedItems),
    };
    const allBookingSummaries = user.bookingSummaries;

    if (isEditing) {
      const updatedBookingSummaries = allBookingSummaries.filter(
        (currBooking) => currBooking.bookingId != bookingId
      );
      updatedBookingSummaries.push(updatedBooking);
      setUser({ ...user, bookingSummaries: updatedBookingSummaries });
    } else {
      allBookingSummaries.push(updatedBooking);
      setUser({ ...user, bookingSummaries: allBookingSummaries });
    }
    router.replace(routes.BOOKINGS);
  };

  const handleAddPhoto = (newImg) => {
    setBooking((oldBooking) => {
      return {
        ...oldBooking,
        images: [...oldBooking.images, newImg],
      };
    });
  };

  const handleDeletePhoto = (imgIdx) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this picture?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedImages = booking.images.filter(
              (images, idx) => idx != imgIdx
            );
            setBooking((oldBooking) => {
              return {
                ...oldBooking,
                images: updatedImages,
              };
            });
          },
        },
      ]
    );
  };

  const toggleShowDate = () => {
    setIsShowingCalendar((prevState) => !prevState);
  };

  const getNextDay = () => {
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    const formattedTomorrow = tomorrow.toISOString().split("T")[0];
    return formattedTomorrow;
  };

  const getCheckedItems = (checkedItems) => {
    return Object.entries(checkedItems).flatMap(([category, items]) =>
      Object.entries(items)
        .filter(([item, checked]) => checked)
        .map(([item]) => item)
    );
  };

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      try {
        const base64String = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );
        const imageType = result.assets[0].mimeType.split("/")[1];
        const newImage = {
          img: base64String,
          type: imageType,
        };

        handleAddPhoto(newImage);
      } catch (error) {
        console.error("Error converting image to Base64:", error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.scheduleTitle}>
        {isEditing ? "EDIT BOOKING" : "SCHEDULE A PICK UP"}
      </Text>
      <Text style={styles.scheduleHeader}>Pick Up Details</Text>
      <Input
        icon={<Feather name="map" size={24} color="black" />}
        placeholder="Address"
        onChangeText={(newAddress) => handleOnChange("address", newAddress)}
        defaultValue={booking.address}
        containerStyles={styles.inputContainer}
      />
      <PressableOpacity
        style={{ alignSelf: "stretch" }}
        onPress={() => toggleShowDate()}
      >
        <Input
          icon={<FontAwesome5 name="calendar-alt" size={24} color="black" />}
          placeholder="Please pick a date"
          value={booking.date}
          containerStyles={styles.inputContainer}
          editable={false}
        />
      </PressableOpacity>
      {isShowingCalendar && (
        <Calendar
          onDayPress={(day) => {
            handleOnChange("date", convertDate(day.dateString));
            toggleShowDate();
          }}
          minDate={getNextDay()}
          markedDates={{
            [booking.date]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
        />
      )}
      <View style={styles.timingContainer}>
        <Button
          title={"Morning"}
          buttonStyle={
            booking.time === "Morning"
              ? styles.defaultButtonStyle
              : styles.invertedColorButtonStyle
          }
          textStyle={
            booking.time === "Morning" ? {} : styles.invertedColorTextStyle
          }
          onPress={() => handleOnChange("time", "Morning")}
        />
        <Button
          title={"Afternoon"}
          buttonStyle={
            booking.time === "Afternoon"
              ? styles.defaultButtonStyle
              : styles.invertedColorButtonStyle
          }
          textStyle={
            booking.time === "Afternoon" ? {} : styles.invertedColorTextStyle
          }
          onPress={() => handleOnChange("time", "Afternoon")}
        />
      </View>

      <Text style={styles.scheduleHeader}>Item To Recycle</Text>
      <CheckBoxList
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
      />

      <Text style={styles.scheduleHeader}>Pictures</Text>
      <View style={styles.imgContainer}>
        {booking.images.map(({ img, type }, idx) => {
          return (
            <PressableOpacity onPress={() => handleDeletePhoto(idx)} key={idx}>
              <Image
                source={{ uri: `data:image/${type};base64,${img}` }}
                style={styles.img}
                resizeMode="contain"
              />
            </PressableOpacity>
          );
        })}
      </View>
      <PressableOpacity
        style={styles.imgPressableContainer}
        onPress={pickImage}
      >
        <View style={styles.uploadImgContainer}>
          <Image source={uploadImg} style={styles.uploadingImg} />
        </View>
      </PressableOpacity>
      <PressableOpacity
        style={styles.cameraLinkContainer}
        onPress={() => router.push(routes.CAMERA)}
      >
        <Text style={styles.cameraLink}>Dont have a good photo? Take one!</Text>
      </PressableOpacity>

      <Text style={styles.scheduleHeader}>Remarks</Text>
      <Input
        placeholder="Remarks"
        onChangeText={(newRemarks) => handleOnChange("remarks", newRemarks)}
        defaultValue={booking.remarks}
        containerStyles={styles.remarksContainer}
        multiline={true}
      />
      <View style={styles.scheduleButton}>
        <Button title={"Schedule"} onPress={handleSave} />
      </View>

      <View style={styles.emptySpace}></View>
    </ScrollView>
  );
};

export default SchedulePickUp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: theme.colors.whiteGreen,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  buttonStyle: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  textStyle: {
    color: theme.colors.primary,
  },
  scheduleTitle: {
    alignSelf: "left",
    fontWeight: theme.fonts.fontWeight.bold,
    fontSize: hp(3.5),
    margin: hp(3),
    marginBottom: 0,
    marginLeft: 0,
  },
  scheduleHeader: {
    alignSelf: "flex-start",
    fontWeight: theme.fonts.fontWeight.bold,
    fontSize: hp(2.3),
  },
  inputContainer: {
    borderRadius: theme.radius.xxs,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.2)",
  },
  timingContainer: {
    flexDirection: "row",
    flex: 1,
    gap: 10,
  },
  defaultButtonStyle: {
    flex: 1,
    borderRadius: theme.radius.xxs,
  },
  invertedColorButtonStyle: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: theme.radius.xxs,
    borderColor: theme.colors.primary,
  },
  invertedColorTextStyle: {
    color: theme.colors.primary,
  },
  remarksContainer: {
    borderRadius: theme.radius.xxs,
    backgroundColor: "white",
    height: hp(30),
    alignItems: "flex-start",
    padding: 3,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.2)",
  },
  imgContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  img: {
    width: hp(10),
    height: hp(10),
  },
  imgPressableContainer: {
    width: "100%",
    height: hp(15),
  },
  uploadImgContainer: {
    backgroundColor: "rgba(0,183,195,0.2)",
    width: "100%",
    justifyContent: "center",
    height: hp(15),
    borderStyle: "dashed",
    borderColor: "rgba(0,183,195,1)",
    borderWidth: 3,
  },
  uploadingImg: {
    flex: 1,
    height: hp(15),
    width: "100%",
    resizeMode: "contain",
  },
  cameraLinkContainer: {
    alignSelf: "flex-end",
  },
  cameraLink: {
    fontWeight: theme.fonts.fontWeight.semibold,
    color: theme.colors.primary,
    paddingRight: 3,
  },
  scheduleButton: {
    width: "100%",
  },
  emptySpace: {
    marginVertical: 2.5,
  },
});
