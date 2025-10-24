import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "@/src/context/AuthContext";
import { useThemePersisted } from "@/src/hooks/useThemePersisted";

function RootNavigationGuard() {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const UNAUTH_GROUPS = new Set(["(auth)", "(public)"]);
    const currentGroup = segments?.[0] ?? "";
    const isInUnauthGroup = UNAUTH_GROUPS.has(currentGroup);

    if (!token && !isInUnauthGroup) {
      router.replace("/login");
      return;
    }
    if (token && isInUnauthGroup) {
      router.replace("/home");
      return;
    }
  }, [token, isLoading, segments, router]);

  if (isLoading || !segments) {
    return (
      <View className="flex-1 items-center justify-center bg-light dark:bg-dark">
        <ActivityIndicator />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  const { isReady, current, setTheme, toggleTheme } = useThemePersisted();

  if (!isReady) return null;

  return (
    <>
      <StatusBar style={current === "dark" ? "light" : "dark"} />

      <Pressable onPress={toggleTheme} className="absolute top-12 right-6 p-2 rounded-full bg-zinc-200 dark:bg-accent z-50">
        {
          current === "dark" 
            ? 
              <Feather name="sun" size={22} color="#facc15" /> 
            : 
              <Feather name="moon" size={22} color="#0f172a" />
        }
      </Pressable>

      <AuthProvider>
        <RootNavigationGuard />
      </AuthProvider>
    </>
  );
}
