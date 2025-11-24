import { Slot } from "expo-router";
import { AuthProvider } from "@/src/context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { useThemePersisted } from "@/src/hooks/useThemePersisted";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function RootLayout() {
  const { isReady, current, toggleTheme } = useThemePersisted();

  if (!isReady) return null;

  return (
    <AuthProvider>
      <StatusBar style={current === "dark" ? "light" : "dark"} />

      <Pressable
        onPress={toggleTheme}
        className="absolute top-8 right-4 p-2 rounded-full bg-zinc-200 dark:bg-accent z-50"
      >
        {current === "dark"
          ? <Feather name="sun" size={22} color="#facc15" />
          : <Feather name="moon" size={22} color="#0f172a" />
        }
      </Pressable>

      <Slot />
    </AuthProvider>
  );
}
