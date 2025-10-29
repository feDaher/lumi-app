import { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { Stack, router } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";
import Input from "../components/Input";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signIn(email.trim(), pwd);
    } catch (e: any) {
      Alert.alert("Erro", e?.message ?? "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-[#0f0f0f] px-6">
      <Stack.Screen options={{ title: "Entrar", headerShown: true }} />

      <Text className="text-2xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
        Bem-vindo
      </Text>

      <Input
        className="w-full border border-zinc-300 dark:border-zinc-600 rounded-xl px-4 py-3 mb-3 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        className="w-full border border-zinc-300 dark:border-zinc-600 rounded-xl px-4 py-3 mb-4 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100"
        placeholder="Senha"
        secureTextEntry
        value={pwd}
        onChangeText={setPwd}
      />

      <Pressable
        onPress={handleLogin}
        disabled={loading}
        className="w-full rounded-xl px-4 py-3 items-center justify-center bg-zinc-800 dark:bg-zinc-700 mb-4 disabled:opacity-60"
      >
        <Text className="text-white font-semibold">
          {loading ? "Entrando..." : "Entrar"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/cadastrar")}
        className="w-full rounded-xl px-4 py-3 items-center justify-center bg-green-600 dark:bg-green-700"
      >
        <Text className="text-white font-semibold">Cadastrar!!!</Text>
      </Pressable>
    </View>
  );
}
