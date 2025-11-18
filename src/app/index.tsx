import { Redirect } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

export default function Index() {
  const { token, isLoading } = useAuth();
  console.log(token);
  if (isLoading) return null;

  if (token) {
    return <Redirect href="/(app)/home" />;
  }

  return <Redirect href="/(public)/splash" />;
}
