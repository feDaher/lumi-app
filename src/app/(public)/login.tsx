import { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import { Stack, router } from "expo-router";
import Input from "../components/Input";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
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
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Stack.Screen options={{ title: "Entrar", headerShown: true }} />

      <Text className="text-2xl font-bold mb-6">Bem-vindo</Text>

      <Input
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-4"
        placeholder="Senha"
        secureTextEntry
        value={pwd}
        onChangeText={setPwd}
      />

      <Pressable
        onPress={handleLogin}
        disabled={loading}
        className="w-full rounded-xl px-4 py-3 items-center justify-center bg-zinc-800 mb-4 disabled:opacity-60"
      >
        <Text className="text-white font-semibold">
          {loading ? "Entrando..." : "Entrar"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/cadastrar")}
        className="w-full rounded-xl px-4 py-3 items-center justify-center bg-green-600"
      >
        <Text className="text-white font-semibold">Cadastrar</Text>
      </Pressable>
    </View>
  );
}
