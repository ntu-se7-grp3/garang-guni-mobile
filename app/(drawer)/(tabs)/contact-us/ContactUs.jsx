import { StyleSheet, Text } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect, useNavigation } from "expo-router";

const ContactUs = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.closeDrawer();
    }, [])
  );

  return (
    <>
      <Text>Contact Us</Text>
    </>
  );
};

export default ContactUs;

const styles = StyleSheet.create({});
