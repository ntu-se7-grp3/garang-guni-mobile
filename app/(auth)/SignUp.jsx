import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
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

const SignUp = () => {
  const router = useRouter();
  const ROUTES = routes;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNo: "",
    password: "",
    cfmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    phoneNo: "",
    password: "",
    cfmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const { saveToken, clearToken } = useAuth();

  const handleChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSignUp = async () => {
    const errorMsgArr = [];
    for (const [key, value] of Object.entries(formData)) {
      if (value === "") {
        errorMsgArr.push(`${key}`);
      }
    }

    if (errorMsgArr) {
      const allErrors = errorMsgArr.join(",");
      Alert.alert(`The field "${allErrors}" cannot be empty.`);
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

          <Input
            icon={<Feather name="user" size={24} color="black" />}
            placeholder="Enter your username"
            onChangeText={(username) => handleChange("username", username)}
          />

          <Input
            icon={<Feather name="mail" size={24} color="black" />}
            placeholder="Enter your email"
            onChangeText={(email) => handleChange("email", email)}
          />

          <Input
            icon={<Feather name="smartphone" size={24} color="black" />}
            placeholder="Enter your phone"
            onChangeText={(phoneNo) => handleChange("phoneNo", phoneNo)}
          />

          <Input
            icon={<Feather name="lock" size={24} color="black" />}
            placeholder="Enter your password"
            isPasswordField={true}
            onChangeText={(password) => handleChange("password", password)}
          />

          <Input
            icon={<Feather name="lock" size={24} color="black" />}
            placeholder="Enter your password again"
            isPasswordField={true}
            onChangeText={(cfmPassword) =>
              handleChange("cfmPassword", cfmPassword)
            }
          />

          <Button title={"Sign Up"} loading={loading} onPress={handleSignUp} />
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
});
