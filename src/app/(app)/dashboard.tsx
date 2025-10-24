import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import ModalConfirm, { ConfirmOption } from "../components/ModalConfirm";
import ModalSuccess from "../components/ModalSuccess";

export default function Dashboard() {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [successOpen, setSuccessOpen] = useState<boolean>(false);

  // OPÇÕES:
const options: ConfirmOption[] = [
  { id: "send_location", label: "Enviar sua localização.", icon: "location-outline", locked: true }, // sempre selecionada
  { id: "alert_contact", label: "Alertar seu contato de emergência.", icon: "person-outline", defaultChecked: true },
  { id: "notify_authority", label: "Notificar autoridades próximas.", icon: "warning-outline", defaultChecked: true },
];

  
  // o que acontece ao confirmar
  const handleConfirm = (selected: string[]) => {
    setConfirmOpen(false);

    // SELEÇÕES:
    if (selected.includes("send_location")) {
      console.log("Enviando localização...");
    }
    if (selected.includes("alert_contact")) {
      console.log("Alertando contato de emergência...");
    }
    if (selected.includes("notify_authority")) {
      console.log("Notificando autoridades...");
    }

    // abre o modal de sucesso depois
    setSuccessOpen(true);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold mb-6">Bem-vindo(a) 👋</Text>

      {/* Botão principal para abrir o modal */}
<Pressable
  onPress={() => setConfirmOpen(true)}
  className="h-20 w-64 rounded-full bg-rose-600 items-center justify-center shadow-md"
>
  <Text className="text-white font-extrabold text-lg uppercase tracking-wide">
    ACIONAR ALARME!
  </Text>
</Pressable>
     {/* Modal de confirmação */}
      <ModalConfirm
        visible={confirmOpen}
        options={options}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
      />

      {/* Modal de sucesso */}
      <ModalSuccess
        visible={successOpen}
        onClose={() => setSuccessOpen(false)}
      />
    </View>
  );
}
