import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "@/src/context/AuthContext";

function RootNavigationGuard() {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isLoading || !segments) return;

    const UNAUTH_GROUPS = new Set(["(auth)", "(public)"]);

    const currentGroup = segments[0] ?? "";
    const isInUnauthGroup = UNAUTH_GROUPS.has(currentGroup);

    if (!token && !isInUnauthGroup) {
      router.replace("/splash");
      return;
    }

    if (token && isInUnauthGroup) {
      router.replace("/index");
      return;
    }
  }, [token, isLoading, segments, router]);

  if (isLoading || !segments) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigationGuard />
    </AuthProvider>
  );
}
