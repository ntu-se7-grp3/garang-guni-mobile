import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { hp, wp } from "../../common";
import { theme } from "../../constants/theme";
import ScreenWrapper from "../../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import BackButton from "../../components/BackButton";
import Input from "../../components/Input";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const { user, setUser } = useAuth();

  const handlePasswordChange = (field, value) => {
    setLoading(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (field === "password") {
      setPassword(value);
    } else if (field === "confirmPassword") {
      setConfirmPassword(value);
    }

    const newTimeoutId = setTimeout(() => {
      if (field === "confirmPassword" || password) {
        if (value !== password && field === "confirmPassword") {
          setError("Both passwords must match");
        } else {
          setError("");
        }
      }
    }, 1000);

    setTimeoutId(newTimeoutId);
    setLoading(false);
  };

  const handleChangePassword = () => {
    if (password != confirmPassword) {
      Alert.alert("Error", "Your passwords are not the same.");
      return;
    }
    if (password === user.password) {
      Alert.alert("Error", "Your password cannot be the same as the previous");
      return;
    }

    //setUser({...user, password: password});
    router.back();
  };

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        <View>
          <Text style={styles.welcomeTextHeader}>Create new password</Text>
        </View>

        <Text style={styles.welcomeText}>
          Your new password must be different from the previous used passwords.
        </Text>

        <View style={styles.form}>
          <Text style={styles.smallText}>
            Please fill in your password and confirm password
          </Text>
          <Input
            icon={<Feather name="lock" size={24} color="black" />}
            placeholder="Enter your password"
            isPasswordField={true}
            value={password}
            onChangeText={(newPassword) =>
              handlePasswordChange("password", newPassword)
            }
          />
          <Input
            icon={<Feather name="lock" size={24} color="black" />}
            placeholder="Confirm your password"
            isPasswordField={true}
            value={confirmPassword}
            onChangeText={(newPassword) =>
              handlePasswordChange("confirmPassword", newPassword)
            }
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={"Change Password"}
            loading={loading}
            onPress={handleChangePassword}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  welcomeTextHeader: {
    height: hp(5.2),
    fontWeight: theme.fonts.fontWeight.bold,
    color: theme.colors.text,
    fontSize: hp(3.8),
  },
  welcomeText: {
    height: hp(5),
    color: theme.colors.text,
    marginTop: 10,
    marginBottom: 20,
  },
  smallText: {
    paddingLeft: 3,
    fontSize: hp(1.5),
    color: theme.colors.text,
  },
  form: {
    gap: 10,
  },
  errorText: {
    fontSize: hp(1.5),
    color: "red",
  },
  buttonContainer: {
    paddingTop: 30,
  },
});
