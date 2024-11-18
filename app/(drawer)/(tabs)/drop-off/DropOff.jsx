import { StyleSheet, Text } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect, useNavigation } from "expo-router";

const DropOff = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.closeDrawer();
    }, [])
  );

  return (
    <>
      <Text>DropOff</Text>
    </>
  );
};

export default DropOff;

const styles = StyleSheet.create({});
