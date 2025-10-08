import { useState } from "react";
import { View, Text, Pressable, Alert, ScrollView } from "react-native";
import { Stack, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { v4 as uuidv4 } from "uuid";
import Input from "../components/Input";
import { isValidEmail, maskCPF }  from "../../utils";

export default function Cadastrar() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCadastro = async () => {
    const cleanCpf = cpf.replace(/\D/g, "");

    if (!username || !fullName || !cpf || !email || !senha || !confirmSenha) {
      return Alert.alert("Inválido!", "Preencha todos os campos!");
    }
    if (!isValidEmail(email)) {
      return Alert.alert("Email inválido!", "Tente novamente.");
    }
    if (cleanCpf.length !== 11) {
      return Alert.alert("Inválido!", "O CPF precisa ter 11 dígitos.");
    }
    if (senha !== confirmSenha) {
      return Alert.alert("Erro", "As senhas não conferem.");
    }

    try {
      setLoading(true);

      const newUser = {
        id: uuidv4(),
        username,
        fullName,
        cpf: cleanCpf,
        email,
        senha,
      };

      await SecureStore.setItemAsync("user", JSON.stringify(newUser));

      Alert.alert("Sucesso", "Usuário cadastrado!");
      router.replace("/");
    } catch (e: any) {
      Alert.alert("Erro", e?.message ?? "Falha no cadastro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-6">
      <Stack.Screen options={{ title: "Cadastro de Usuário", headerShown: true }} />

      <Text className="text-2xl font-bold mt-6 mb-4 text-center">
        Criar uma conta
      </Text>

      <Input
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <Input
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
        placeholder="Nome completo"
        value={fullName}
        onChangeText={setFullName}
      />

      <Input
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
        placeholder="CPF"
        keyboardType="numeric"
        maxLength={14}
        value={cpf}
        onChangeText={(text) => setCpf(maskCPF(text))}
      />

      <Input
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Input
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-4"
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmSenha}
        onChangeText={setConfirmSenha}
      />

      <Pressable
        onPress={handleCadastro}
        disabled={loading}
        className="w-full rounded-xl px-4 py-3 items-center justify-center bg-green-600 mb-6 disabled:opacity-60"
      >
        <Text className="text-white font-semibold">
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Text>
      </Pressable>

      <View className="h-6" />
    </ScrollView>
  );
}
