import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useLocationGate } from "@/src/hooks/useLocation";
import { useMemo } from "react";

export default function Welcome() {
  const router = useRouter();
  const { status } = useLocationGate(true);

  const canProceed = status === "granted";

  return (
    <ImageBackground
      source={require("../../../assets/fundo.png")}
      resizeMode="cover"
      className="flex-1 justify-between items-center"
      accessible
      accessibilityLabel="Tela de boas-vindas com imagem de fundo"
    >
      <View className="items-center mt-20">
        <Image
          source={require("../../../assets/logo-lotus.png")}
          className="w-58 h-58 mb-0"
          resizeMode="contain"
          accessibilityIgnoresInvertColors
          accessibilityLabel="Logomarca"
        />
      </View>

      <View className="items-center mb-12 relative w-full">
        <Image
          source={require("../../../assets/logo-texto.png")}
          className="w-56 h-56 opacity-70 absolute bottom-0"
          resizeMode="contain"
          accessibilityLabel="Texto da marca"
        />

        <TouchableOpacity
          onPress={() => router.push("/(public)/login")}
          disabled={!canProceed}
          className="px-6 py-2 rounded-full border border-white shadow-md absolute bottom-16"
          style={{ backgroundColor: "#5A1096", opacity: 0.75, zIndex: 1 }}
          accessibilityRole="button"
          accessibilityState={{ disabled: !canProceed }}
          accessibilityLabel={canProceed ? "Entrar" : "Aguardando permissão de localização"}
        >
          <Text className="text-white font-semibold text-lg">
            {canProceed ? "ENTRAR" : "AGUARDE…"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
