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
import fakeRegisterReponse from "../../constants/fakeRegisterReponse.json";
import { decodeJwt } from "../../utils/jwtUtils";
import { useAuth } from "../../contexts/AuthContext";
import { routes } from "../../constants/routes";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation schema using Yup
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phoneNo: yup
    .string()
    .required("Contact number is required")
    .matches(
      /^[689]\d{7}$/,
      "Contact number must be 8 digits and start with 6, 8, or 9"
    ),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/,
      "Password must be at least 8 characters long with a combination of uppercase letters, lowercase letters, numbers, and symbols"
    ),
  cfmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUp = () => {
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
      username: "",
      email: "",
      phoneNo: "",
      password: "",
      cfmPassword: "",
    },
  });

  const handleSignUp = async (formData) => {
    const { username, email, phoneNo, password, cfmPassword } = formData;

    if (!username || !email || !phoneNo || !password || !cfmPassword) {
      Alert.alert("Sign Up", "Please fill all the fields!");
      return;
    }

    try {
      setLoading(true);
      // Fake Response created using real response
      const response = fakeRegisterReponse;
      if (!response || response.status !== 201) {
        throw new Error("Unexpected response code");
      }
      const jwtToken = response.body.token;
      const decodedJwt = decodeJwt(jwtToken);
      const userData = decodedJwt.payload;
      clearToken();
      saveToken(jwtToken, userData);
      router.replace(ROUTES.STARTING_PAGE);
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            Alert.alert("Error", "Please check your input fields.");
            break;
          case 409:
            Alert.alert("Error", "This email is already registered.");
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
          <Text style={styles.welcomeText}>Let's Get Started</Text>
        </View>

        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please fill in details to create an account
          </Text>

          <Controller
            control={control}
            name="username"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  icon={<Feather name="user" size={24} color="black" />}
                  placeholder="Enter your username"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                {errors.username && (
                  <Text style={styles.errorText}>
                    {errors.username.message}
                  </Text>
                )}
              </>
            )}
          />

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
            name="phoneNo"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  icon={<Feather name="smartphone" size={24} color="black" />}
                  placeholder="Enter your phone"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                {errors.phoneNo && (
                  <Text style={styles.errorText}>{errors.phoneNo.message}</Text>
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

          <Controller
            control={control}
            name="cfmPassword"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  icon={<Feather name="lock" size={24} color="black" />}
                  placeholder="Enter your password again"
                  isPasswordField={true}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                {errors.cfmPassword && (
                  <Text style={styles.errorText}>
                    {errors.cfmPassword.message}
                  </Text>
                )}
              </>
            )}
          />

          <Button
            title={"Sign Up"}
            loading={loading}
            onPress={handleSubmit(handleSignUp)}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Have an account?</Text>
          <Pressable
            onPress={() => {
              router.push(ROUTES.LOGIN);
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
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

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
    gap: 10,
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
