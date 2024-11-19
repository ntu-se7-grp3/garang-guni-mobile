import { Dimensions, PixelRatio } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
const scale = deviceWidth > deviceHeight ? deviceHeight : deviceWidth;
const BASE_WIDTH = 375;

const fontConfig = {
  phone: {
    small: { min: 0.8, max: 1 },
    medium: { min: 0.9, max: 1.1 },
    large: { min: 1, max: 1.2 },
  },
  tablet: {
    small: { min: 1.3, max: 1.4 },
    medium: { min: 1.4, max: 1.5 },
    large: { min: 1.5, max: 1.7 },
  },
};

const getScreenSizeCategory = () => {
  if (scale < 350) return "small";
  if (scale > 500) return "large";
  return "medium";
};

const getDeviceType = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = deviceWidth * pixelDensity;
  const adjustedHeight = deviceHeight * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return "tablet";
  } else if (
    pixelDensity === 2 &&
    (adjustedWidth >= 1920 || adjustedHeight >= 1920)
  ) {
    return "tablet";
  } else {
    return "phone";
  }
};

export const getFontSize = (size) => {
  const deviceType = getDeviceType();
  const screenCategory = getScreenSizeCategory();
  const config = fontConfig[deviceType][screenCategory];

  const scaleFactor = scale / BASE_WIDTH;
  const clampedScaleFactor = Math.min(
    Math.max(scaleFactor, config.min),
    config.max
  );
  let newSize = size * clampedScaleFactor;
  if (deviceType === "tablet") {
    newSize *= 1.1;
  }
  return (
    Math.round(PixelRatio.roundToNearestPixel(newSize)) /
    PixelRatio.getFontScale()
  );
};

export const hp = (percentage) => {
  return (percentage * deviceHeight) / 100;
};

export const wp = (percentage) => {
  return (percentage * deviceWidth) / 100;
};

export const parseDate = (dateString) => {
  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  const [day, month, year] = dateString.split(" ");
  return new Date(parseInt(year), monthMap[month], parseInt(day));
};
