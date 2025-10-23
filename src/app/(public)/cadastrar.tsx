import { use, useState } from "react";
import { View, Text, Alert, Pressable, ScrollView, ImageBackground, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { Stack, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import  uuid  from "react-native-uuid";
import Input from "../components/Input";
import { isValidEmail, maskCPF }  from "../../utils";
import { Feather } from "@expo/vector-icons";

export default function Cadastrar() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdConfirm, setShowPwdConfirm] = useState(false);

  const handleCadastro = async () => {
    const cleanCpf = cpf.replace(/\D/g, "");

    if (!fullName || !cpf || !email || !senha || !confirmSenha) {
      return Alert.alert("Inválido!", "Preencha todos os campos!");
    }
    if (!isValidEmail(email)) {
      return Alert.alert("Email inválido!", "Tente novamente.");
    }
    if (cleanCpf.length !== 11) {
      return Alert.alert("Inválido!", "O CPF precisa ter 11 dígitos.");
    }
    if (senha.length < 6) {
      return Alert.alert("Erro", "Senha muito fraca!")
    }
    if (senha !== confirmSenha) {
      return Alert.alert("Erro", "As senhas não conferem.");
    }


    try {
      setLoading(true);

      const newUser = {
        id: uuid.v4(),
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
  <KeyboardAvoidingView
    style={{ flex: 1}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
  <ImageBackground
      source={require("assets/fundo.png")}
      className="flex-1"  
      resizeMode="cover"
    >
    <View style={{ alignItems: "center", marginTop: 140, marginBottom: -250 }}>
      <Image
        source={require("assets/logo1.png")}
        style={{width:120, height: 120}}
      />
    </View>

    <Pressable
      onPress={() => router.back()}
      style={{
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 10,
        padding: 5,
        backgroundColor: "#ffffff",
        borderRadius: 20
      }}
      >
      <Feather name="arrow-left" size={28} color="#313233"/>
    
    </Pressable>

    <ScrollView 
        style={{ 
          flex: 1
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 300,
          alignItems: "center"
        }}> 
  
      <View
       className="bg-cream rounded-t-[60px] p-10 w-full max-h-[900px] self-center"
      >

      <Input
        className="w-full bg-white border-zinc-300 rounded-xl px-4 py-3 mb-6 mt-4"
        placeholder="Nome Completo"
        value={fullName}
        onChangeText={setFullName}
        autoCapitalize="none"
      />

      <Input
        className="w-full bg-white border-zinc-300 rounded-xl px-4 py-3 mb-6"
        placeholder="CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={(text) => setCpf(maskCPF(text))}
      />

      <Input
        className="w-full bg-white border-zinc-300 rounded-xl px-4 py-3 mb-6"
        placeholder="@ E-mail"
        keyboardType="email-address"
        maxLength={100}
        value={email}
        onChangeText={setEmail}
      />

    <View className="w-full bg-white border-zinc-300 rounded-xl px-2 py-1 mb-6">
      <Input
        placeholder="Crie sua senha"
        autoCapitalize="none"
        secureTextEntry={!showPwd}
        maxLength={256}
        value={senha}
        onChangeText={setSenha}

      />

      <Pressable onPress={()=> setShowPwd(!showPwd)} className="absolute right-6 top-3">
        < Feather
          name={showPwd ? "eye" : "eye-off"}
          size={24}
          color={"#313233ff"}
        />
      </Pressable>
    </View>
    
    <View className="w-full bg-white border-zinc-300 rounded-xl px-2 py-1 mb-10">
      <Input
        placeholder="Repita sua senha"
        autoCapitalize="none"
        secureTextEntry={!showPwdConfirm}
        value={confirmSenha}
        onChangeText={setConfirmSenha}
      />

      <Pressable onPress={()=> setShowPwdConfirm(!showPwdConfirm)} className="absolute right-6 top-3">
        < Feather
          name={showPwdConfirm ? "eye" : "eye-off"}
          size={24}
          color={"#313233ff"}
        />
      </Pressable>
    </View>

      <TouchableOpacity
        onPress={handleCadastro}
        disabled={loading}
        className="w-32 rounded-xl px-1 py-3 items-center justify-center bg-white mb-6 disabled:opacity-60 self-center shadow-md"
      >
        <Text className="text-black font-semibold">
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        disabled={loading}
        className="w-32 rounded-xl px-1 py-3 items-center justify-center mb-6 disabled:opacity-60 self-center"
        >
          <Text className="text-black font-semibold">
            {loading ? "Cancelando..." : "Cancelar"}
          </Text>
        </TouchableOpacity>

      <View className="h-6" />
      </View>    
    </ScrollView>
  </ImageBackground>
</KeyboardAvoidingView>
  );
}
