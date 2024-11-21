import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "./Button";
import { hp, wp } from "../common";
import { theme } from "../constants/theme";

const BookingContainer = ({
  bookingContainerStyle,
  date,
  icon,
  content = [],
  dateStyle,
  contentHeaderStyle,
  contentBodyStyle,
  contentListStyle,
  contentImgContainerStyle,
  contentImgStyle,
  contentContainerStyle,
  buttons = [
    {
      buttonStyle: {},
      title: "Insert text here",
      onPress: () => {},
    },
  ],
}) => {
  return (
    <View style={[styles.bookingContainer, bookingContainerStyle]}>
      {date && (
        <View style={styles.dateContainer}>
          {icon && icon}
          <Text style={[styles.date, dateStyle]}>{date}</Text>
        </View>
      )}
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {content.map(
          ({ contentHeader, contentBody, contentList, contentImgs }, idx) => {
            return (
              <View key={idx} style={{ marginBottom: 7 }}>
                {contentHeader && (
                  <Text style={[styles.contentHeader, contentHeaderStyle]}>
                    {contentHeader}
                  </Text>
                )}
                {contentBody && (
                  <Text style={contentBodyStyle}>{contentBody}</Text>
                )}
                {contentList && (
                  <View style={contentListStyle}>
                    {contentList.map((item, idx) => (
                      <View key={idx} style={styles.contentList}>
                        <Text
                          style={styles.contentListBulletPoint}
                        >{`\u2022`}</Text>
                        <Text>{item}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {contentImgs && (
                  <View
                    style={[
                      styles.contentImgContainer,
                      contentImgContainerStyle,
                    ]}
                  >
                    {contentImgs.map(({ img, type }, idx) => {
                      return (
                        <Image
                          key={idx}
                          source={{ uri: `data:image/${type};base64,${img}` }}
                          style={[styles.contentImg, contentImgStyle]}
                          resizeMode="contain"
                        />
                      );
                    })}
                  </View>
                )}
              </View>
            );
          }
        )}
      </View>
      {buttons.map(
        (
          { buttonStyle, textStyle, loading, hasShadow, title, onPress },
          idx
        ) => {
          return (
            <Button
              key={idx}
              buttonStyle={[styles.buttonLink, buttonStyle]}
              title={title}
              onPress={onPress}
              textStyle={textStyle}
              loading={loading}
              hasShadow={hasShadow}
            />
          );
        }
      )}
    </View>
  );
};

export default BookingContainer;

const styles = StyleSheet.create({
  bookingContainer: {
    alignSelf: "stretch",
    backgroundColor: "white",
    borderRadius: theme.radius.xxs,
    padding: wp(3),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    gap: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 5,
    marginBottom: 5,
  },
  date: {
    fontWeight: theme.fonts.fontWeight.bold,
    fontSize: hp(2.8),
  },
  contentContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    gap: 2,
  },
  contentHeader: {
    fontWeight: theme.fonts.fontWeight.bold,
    fontSize: hp(2),
  },
  contentList: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentListBulletPoint: {
    marginRight: 5,
  },
  contentImgContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
  },
  contentImg: {
    width: hp(10),
    height: hp(10),
  },
  buttonLink: {
    borderRadius: theme.radius.xxs,
  },
});
