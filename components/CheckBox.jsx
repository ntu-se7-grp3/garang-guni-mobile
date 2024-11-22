import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import PressableOpacity from "./PressableOpacity";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { hp } from "../common";
import { theme } from "../constants/theme";

const CheckBox = ({
  isLabelLeft = true,
  checkBoxContainerStyle,
  iconBoxContainerStyle,
  pressableOpacityStyle,
  title,
  iconColor = "white",
  iconSize,
  checked: propChecked = false,
  onCheckChange = () => {},
  textStyle,
}) => {
  const [isChecked, setIsChecked] = useState(propChecked);

  const handlePress = () => {
    setIsChecked((prevState) => {
      if (onCheckChange) {
        onCheckChange();
      }
      return !prevState;
    });
  };

  return (
    <View style={[styles.container, checkBoxContainerStyle]}>
      {isLabelLeft && title && (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
      <PressableOpacity
        activeOpacity={0.2}
        style={[styles.checkbox, pressableOpacityStyle]}
        onPress={handlePress}
      >
        {isChecked && (
          <View style={[styles.checked, iconBoxContainerStyle]}>
            <FontAwesome5
              name="check"
              size={iconSize ? iconSize : hp(2)}
              color={iconColor}
            />
          </View>
        )}
      </PressableOpacity>
      {!isLabelLeft && title && (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  checkbox: {
    width: hp(3),
    height: hp(3),
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: "grey",
    backgroundColor: "#fff",
  },
  checked: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0075FF",
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: hp(2),
    fontWeight: theme.fonts.fontWeight.bold,
  },
});
