import { CameraView, useCameraPermissions } from "expo-camera";
import { Alert, StyleSheet, View } from "react-native";
import { useState, useRef } from "react";
import * as MediaLibrary from "expo-media-library";
import { theme } from "../../constants/theme";
import { hp } from "../../common";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import PressableOpacity from "../../components/PressableOpacity";
import { useRouter } from "expo-router";

function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState("back");
  const router = useRouter();

  if (!permission) {
    return <View />;
  }

  const alertPermissionRequired = (text, onPress) => {
    Alert.alert("Permission Required", text, [
      {
        text: "Head Back",
        style: "cancel",
        onPress: () => {
          router.back();
        },
      },
      {
        text: "Allow",
        onPress: onPress,
      },
    ]);
  };

  if (!permission.granted) {
    const permissionRequiredText =
      "In order to use this feature, camera permission is required";
    const onPress = async () => {
      const permissionResponse = await requestPermission();
    };
    alertPermissionRequired(permissionRequiredText, onPress);
    return <View></View>;
  }

  if (!mediaPermission?.granted) {
    const permissionRequiredText =
      "In order to use this feature, storage permission is required";
    const onPress = async () => {
      const permissionResponse = await requestMediaPermission();
    };
    alertPermissionRequired(permissionRequiredText, onPress);
    return <View></View>;
  }

  const toggleCameraFacing = () => {
    setFacing((current) => {
      return current == "back" ? "front" : "back";
    });
  };

  const takePhoto = async () => {
    const options = {
      base64: true,
      exif: false,
    };

    const cameraViewObj = cameraRef.current;
    if (cameraViewObj) {
      const photo = await cameraViewObj.takePictureAsync(options);
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      alert("Photo saved to gallery!");
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.topContainer}>
          <PressableOpacity
            onPress={() => {
              toggleCameraFacing();
            }}
            activeOpacity={0.5}
            style={[styles.button, styles.shadowStyle]}
          >
            <Ionicons name="swap-horizontal-sharp" size={24} color="white" />
          </PressableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <PressableOpacity
            onPress={async () => {
              await takePhoto();
            }}
            activeOpacity={0.5}
            style={[styles.takePhotoButton, styles.shadowStyle]}
          >
            <Entypo name="circle" size={hp(6.5)} color="white" />
          </PressableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    height: hp(6),
    width: hp(6),
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.primary70Opacity,
  },
  takePhotoButton: {
    height: hp(8),
    width: hp(8),
    borderRadius: hp(8) / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
  },
  topContainer: {
    position: "absolute",
    top: hp(5),
    right: hp(2),
  },
  bottomContainer: {
    position: "absolute",
    bottom: hp(4),
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
  },
  shadowStyle: {
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRaidus: 8,
    elevation: 4,
  },
});
