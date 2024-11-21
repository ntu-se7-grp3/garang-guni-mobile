import { Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { router, useFocusEffect, useNavigation } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useAuth } from "../../../../contexts/AuthContext";
import { theme } from "../../../../constants/theme";
import { hp, wp } from "../../../../common";
import { routes } from "../../../../constants/routes";
import Button from "../../../../components/Button";

const Profile = () => {
  const navigation = useNavigation();
  const { user, clearToken } = useAuth();
  const userImage =
    user && user.profileImg ? (
      <Image
        source={{
          uri: `data:image/${user.profileImg.type};base64,${user.profileImg.img}`,
        }}
        style={styles.profileImg}
      />
    ) : (
      <View style={styles.sampleIcon}>
        <FontAwesome5 name="user" size={hp(15)} color="black" />
      </View>
    );

  const handleLogOut = () => {
    clearToken();
    router.replace(routes.STARTING_PAGE);
  };

  useFocusEffect(
    useCallback(() => {
      navigation.closeDrawer();

      if (!user) {
        router.push(routes.LOGIN_SIGN_UP_WELCOME);
      }
    }, [])
  );

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.profileHeader}>Profile</Text>
      {userImage}
      <Text style={styles.profileText}>
        {user.lastName + " " + user.firstName}
      </Text>
      <Text style={styles.profileEmail}>{user.email}</Text>
      <View style={styles.profileLinkContainer}>
        <Button
          title={"Edit Profile"}
          buttonStyle={styles.profileLinkInverse}
          textStyle={{ color: theme.colors.primary }}
          onPress={() => router.push(routes.EDIT_PROFILE)}
        />
        <Button
          title={"Log Out"}
          buttonStyle={styles.profileLink}
          onPress={handleLogOut}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.whiteGreen,
    paddingHorizontal: wp(4),
  },
  profileHeader: {
    fontWeight: theme.fonts.fontWeight.bold,
    fontSize: hp(2),
    margin: hp(2.4),
  },
  profileImg: {
    width: hp(20),
    height: hp(20),
    borderRadius: hp(20) / 2,
    backgroundColor: theme.colors.softGray,
    overflow: "hidden",
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
  imgIcon: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 999,
    height: hp(6),
    width: hp(6),
    backgroundColor: "blue",
    borderRadius: "50%",
  },
  profileText: {
    fontWeight: theme.fonts.fontWeight.extraBold,
    fontSize: hp(2.5),
  },
  profileEmail: {
    fontWeight: theme.fonts.fontWeight.bold,
    color: "grey",
    fontSize: hp(2),
  },
  profileLinkContainer: {
    marginTop: 10,
  },
  profileLink: {
    marginTop: hp(2),
    width: wp(90),
  },
  profileLinkInverse: {
    marginTop: hp(2),
    width: wp(90),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
});
