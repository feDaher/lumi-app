import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, ScrollView } from "react-native";
import { Stack, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { v4 as uuidv4 } from "uuid";

// Para validar o email
const isValidEmail = (email: string) => /\S+@\.\S+/.test(email);

//Mascara para o CPF
const maskCPF =(cpf: string) => {
    return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export default function Cadastrar(){
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");
    const [loading, setLoading] = useState<boolean>(false);


    const handleCadastro  = async () => {
        // validação
        const cleanCpf = cpf.replace(/\D/g, "");

        if(!username || !fullName || !cpf || !email || !senha || !confirmSenha) {
            return Alert.alert("Inválido!", "Preencha todos os campos!");
        }
        if (!isValidEmail(email)) {
            return Alert.alert("Email inválido!", "tente novamente");
        }
        if (cleanCpf.length !== 11) {
            return Alert.alert("CPF precisa ter 11 dígitos");
        }
        if (senha !== confirmSenha) {
            return Alert.alert("Erro", "Senhas diferentes");
        }

        try {
            setLoading(true);

            const newUser = {
                id: uuidv4(),
                username,
                fullName,
                cpf: cleanCpf,
                email,
                senha:senha,
            };

            await SecureStore.setItemAsync("user", JSON.stringify(newUser));

            Alert.alert("Usuário Cadastrado!");
            router.replace("/"); //volta para o login
        } catch (e: any) {
            Alert.alert("Erro", e?.message ?? "Falha no cadastro");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView className="flex-1 bg-white px-6">
            <Stack.Screen options={{ title: "Cadastro de Usuário", headerShown: true}} />

            <Text className="text-2xl font-bold mt-6 mb-4 text-center">
                Criar uma conta
            </Text>

        <TextInput
         className= "w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
         placeholder="Usuário"
         value={username}
         onChangeText={setUsername}
        />

        <TextInput
         className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
         placeholder="Nome completo"
         value={fullName}
         onChangeText={setFullName}
        />

        <TextInput
         className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
         placeholder="CPF"
         keyboardType="numeric"
         maxLength={14} // formato 000.000.000-00
         value={cpf}
         onChangeText={(text) => setCpf(maskCPF(text))}
        />

        <TextInput
         className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
         placeholder="E-mail"
         keyboardType="email-address"
         autoCapitalize="none"
         value={email}
         onChangeText={setEmail}
        />

        <TextInput
         className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
         placeholder="Senha"
         secureTextEntry
         value={senha}
         onChangeText={setSenha}
        />

        <TextInput
         className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-4"
         placeholder="Confirmar Senha"
         secureTextEntry
         value={confirmSenha}
         onChangeText={setConfirmSenha}
        />

        <Pressable
         onPress={handleCadastro}
         disabled={loading}
         className="w-full rounded-xl px-4 py-3 items-center justify-center bg-green-600 mb-6"
      >
        <Text className="text-white font-semibold">
            {loading ? "Cadastrando..." : "Cadastrar"}
        </Text>
        </Pressable>
        </ScrollView>
    );
}