import { Slot, Redirect } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

export default function PublicLayout() {
  const { token, isLoading } = useAuth();

  if (isLoading) return null;

  if (token) {
    return <Redirect href="/(app)/home" />;
  }

  return <Slot />;
}
