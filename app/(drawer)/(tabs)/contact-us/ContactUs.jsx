import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { theme } from "../../../../constants/theme";
import { hp } from "../../../../common";

const { width: screenWidth } = Dimensions.get("window");

const ContactUs = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  useFocusEffect(
    useCallback(() => {
      navigation.closeDrawer();
    }, [navigation])
  );

  const validateInputs = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email))
        newErrors.email = "Enter a valid email address.";
    }
    if (!subject.trim()) newErrors.subject = "Subject is required.";
    if (!message.trim()) {
      newErrors.message = "Message is required.";
    } else if (message.length > 100) {
      newErrors.message = "Message cannot exceed 100 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendMessage = () => {
    if (!validateInputs()) {
      return; // Do not proceed if validation fails
    }

    Alert.alert(
      "Thank You!",
      "Thanks for reaching out! We’ll get back to you as soon as possible."
    );

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setErrors({});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CONTACT US</Text>
      <Text style={styles.subtitle}>
        Call or Whatsapp us at <Text style={styles.highlight}>8888 8888</Text>
      </Text>
      <Text style={{ fontFamily: "System", fontSize: 16 }}>
        Mon-Fri (9am-6pm)
      </Text>
      <Text style={{ fontFamily: "System", fontSize: 16 }}>
        Saturday (9am-12pm)
      </Text>

      <Text style={styles.sectionTitle}>OR DROP US AN EMAIL</Text>

      {/* Name Input */}
      <View>
        <Input
          placeholder="Name *"
          value={name}
          onChangeText={setName}
          containerStyles={[
            styles.input,
            errors.name ? styles.errorInput : null,
          ]}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      {/* Email Input */}
      <View>
        <Input
          placeholder="Email Address *"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          containerStyles={[
            styles.input,
            errors.email ? styles.errorInput : null,
          ]}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Subject Input */}
      <View>
        <Input
          placeholder="Subject *"
          value={subject}
          onChangeText={setSubject}
          containerStyles={[
            styles.input,
            errors.subject ? styles.errorInput : null,
          ]}
        />
        {errors.subject && (
          <Text style={styles.errorText}>{errors.subject}</Text>
        )}
      </View>

      {/* Message Input */}
      <View>
        <Input
          placeholder="Message (max 100 characters) *"
          value={message}
          onChangeText={setMessage}
          multiline={true}
          numberOfLines={4}
          containerStyles={[
            styles.input,
            styles.textArea,
            errors.message ? styles.errorInput : null,
          ]}
        />
        {errors.message && (
          <Text style={styles.errorText}>{errors.message}</Text>
        )}
      </View>
      <View style={styles.requiredNoteContainer}>
        <Text style={styles.requiredNote}>* indicates required field</Text>
      </View>
      <Button
        key="send-message"
        buttonStyle={[styles.button, { width: "80%" }]}
        title="Send Message"
        onPress={handleSendMessage}
        textStyle={styles.text}
        loading={false}
        hasShadow={true}
      />
    </ScrollView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.whiteGreen,
    padding: 20,
    alignItems: "center",
    flexGrow: 1,
  },
  title: {
    fontSize: hp(3),
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: hp(2),
    color: "#333",
    textAlign: "center",
  },
  highlight: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    marginVertical: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 5,
  },
  textArea: {
    height: 100,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: hp(1.5),
    marginLeft: 10,
    marginBottom: 10,
  },
  requiredNote: {
    fontSize: hp(1.5),
    color: "#555",
    textAlign: "center",
  },
});
