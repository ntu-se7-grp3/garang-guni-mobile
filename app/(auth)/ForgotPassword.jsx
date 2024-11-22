import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { hp, wp } from "../../common";
import { theme } from "../../constants/theme";
import ScreenWrapper from "../../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import BackButton from "../../components/BackButton";
import Input from "../../components/Input";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import Button from "../../components/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailChange = (field, value) => {
    if (field === "email") {
      setEmail(value);
    }
  };
  const handleSendEmail = () => {
    setLoading(true);
    // Send Email Notification here.
    Alert.alert(
      "Password Recovery",
      "If this email is registered with us, we've sent a link with instructions to recover your password. Please check your inbox and spam folder."
    );
    setLoading(false);
    router.back();
  };

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        <View>
          <Text style={styles.welcomeTextHeader}>Reset Password</Text>
        </View>

        <Text style={styles.welcomeText}>
          Enter the email associated with your account and we will send an email
          with instructions to reset your password.
        </Text>

        <View style={styles.form}>
          <Text style={styles.smallText}>Please fill in your Email.</Text>
          <Input
            icon={<Feather name="mail" size={24} color="black" />}
            placeholder="Enter your Email"
            value={email}
            onChangeText={(newEmail) => handleEmailChange("email", newEmail)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={"Send Instructions"}
            loading={loading}
            onPress={handleSendEmail}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ForgotPassword;

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
  buttonContainer: {
    paddingTop: 10,
  },
});
