import { useCallback, useRef } from "react";
import { Pressable, Animated } from "react-native";

const PressableOpacity = ({
  children,
  style,
  activeOpacity,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const animated = useRef(new Animated.Value(1)).current;

  const styleWithOpacity = useCallback(
    ({ pressed }) => [{ opacity: pressed ? activeOpacity : 1 }, style && style],
    [style]
  );

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.7,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressIn = (fn) => {
    fadeIn();
    onPressIn && onPressIn(fn);
  };

  const handlePressOut = (fn) => {
    fadeOut();
    onPressOut && onPressOut(fn);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styleWithOpacity}
      {...props}
    >
      <Animated.View style={{ opacity: animated }}>{children}</Animated.View>
    </Pressable>
  );
};

export default PressableOpacity;
