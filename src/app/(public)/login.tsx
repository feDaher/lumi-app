import { useState } from "react";
import { View, Text, Pressable, Alert, Image, SafeAreaView, KeyboardAvoidingView, Platform, ImageBackground } from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import { Stack, router } from "expo-router";
import Input from "../components/Input";
import { Feather } from '@expo/vector-icons';

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signIn(email.trim(), pwd);
    } catch (e: any) {
      Alert.alert("Erro", e?.message?? "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      
      source={require('@/assets/fundo.png')} 
      resizeMode="cover" 
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios'? 'padding' : 'height'}
          className="flex-1 justify-center items-center px-8"
        >
          <Stack.Screen options={{ headerShown: false }} />

          <Image
            source={require('@/src/assets/lumi-logo.png')} 
            className="w-40 h-40 mb-10"
            resizeMode="contain"
          />

          <View className="w-full mb-4">
            <Text className="text-white text-base mb-2 ml-4">E-mail</Text>
            <Input
              className="w-full bg-white/80 rounded-full px-6 py-4 text-black"
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="w-full mb-6">
            <Text className="text-white text-base mb-2 ml-4">Senha</Text>
            <View className="flex-row items-center w-full bg-white/80 rounded-full px-6">
              <Input
                className="flex-1 py-4 text-black"
                placeholder="senha"
                secureTextEntry={!isPasswordVisible}
                value={pwd}
                onChangeText={setPwd}
              />
              <Pressable onPress={() => setPasswordVisible(!isPasswordVisible)}>
                <Feather name={isPasswordVisible? "eye" : "eye-off"} size={24} color="gray" />
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={handleLogin}
            disabled={loading}
            className="w-full rounded-full py-4 items-center justify-center bg-[#6225AC] mb-10 disabled:opacity-60"
          >
            <Text className="text-white font-bold text-lg">
              {loading? "Entrando..." : "Entrar"}
            </Text>
          </Pressable>

          <Text className="text-white/90 text-base mb-4">Não possui uma conta?</Text>
          <Pressable
            onPress={() => router.push("/cadastrar")}
            className="w-full rounded-full py-4 items-center justify-center border border-white bg-transparent"
          >
            <Text className="text-white font-bold text-lg">Cadastre-se aqui</Text>
          </Pressable>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

