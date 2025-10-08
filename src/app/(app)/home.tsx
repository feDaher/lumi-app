import { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Stack, router } from "expo-router";
import { User } from "@/src/types";

export default function Home() {
    const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await SecureStore.getItemAsync("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (e) {
        console.log("Erro ao carregar usuário", e);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("user");
    router.replace("/");
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <Stack.Screen options={{ title: "Início", headerShown: false }} />

      <Text className="text-2xl font-bold mb-4">
        Bem-vindo {user ? `, ${user.username}` : ""}!
      </Text>

      <Pressable
         onPress={() => router.push("/settings")}
         className="w-full rounded-xl px-4 py-3 items-center justify-center bg-gray-800 mb-4">
      <Text className="text-white font-semibold">Configurações</Text>
     </Pressable>


      <Pressable
        onPress={handleLogout}
        className="w-full rounded-xl px-4 py-3 items-center justify-center bg-red-600"
      >
        <Text className="text-white font-semibold">Sair</Text>
      </Pressable>
    </View>
  );
}