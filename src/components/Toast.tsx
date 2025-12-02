import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
import { useMessage } from "@/src/context/MessageContext";
import { Ionicons } from "@expo/vector-icons";

type MessageType = "success" | "error" | "warning" | "info";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Toast() {
  const { message, clearMessage } = useMessage();
  const [fadeAnim] = useState(new Animated.Value(0));

  const icons = {
    success: "checkmark-circle",
    error: "close-circle",
    warning: "warning",
    info: "information-circle",
  } as const;

  const colors = {
    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  } as const;

  useEffect(() => {
    if (!message) return;

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => closeToast(), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  function closeToast() {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => clearMessage());
  }

  if (!message) return null;

  return (
    <AnimatedView
      className="absolute self-center min-w-[90%] max-w-[90%] bg-white py-3 px-4 rounded-xl flex-row items-center shadow-md border border-gray-200"
      style={{
        opacity: fadeAnim,
        borderLeftColor: colors[message.type],
        borderLeftWidth: 8,
        top: (StatusBar.currentHeight || 0) + 10,
        zIndex: 999,
        elevation: 8,
      }}
    >
      <View className="mr-4">
        <Ionicons
          name={icons[message.type]}
          size={36}
          color={colors[message.type]}
        />
      </View>

      <View className="flex-1">
        <Text className="text-gray-900 font-bold text-[15px] mb-0.5">
          {message.type === "success" && "Sucesso"}
          {message.type === "error" && "Erro"}
          {message.type === "warning" && "Aviso"}
          {message.type === "info" && "Info"}
        </Text>

        <Text className="text-gray-500 text-[15px] font-medium">
          {message.text}
        </Text>
      </View>

      <TouchableOpacity onPress={closeToast} className="ml-2 p-1">
        <Ionicons name="close" size={20} color="#444" />
      </TouchableOpacity>
    </AnimatedView>
  );
}
