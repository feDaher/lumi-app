import { View, ActivityIndicator, Pressable } from "react-native";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/src/context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { useThemePersisted } from "@/src/hooks/useThemePersisted";
import { Feather } from "@expo/vector-icons";
import { MessageProvider } from "../context/MessageContext";
import Toast from "../components/Toast";
import { useEffect, useState } from "react";

function RootNavigationGuard() {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isLoading || !segments) return;

    const UNAUTH_GROUPS = new Set(["(auth)", "(public)"]);
    const currentGroup = segments?.[0] ?? "";
    const isInUnauthGroup = UNAUTH_GROUPS.has(currentGroup);

    if (!token && !isInUnauthGroup) {
      router.replace("/splash");
      return;
    }
    if (token && isInUnauthGroup) {
      router.replace("/(app)/home");
      return;
    }

    setReady(true);
  }, [token, isLoading, segments, router]);

  if (isLoading || !ready) {
    return (
      <View className="flex-1 items-center justify-center bg-light dark:bg-dark">
        <ActivityIndicator />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  const { isReady, current, toggleTheme } = useThemePersisted();

  if (!isReady) return null;

  return (
    <>
      <AuthProvider>
        <StatusBar style={current === "dark" ? "light" : "dark"} />

        <Pressable
          onPress={toggleTheme}
          className="absolute top-9 right-6 p-2 rounded-full bg-zinc-200 dark:bg-accent z-50"
        >
          {current === "dark" ? (
            <Feather name="sun" size={22} color="#facc15" />
          ) : (
            <Feather name="moon" size={22} color="#0f172a" />
          )}
        </Pressable>
          <MessageProvider>
            <Toast />
            <RootNavigationGuard />
          </MessageProvider>
      </AuthProvider>
    </>
  );
}
