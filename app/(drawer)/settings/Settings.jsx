import React, { useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { theme } from "../../../constants/theme";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TabHeader from "../../../components/TabHeader";
import enTranslations from "../../../translations/en/Settings.json";
import zhTranslations from "../../../translations/zh/Settings.json";
import msTranslations from "../../../translations/ms/Settings.json";
import taTranslations from "../../../translations/ta/Settings.json";

const Settings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const translations = {
    en: enTranslations,
    zh: zhTranslations,
    ms: msTranslations,
    ta: taTranslations,
  };

  const text = translations[selectedLanguage];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // Placeholder for future implementation
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ScreenWrapper bg={isDarkMode ? "#333" : theme.colors.whiteGreen}>
      <TabHeader />
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>
          {text.settingsTitle}
        </Text>

        {/* Language Setting */}
        <View style={styles.settingContainer}>
          <Text style={[styles.settingLabel, isDarkMode && styles.darkText]}>
            {text.changeLanguage}
          </Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={handleLanguageChange}
              style={styles.picker}
              dropdownIconColor={isDarkMode ? "#fff" : "#000"}
              mode="dropdown"
            >
              <Picker.Item label="Choose here" value="" enabled={false} />
              <Picker.Item label="English" value="en" />
              <Picker.Item label="中文" value="zh" />
              <Picker.Item label="Bahasa Melayu" value="ms" />
              <Picker.Item label="தமிழ்" value="ta" />
            </Picker>
          </View>
        </View>

        {/* Theme Setting */}
        <View style={styles.settingContainer}>
          <Text style={[styles.settingLabel, isDarkMode && styles.darkText]}>
            {text.theme}
          </Text>
          <View style={styles.switchWrapper}>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              thumbColor={isDarkMode ? theme.colors.primary : "#f4f3f4"}
              trackColor={{ false: "#767577", true: theme.colors.primary }}
            />
            <Text style={[styles.switchLabel, isDarkMode && styles.darkText]}>
              {isDarkMode ? text.darkMode : text.lightMode}
            </Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  darkText: {
    color: "#fff",
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
  },
  picker: {
    height: 55,
    width: "100%",
    padding: 5,
  },
  switchWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
});
