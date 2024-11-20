import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { theme } from "../../constants/theme";
import { StatusBar } from "expo-status-bar";
import BackButton from "../../components/BackButton";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { hp, wp } from "../../common";
import Input from "../../components/Input";
import Button from "../../components/Button";
import fakeLoginReponse from "../../constants/fakeLoginReponse.json";
import fakeGetUserReponse from "../../constants/fakeGetUserResponse.json";
import { decodeJwt } from "../../utils/jwtUtils";
import { useAuth } from "../../contexts/AuthContext";
import { routes } from "../../constants/routes";
import PressableOpacity from "../../components/PressableOpacity";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const router = useRouter();
  const ROUTES = routes;
  const [loading, setLoading] = useState(false);
  const { saveToken, clearToken } = useAuth();

  // Initialize React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // Validates on every change
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (formData) => {
    const { email, password } = formData;

    if (!email || !password) {
      Alert.alert("Login", "Please fill all the fields!");
      return;
    }

    try {
      setLoading(true);
      // const response = await backEnd.post("/auth/login", formData, {
      //   timeout: 5000,
      // });

      // Fake Response created using real response
      const response = fakeLoginReponse;
      if (!response || response.status !== 200) {
        throw new Error("Unexpected response code");
      }
      const jwtToken = response.body.token;
      const decodedJwt = decodeJwt(jwtToken);
      const userId = decodedJwt.payload.id;
      let userData = "";
      // In actuality, this is used to call backend again.
      if (userId) {
        const userDataResponse = fakeGetUserReponse;
        userData = userDataResponse.body;
      }

      // (To do?): Verify Jwt Signature using public key
      clearToken();
      saveToken(jwtToken, userData);
      router.replace(ROUTES.STARTING_PAGE);
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
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        <View>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please Login to continue
          </Text>

          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  icon={<Feather name="mail" size={24} color="black" />}
                  placeholder="Enter your email"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  icon={<Feather name="lock" size={24} color="black" />}
                  placeholder="Enter your password"
                  isPasswordField={true}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                {errors.password && (
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
                )}
              </>
            )}
          />

          <PressableOpacity onPress={() => router.push(ROUTES.FORGOT_PASSWORD)}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </PressableOpacity>

          <Button
            title={"Login"}
            loading={loading}
            onPress={handleSubmit(handleLogin)}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable
            onPress={() => {
              router.push(ROUTES.SIGN_UP);
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
    height: hp(5),
    fontWeight: theme.fonts.fontWeight.bold,
    color: theme.colors.text,
    fontSize: theme.fonts.fontSize["3xl"],
  },
  form: {
    gap: 15,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: theme.fonts.semibond,
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
  errorText: {
    color: theme.colors.rose,
    fontSize: hp(1.5),
  },
});
