import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import TabHeader from "../../../components/TabHeader";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { theme } from "../../../constants/theme";

const TabLayout = () => {
  return (
    <ScreenWrapper>
      <TabHeader />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: "rgba(0,0,0,0.4)",
          tabBarStyle: {
            backgroundColor: theme.colors.tabLightColor,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home/Home"
          options={{
            title: "Home Page",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="drop-off/DropOff"
          options={{
            title: "Drop Off",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="map-marker-alt" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="schedule"
          options={{
            title: "Schedule",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="calendar-alt" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="contact-us/ContactUs"
          options={{
            title: "Contact Us",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="phone-alt" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-circle" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ScreenWrapper>
  );
};

export default TabLayout;
