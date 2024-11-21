import { Alert, Image, StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useAuth } from "../../../../contexts/AuthContext";
import { theme } from "../../../../constants/theme";
import { hp, wp } from "../../../../common";
import PressableOpacity from "../../../../components/PressableOpacity";
import Feather from "@expo/vector-icons/Feather";
import Input from "../../../../components/Input";
import { useState } from "react";
import Button from "../../../../components/Button";
import { router } from "expo-router";
import { routes } from "../../../../constants/routes";
import { launchImageLibraryAsync } from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const EditProfile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    address: user.address || "",
    email: user.email || "",
    contactNo: user.contactNo || "",
  });
  const [selectedDisplayPic, setSelectedDisplayPic] = useState(
    user.profileImg || null
  );

  const userImage = selectedDisplayPic ? (
    <Image
      source={{
        uri: `data:image/${selectedDisplayPic.type};base64,${selectedDisplayPic.img}`,
      }}
      resizeMode="contain"
      style={styles.profileImg}
    />
  ) : (
    <View style={styles.sampleIcon}>
      <FontAwesome5 name="user" size={hp(15)} color="black" />
    </View>
  );

  const handleOnChange = (field, value) => {
    setFormData((oldFormData) => {
      return {
        ...oldFormData,
        [field]: value,
      };
    });
  };

  const handleSave = () => {
    setUser({
      ...user,
      ...formData,
      profileImg: selectedDisplayPic,
    });
    router.back();
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
        setSelectedDisplayPic(newImage);
      } catch (error) {
        console.error("Error converting image to Base64:", error);
      }
    }
  };

  const handleChangeProfilePic = () => {
    Alert.alert(
      "Edit Profile Picture",
      "Use an existing photo from your gallery, or take a new photo?",
      [
        {
          text: "Choose from Gallery",
          onPress: () => pickImage(),
        },
        {
          text: "Take Photo",
          onPress: () => {
            router.push(routes.CAMERA);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileHeader}>Profile</Text>
      <PressableOpacity onPress={() => handleChangeProfilePic()}>
        {userImage}
        <View style={styles.imgIcon}>
          <FontAwesome5 name="pencil-alt" size={20} color="white" />
        </View>
      </PressableOpacity>
      <Input
        icon={<Feather name="user" size={24} color="black" />}
        placeholder="First Name"
        onChangeText={(newFirstName) =>
          handleOnChange("firstName", newFirstName)
        }
        defaultValue={formData.firstName}
        containerStyles={styles.inputContainer}
      />
      <Input
        icon={<Feather name="user" size={24} color="black" />}
        placeholder="Last Name"
        onChangeText={(newLastName) => handleOnChange("lastName", newLastName)}
        defaultValue={formData.lastName}
        containerStyles={styles.inputContainer}
      />
      <Input
        icon={<Feather name="map" size={24} color="black" />}
        placeholder="Address"
        onChangeText={(newAddress) => handleOnChange("address", newAddress)}
        defaultValue={formData.address}
        containerStyles={styles.inputContainer}
      />
      <Input
        icon={<Feather name="mail" size={24} color="black" />}
        placeholder="Email"
        onChangeText={(newEmail) => handleOnChange("email", newEmail)}
        defaultValue={formData.email}
        containerStyles={styles.inputContainer}
      />
      <Input
        icon={<Feather name="smartphone" size={24} color="black" />}
        placeholder="Contact Number"
        onChangeText={(newContactNo) =>
          handleOnChange("contactNo", newContactNo)
        }
        defaultValue={formData.contactNo}
        containerStyles={styles.inputContainer}
      />
      <PressableOpacity
        style={styles.changePasswordContainer}
        onPress={() => router.push(routes.CHANGE_PASSWORD)}
      >
        <Text style={styles.changePassword}>Change Password? Click Here!</Text>
      </PressableOpacity>

      <View style={styles.submitButton}>
        <Button title={"Save Settings"} onPress={handleSave} />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.whiteGreen,
    paddingHorizontal: wp(4),
    gap: 6,
  },
  profileHeader: {
    fontWeight: theme.fonts.fontWeight.bold,
    fontSize: hp(2),
    marginTop: hp(2.4),
  },
  profileImg: {
    width: hp(20),
    height: hp(20),
    borderRadius: hp(20) / 2,
    backgroundColor: theme.colors.softGray,
    marginBottom: 5,
  },
  imgIcon: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 999,
    height: hp(6),
    width: hp(6),
    backgroundColor: "#0a5d3c",
    borderRadius: "50%",
  },
  sampleIcon: {
    justifyContent: "center",
    alignItems: "center",
    height: hp(20),
    width: hp(20),
    backgroundColor: theme.colors.softGray,
    borderRadius: hp(20) / 2,
    overflow: "hidden",
    margin: 10,
  },
  inputContainer: {
    borderRadius: theme.radius.xxs,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.2)",
  },
  changePasswordContainer: {
    alignSelf: "flex-end",
    paddingBottom: 15,
  },
  changePassword: {
    fontWeight: theme.fonts.fontWeight.semibold,
    color: theme.colors.primary,
    paddingRight: 3,
  },
  submitButton: {
    width: "100%",
  },
});
