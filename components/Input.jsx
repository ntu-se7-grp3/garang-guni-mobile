import { StyleSheet, Text, TextInput, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import { theme } from "../constants/theme";
import { hp } from "../common";
import PressableOpacity from "./PressableOpacity";

const Input = (props) => {
  const passwordIconSize = 24;
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View
      style={[styles.container, props.containerStyles && props.containerStyles]}
    >
      {props.icon && props.icon}
      <TextInput
        style={{ flex: 1 }}
        placeholderTextColor={theme.colors.textLight}
        ref={props.inputRef && props.inputRef}
        secureTextEntry={props.isPasswordField ? hidePassword : false}
        {...props}
      />
      {props.isPasswordField && (
        <PressableOpacity
          onPressIn={() => setHidePassword(false)}
          onPressOut={() => setHidePassword(true)}
        >
          {hidePassword ? (
            <Entypo name="eye" size={passwordIconSize} color="black" />
          ) : (
            <Entypo
              name="eye-with-line"
              size={passwordIconSize}
              color="black"
            />
          )}
        </PressableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: hp(7.2),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxs,
    borderCurive: "continuous",
    paddingHorizontal: 18,
    gap: 12,
  },
});
