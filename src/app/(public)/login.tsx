import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import { Stack, router } from "expo-router";
import Input from "../../components/Input";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboardInset } from "@/src/hooks/useKeyboardInset";
import { useMessage } from "@/src/context/MessageContext";

export default function Login() {
  const { signIn } = useAuth();
  const { showMessage } = useMessage();
  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const insets = useSafeAreaInsets();
  const keyboardBottom = useKeyboardInset();
  const keyboardOffset = insets.top + 12;

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!email.trim()) {
        showMessage({ type: "warning", text: "Informe o e-mail" });
        return;
      }

      if (!pwd) {
        showMessage({ type: "warning", text: "Informe a senha" });
        return;
      }
      await signIn(email.trim(), pwd);
      showMessage({
        type: "success",
        text: "Bem-vindo de volta 👋",
      });
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Falha no login, tente novamente";

      showMessage({
        text: msg,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/fundo.png')}
      resizeMode='cover'
      className='flex-1'
    >
      <SafeAreaView className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={keyboardOffset}
            className="flex-1"
          >
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 32,
                paddingBottom: Math.max(keyboardBottom - insets.bottom, 0),
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Stack.Screen options={{ headerShown: false }} />

              <Image
                source={require("@/assets/logo1.png")}
                className="w-60 h-60 mb-12"
                resizeMode="contain"
              />

              <View className="w-full mb-4">
                <Text className="text-[#ffffff] text-base mb-2 ml-4">E-mail</Text>
                <Input
                  style={{ backgroundColor: "#EBEDD8" }}
                  className="w-full rounded-2xl px-6 py-4 text-[#313233]"
                  placeholder="@ e-mail"
                  placeholderTextColor="#a1a1aa"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  returnKeyType="next"
                />
              </View>

              <View className="w-full mb-6">
                <Text className="text-[#ffffff] text-base mb-2 ml-4">Senha</Text>
                <View
                  style={{ backgroundColor: "#EBEDD8" }}
                  className="flex-row items-center w-full rounded-2xl px-6"
                >
                  <Input
                    className="flex-1 py-4 text-[#313233]"
                    placeholder="senha"
                    placeholderTextColor="#a1a1aa"
                    secureTextEntry={!isPasswordVisible}
                    value={pwd}
                    onChangeText={setPwd}
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                  />
                  <Pressable onPress={() => setPasswordVisible((v) => !v)} hitSlop={8}>
                    <Feather
                      name={isPasswordVisible ? "eye" : "eye-off"}
                      size={24}
                      color="#313233"
                    />
                  </Pressable>
                </View>
              </View>

              <Pressable
                onPress={handleLogin}
                disabled={loading}
                className="w-60 rounded-full py-2 items-center justify-center bg-[#6225AC] mb-8 disabled:opacity-60 border border-white"
              >
                <Text className="text-[#ffffff] font-bold text-base">
                  {loading ? "Entrando..." : "Entrar"}
                </Text>
              </Pressable>

              <Text className="text-[#ffffff]/90 text-base mb-4">
                Não possui uma conta?
              </Text>
              <Pressable
                onPress={() => router.push("/cadastrar")}
                style={{ backgroundColor: "#EBEDD8" }}
                className="w-60 rounded-full py-2 items-center mb-3 justify-center"
              >
                <Text className="text-[#313233] font-bold text-base">
                  Cadastre-se aqui
                </Text>
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ImageBackground>
  );
}
