import { getFontSize } from "../common";

const baseFontSize = getFontSize(16);

export const theme = {
  colors: {
    primary: "#00C26F",
    primaryDark: "#00AC62",
    primaryLightTransparent: "#00C26F4D",
    dark: "#121212",
    darklight: "#1E1E1E",
    gray: "#424242",
    softGray: "#F2F2F2",

    text: "#494949",
    textLight: "#7C7C7C",
    textDark: "#1D1D1D",

    rose: "#ef4444",
    roseLight: "#FB7171",

    whiteGreen: "#E6FFE6",

    tabLightColor: "#FFFFFF",
  },
  fonts: {
    fontSize: {
      xs: baseFontSize * 0.75,
      sm: baseFontSize * 0.875,
      base: baseFontSize,
      lg: baseFontSize * 1.125,
      xl: baseFontSize * 1.25,
      "2xl": baseFontSize * 1.5,
      "3xl": baseFontSize * 1.875,
      "4xl": baseFontSize * 2.25,
      "5xl": baseFontSize * 3,
      "6xl": baseFontSize * 3.75,
      "7xl": baseFontSize * 4.5,
      "8xl": baseFontSize * 6,
      "9xl": baseFontSize * 8,
    },
    fontWeight: {
      medium: "500",
      semibold: "600",
      bold: "700",
      extraBold: "800",
    },
  },
  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
  },
};
