import { TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { Feather } from "@expo/vector-icons";

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      onPress={toggleColorScheme}
      className="p-2 rounded-full bg-accent/20 absolute top-12 right-6"
    >
      {colorScheme === "dark" ? (
        <Feather name="sun" size={24} color="#FFFDD0" />
      ) : (
        <Feather name="moon" size={24} color="#111" />
      )}
    </TouchableOpacity>
  );
}
