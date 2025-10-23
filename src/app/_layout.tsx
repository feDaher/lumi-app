import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { AuthProvider, useAuth } from "@/src/context/AuthContext";

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
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  console.log(colorScheme);
  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <AuthProvider>
        <RootNavigationGuard />
      </AuthProvider>
    </>
  );
}
