import { StyleSheet, Text } from "react-native";
import React, { useCallback } from "react";
import Button from "../../../../components/Button";
import { useRouter, useNavigation, useFocusEffect } from "expo-router";
import { routes } from "../../../../constants/routes";
import { useAuth } from "../../../../contexts/AuthContext";

const Schedule = () => {
  const router = useRouter();
  const ROUTES = routes;
  const navigation = useNavigation();
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      navigation.closeDrawer();

      if (!user) {
        router.push(routes.LOGIN_SIGN_UP_WELCOME);
      }
    }, [])
  );

  return (
    <>
      <Text>Schedule</Text>
      <Button
        title={"Sign Up"}
        onPress={() => router.push(ROUTES.LOGIN_SIGN_UP_WELCOME)}
      />
    </>
  );
};

export default Schedule;

const styles = StyleSheet.create({});
