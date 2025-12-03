import { useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type AlertButtonProps = {
  onPress: () => void;
};

const BUTTON_SIZE = 180;

export default function AlertButton({ onPress }: AlertButtonProps) {
  const scale = useSharedValue(1);
  const wave = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.08, {
        duration: 900,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    wave.value = withRepeat(
      withTiming(1, {
        duration: 1200,
        easing: Easing.out(Easing.ease),
      }),
      -1,
      false
    );
  }, []);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const waveStyle = useAnimatedStyle(() => ({
    opacity: 1 - wave.value,
    transform: [{ scale: 1 + wave.value * 0.7 }],
  }));

  return (
    <View className="flex-1 items-center justify-center mb-20">
      <View className="items-center justify-center">
        <Animated.View
          style={[
            waveStyle,
            {
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
            },
          ]}
          className="absolute rounded-full border-2 border-red-400"
        />

        <Animated.View
          style={[
            buttonStyle,
            {
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
            },
          ]}
          className="rounded-full shadow-2xl"
        >
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            className="bg-red-600 rounded-full items-center justify-center w-full h-full"
          >
            <Text className="text-white font-bold text-lg text-center">
              ACIONAR ALERTA!
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
