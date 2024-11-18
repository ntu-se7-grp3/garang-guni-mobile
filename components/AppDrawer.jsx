import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useAuth } from "../contexts/AuthContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { usePathname } from "expo-router";
import { theme } from "../constants/theme";
import { hp } from "../common";
import { StyleSheet, Text, View } from "react-native";

const AppDrawer = (props) => {
  const { user } = useAuth();
  const { drawerItems } = props;
  const pathname = usePathname();
  const filteredDrawerItems = drawerItems.filter((item) => {
    // !!user converts to boolean
    const isLoggedIn = !!user;
    return (
      (!item.requiresLogin || isLoggedIn) &&
      (!item.invisibleOnLogin || !isLoggedIn)
    );
  });

  const userImage =
    user && user.profile ? (
      <Image source={{ uri: user.profile }} style={styles.drawerProfileImg} />
    ) : (
      <View style={styles.drawerSampleIcon}>
        <FontAwesome5 name="user" size={hp(15)} color="black" />
      </View>
    );

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerProfile}>
        {userImage}
        {user && (user.firstName || user.lastName) ? (
          <>
            <Text style={styles.drawerProfileText}>
              {user.lastName + " " + user.firstName}
            </Text>
            <Text style={styles.drawerProfileText}>{user.sub}</Text>
          </>
        ) : (
          <Text style={styles.drawerProfileText}>Unregistered User</Text>
        )}
      </View>
      {filteredDrawerItems.map(({ icon, label, onPress, path }, index) => {
        const isActive = path.includes(pathname);
        return (
          <DrawerItem
            key={index}
            icon={({ size }) => (
              <FontAwesome5
                name={icon}
                size={size}
                color={isActive ? theme.colors.primary : "grey"}
              />
            )}
            label={label}
            labelStyle={{ color: isActive ? theme.colors.primary : "gray" }}
            onPress={onPress}
          />
        );
      })}
    </DrawerContentScrollView>
  );
};

export default AppDrawer;

const styles = StyleSheet.create({
  drawerProfile: {
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    height: hp(30),
    margin: -12,
    marginBottom: 0,
  },
  drawerProfileImg: {
    width: hp(20),
    height: hp(20),
    borderRadius: hp(20) / 2,
    backgroundColor: theme.colors.whiteGreen,
    overflow: "hidden",
  },
  drawerSampleIcon: {
    justifyContent: "center",
    alignItems: "center",
    height: hp(20),
    width: hp(20),
    backgroundColor: theme.colors.whiteGreen,
    borderRadius: hp(20) / 2,
    overflow: "hidden",
    marginBottom: 10,
  },
  drawerProfileText: {
    color: "white",
    fontWeight: theme.fonts.fontWeight.bold,
  },
});
