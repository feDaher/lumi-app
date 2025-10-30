import { useState } from "react";
import { View, Text, Pressable, Alert, Image, SafeAreaView, KeyboardAvoidingView, Platform, ImageBackground, TouchableWithoutFeedback, Keyboard } from "react-native";import { useAuth } from "@/src/context/AuthContext";
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

       <Pressable onPress={() => router.replace('/home')} className="absolute top-3 left-4 p-3">
             <Feather name="arrow-left" size={28} color="#ffffff" />
          </Pressable>

          <Image
            source={require('@/assets/logo1.png')}
            className="w-60 h-60 mb-12"
            resizeMode="contain"
          />

          <View className="w-full mb-4">
            <Text className="text-[#ffffff] text-base mb-2 ml-4">E-mail</Text>
            <Input
              style={{ backgroundColor: '#EBEDD8' }}
              className="w-full rounded-2xl px-6 py-4 text-[#313233]"
              placeholder="@ e-mail"
              placeholderTextColor="#a1a1aa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="w-full mb-6">
            <Text className="text-[#ffffff] text-base mb-2 ml-4">Senha</Text>
            <View style={{ backgroundColor: '#EBEDD8' }} className="flex-row items-center w-full rounded-2xl px-6">
              <Input
                className="flex-1 py-4 text-[#313233]"
                placeholder="senha"
                placeholderTextColor="#a1a1aa"
                secureTextEntry={!isPasswordVisible}
                value={pwd}
                onChangeText={setPwd}
              />
              <Pressable onPress={() => setPasswordVisible(!isPasswordVisible)}>
                <Feather name={isPasswordVisible? "eye" : "eye-off"} size={24} color="#313233" />
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={handleLogin}
            disabled={loading}
            // ALTERADO: py-4 virou py-3 (menor) e rounded-2xl virou rounded-full (mais redondo)
            className="w-60 rounded-full py-2 items-center justify-center bg-[#6225AC] mb-8 disabled:opacity-60 border border-white"
          >
            <Text className="text-[#ffffff] font-bold text-base">
              {loading? "Entrando..." : "Entrar"}
            </Text>
          </Pressable>

          <Text className="text-[#ffffff]/90 text-base mb-4">Não possui uma conta?</Text>
          <Pressable
            onPress={() => router.push("/cadastrar")}
            style={{ backgroundColor: '#EBEDD8' }}
            // ALTERADO: py-3 virou py-2 (menor) e rounded-2xl virou rounded-full (mais redondo)
            className="w-60 rounded-full py-2 items-center mb-3 justify-center"
          >
            <Text className="text-[#313233] font-bold text-base">Cadastre-se aqui</Text>
          </Pressable>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}