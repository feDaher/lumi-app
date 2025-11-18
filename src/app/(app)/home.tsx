import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import ModalConfirm, { ConfirmOption } from "../../components/ModalConfirm"; 
import ModalSuccess from "../../components/ModalSuccess";
import AlertButton from "../../components/AlertButton";
import { useAuth } from "@/src/context/AuthContext";

const alertOptions: ConfirmOption[] = [
  {
    id: "send-location",
    label: "Enviar sua localização.",
    icon: "location-sharp",
    defaultChecked: true,
    locked: true,
  },
  {
    id: "alert-emergency-contact",
    label: "Alertar seu contato de emergência.",
    icon: "person-sharp",
  },
  {
    id: "notify-authorities",
    label: "Notificar autoridades próximas.",
    icon: "car-sport-sharp",
  },
];

export default function Home() {
  const { signOut, user } = useAuth();
  const [locationText, setLocationText] = useState<string>("Carregando localização...");
  const [formattedAddress, setFormattedAddress] = useState<string>("Carregando localização...");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false)
  const [showFullAddress, setShowFullAddress] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationText("Permissão negada");
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({});
        const address = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        if (address.length > 0) {
          const a = address[0];
          const formatted =
            `${a.district ?? ''} - ${a.region ?? ''}`;

          const formattedAddress =
          `${a.formattedAddress ?? ''}`;
          setFormattedAddress(formattedAddress);
          setLocationText(formatted || "Localização encontrada");
        } else {
          setLocationText("Localização indisponível");
        }
      } catch (e) {
        setLocationText("Erro ao buscar localização");
      }
    })();
  }, []);

  const handleAlert = () => {
    setModalVisible(true);
  };

  const handleConfirmAlert = (selectedIds: string[]) => {
    setModalVisible(false);

    console.log("ALERTA CONFIRMADO!");
    console.log("Opções selecionadas:", selectedIds);

    setTimeout(() => setModalSuccess(true), 300);
  };

  const handleCancelAlert = () => {
    setModalVisible(false);
  };

  const handleCloseSuccess = () => {
    setModalSuccess(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fdf3ea]">
      <View className="bg-[#ff69b4] w-full pt-6 pb-3 px-5 rounded-b-3xl shadow flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => signOut()}
          className="items-center"
        >
          <Ionicons name="exit-outline" size={26} color="#fff" />
          <Text className="text-white text-xs mt-1">sair</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold text-center flex-1 mr-12">
          Olá! {' '} {user?.name ?? ''}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setShowFullAddress((prev) => !prev)}
        activeOpacity={0.8}
        className="flex-row items-center bg-white rounded-full px-3 py-4 shadow mt-5 mx-5"
      >
        <Text
          className={`flex-1 text-base text-[#ff69b4] ${
            showFullAddress ? "text-left" : "text-center"
          }`}
          numberOfLines={1}
        >
          {showFullAddress ? formattedAddress : locationText}
        </Text>

        <Ionicons name="location-outline" size={24} color="#ff69b4" />
      </TouchableOpacity>

      <AlertButton onPress={handleAlert} />

      <ModalConfirm
        visible={modalVisible}
        title="Confirmação de emergência!"
        options={alertOptions}
        onCancel={handleCancelAlert}
        onConfirm={handleConfirmAlert}
      />
      
      <ModalSuccess
        visible={modalSuccess}
        title="Alerta de emergência confirmado!"
        message="Seu alerta de emergência foi enviado com sucesso."
        onClose={handleCloseSuccess}
      />
    </SafeAreaView>
  );
}
