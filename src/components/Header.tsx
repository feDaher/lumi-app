import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function Header({
  title,
  showBack = false,
  left,
  right,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View className="bg-[#ff69b4] w-full pt-6 pb-4 px-5 rounded-b-3xl shadow flex-row items-center justify-between">

      {left ? (
        <View className="w-14 justify-center items-center">{left}</View>
      ) : showBack ? (
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          className="w-10 h-10 rounded-full bg-white/90 shadow justify-center items-center"
        >
          <Ionicons name="chevron-back" size={26} color="#FF1C8D" />
        </TouchableOpacity>
      ) : (
        <View className="w-10" />
      )}

      <Text
        numberOfLines={1}
        className="text-white text-xl font-bold text-center flex-1 px-2"
      >
        {title}
      </Text>

      {right ? (
        <View className="w-14 justify-center items-center">
          {right}
        </View>
      ) : (
        <View className="w-10" />
      )}
    </View>
  );
}
