import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CheckBox from "./CheckBox";
import { theme } from "../constants/theme";
import { hp } from "../common";

const CheckBoxList = ({
  checkedItems = {},
  setCheckedItems,
  itemsPerRow = 2,
  containerStyle,
  catagoryContainerStyle,
  categoryTitleStyle,
  checkBoxContainerStyle,
  textStyle,
}) => {
  const handleCheckChange = (category, item) => {
    setCheckedItems((prevState) => {
      const updatedCategory = {
        ...prevState[category],
        [item]: !prevState[category][item],
      };
      return { ...prevState, [category]: updatedCategory };
    });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Object.keys(checkedItems).map((category) => (
        <View key={category} style={[styles.category, catagoryContainerStyle]}>
          <Text style={[styles.categoryTitle, categoryTitleStyle]}>
            {category}
          </Text>
          <View style={[styles.checkBoxContainer, checkBoxContainerStyle]}>
            {Object.keys(checkedItems[category])?.map((item) => (
              <View
                key={item}
                style={[styles.item, { width: `${98 / itemsPerRow}%` }]}
              >
                <Text style={textStyle}>{item}</Text>
                <View>
                  <CheckBox
                    checked={checkedItems[category][item]}
                    onCheckChange={() => handleCheckChange(category, item)}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default CheckBoxList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: theme.radius.xxs,
    backgroundColor: theme.colors.primary,
  },
  category: {
    paddingVertical: 5,
    backgroundColor: theme.colors.primary,
    alignSelf: "center",
  },
  categoryTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkBoxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  item: {
    width: "48%",
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
