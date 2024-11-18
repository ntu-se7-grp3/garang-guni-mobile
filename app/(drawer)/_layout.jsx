import { StyleSheet } from "react-native";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { routes } from "../../constants/routes";
import AppDrawer from "../../components/AppDrawer";

const DrawerLayout = () => {
  const { clearToken } = useAuth();
  const drawerItems = [
    {
      icon: "home",
      label: "Home",
      onPress: () => router.replace(routes.HOME),
      requiresLogin: false,
      invisibleOnLogin: false,
      path: routes.HOME,
    },
    {
      icon: "user-alt",
      label: "My Profile",
      onPress: () => router.replace(routes.PROFILE),
      requiresLogin: true,
      invisibleOnLogin: false,
      path: routes.PROFILE,
    },
    {
      icon: "calendar-alt",
      label: "My Bookings",
      onPress: () => router.replace(routes.BOOKINGS),
      requiresLogin: true,
      invisibleOnLogin: false,
      path: routes.BOOKINGS,
    },
    {
      icon: "map-marker-alt",
      label: "Drop-off Areas",
      onPress: () => router.replace(routes.DROP_OFF),
      requiresLogin: false,
      invisibleOnLogin: false,
      path: routes.DROP_OFF,
    },
    {
      icon: "table",
      label: "Our Rates",
      onPress: () => router.push(routes.RATES),
      requiresLogin: false,
      invisibleOnLogin: false,
      path: routes.RATES,
    },
    {
      icon: "history",
      label: "Transaction History",
      onPress: () => router.push(routes.TRANSACTION_HISTORY),
      requiresLogin: true,
      invisibleOnLogin: false,
      path: routes.TRANSACTION_HISTORY,
    },
    {
      icon: "phone-alt",
      label: "Contact Us",
      onPress: () => router.replace(routes.CONTACT_US),
      requiresLogin: false,
      invisibleOnLogin: false,
      path: routes.CONTACT_US,
    },
    {
      icon: "cog",
      label: "Settings",
      onPress: () => router.push(routes.SETTINGS),
      requiresLogin: false,
      invisibleOnLogin: false,
      path: routes.SETTINGS,
    },
    {
      icon: "sign-in-alt",
      label: "Log In",
      onPress: () => router.push(routes.LOGIN),
      requiresLogin: false,
      invisibleOnLogin: true,
      path: routes.LOGIN,
    },
    {
      icon: "sign-out-alt",
      label: "Log Out",
      onPress: () => {
        clearToken();
        router.replace(routes.STARTING_PAGE);
      },
      requiresLogin: true,
      invisibleOnLogin: false,
      path: routes.STARTING_PAGE,
    },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <AppDrawer {...props} drawerItems={drawerItems} />
        )}
        screenOptions={{
          headerShown: false,
          swipeEdgeWidth: 100,
          swipeEnabled: true,
        }}
      />
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;

const styles = StyleSheet.create({});
