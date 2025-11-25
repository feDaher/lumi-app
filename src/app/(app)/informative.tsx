import { View, Text, Linking, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Informative() {
  function abrirWhatsApp() {
    Linking.openURL("https://wa.me/5531994100807");
  }

  function abrirSite() {
    Linking.openURL("https://forumseguranca.org.br/iniciativas/chame-a-frida/");
  }

  return (
    <View className="flex-1 bg-[#FCEFE6]">
      
      <View className="w-full h-20 bg-[#FF4FA5] flex-row items-center justify-center px-4">
        <Text className="text-white text-lg font-bold">Informativo</Text>
      </View>

      <ScrollView className="p-4">

        <View className="bg-white rounded-2xl p-4 shadow mb-4">
          <Text className="text-[#FF4FA5] text-lg font-bold mb-2">
            Telefones de Emergência
          </Text>

          <Text className="text-gray-700 mb-1">📞 190 – Polícia Militar</Text>
          <Text className="text-gray-700 mb-1">📞 180 – Central de Atendimento à Mulher</Text>
          <Text className="text-gray-700">📞 (31) 99410-0807 – Chame a Frida (WhatsApp)</Text>

          <TouchableOpacity
            onPress={abrirWhatsApp}
            className="mt-3 bg-[#FF4FA5] px-4 py-2 rounded-xl flex-row items-center justify-center"
          >
            <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            <Text className="text-white ml-2 font-semibold">Enviar mensagem</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-2xl p-4 shadow mb-4">
          <Text className="text-[#FF4FA5] text-lg font-bold mb-2">
            Sobre Violência Contra a Mulher
          </Text>

          <Text className="text-gray-700 mb-2">
            Informações e conteúdos educativos sobre prevenção, apoio e orientação
            para mulheres em situação de violência.
          </Text>

          <TouchableOpacity
            onPress={abrirSite}
            className="bg-[#FF4FA5] px-4 py-2 rounded-xl flex-row items-center justify-center"
          >
            <Ionicons name="link" size={20} color="#fff" />
            <Text className="text-white ml-2 font-semibold">Acessar Chame a Frida</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-2xl p-4 shadow mb-4">
          <Text className="text-[#FF4FA5] text-lg font-bold mb-2">
            Notícias e Artigos
          </Text>

          <Text className="text-gray-700 mb-2">
            Em breve esta área será atualizada com notícias e artigos informativos.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}
