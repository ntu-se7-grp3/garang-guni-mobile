import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { theme } from "../../constants/theme";
import { StatusBar } from "expo-status-bar";
import BackButton from "../../components/BackButton";
import Feather from "@expo/vector-icons/Feather";
import { Link, useRouter } from "expo-router";
import { hp, wp } from "../../common";
import Input from "../../components/Input";
import Button from "../../components/Button";
import fakeLoginResponse from "../../constants/fakeLoginResponse.json";
import fakeGetUserResponse from "../../constants/fakeGetUserResponse.json";
import { decodeJwt } from "../../utils/jwtUtils";
import { useAuth } from "../../contexts/AuthContext";
import { routes } from "../../constants/routes";
import PressableOpacity from "../../components/PressableOpacity";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { saveToken, clearToken } = useAuth();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Login", "Please fill all the fields!");
      return;
    }

    const formData = {
      email,
      password,
    };

    try {
      setLoading(true);
      // const response = await backEnd.post("/auth/login", formData, {
      //   timeout: 5000,
      // });

      // Fake Response created using real response
      const response = fakeLoginResponse;
      if (!response || response.status !== 200) {
        throw new Error("Unexpected response code");
      }
      const jwtToken = response.body.token;
      const decodedJwt = decodeJwt(jwtToken);
      let userData = {};
      const userId = decodedJwt.payload.id;
      if (userId) {
        const userDataResponse = fakeGetUserResponse;
        userData = userDataResponse.body;
      }
      // (To do?): Verify Jwt Signature using public key
      clearToken();
      saveToken(jwtToken, userData);
      router.replace(routes.STARTING_PAGE);
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            Alert.alert("Error", "Please check your input fields.");
            break;
          case 500:
            Alert.alert(
              "Error",
              "Something went wrong. Please try again later."
            );
            break;
          default:
            Alert.alert(
              "Error",
              "An unknown error occurred. Please try again."
            );
        }
      } else {
        Alert.alert("Error", "Network error or server unreachable.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <StatusBar backgroundColor={theme.colors.primary} />
      <View style={styles.container}>
        <BackButton router={router} />

        <View>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please Login to continue
          </Text>
          <Input
            icon={<Feather name="mail" size={24} color="black" />}
            placeholder="Enter your email"
            onChangeText={(newEmail) => setEmail(newEmail)}
          />

          <Input
            icon={<Feather name="lock" size={24} color="black" />}
            placeholder="Enter your password"
            isPasswordField={true}
            onChangeText={(newPassword) => setPassword(newPassword)}
          />
          <PressableOpacity onPress={() => router.push(routes.FORGOT_PASSWORD)}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </PressableOpacity>

          <Button title={"Login"} loading={loading} onPress={handleLogin} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Dont have an account?</Text>
          <Pressable
            onPress={() => {
              router.push(routes.SIGN_UP);
            }}
          >
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.primaryDark,
                  fontWeight: theme.fonts.fontWeight.semibold,
                },
              ]}
            >
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  welcomeText: {
    height: hp(5.2),
    fontWeight: theme.fonts.fontWeight.bold,
    color: theme.colors.text,
    fontSize: hp(3.8),
  },
  form: {
    gap: 15,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: theme.fonts.fontWeight.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
