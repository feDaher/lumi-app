import React from "react";
import { Modal, View, Text, Pressable } from "react-native";

type Props = {
  visible: boolean;                  
  title: string;
  message?: string;
  buttonText?: string;
  onClose?: () => void;
};

export default function ModalSuccess({
  visible,
  title = "Alerta de emergência confirmado!",
  message = "Seu alerta de emergência foi enviado com sucesso.",
  buttonText = "Fechar",
  onClose,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View className="flex-1 bg-black/50 items-center justify-center px-4">
        <View className="w-full max-w-md rounded-2xl bg-white px-5 pt-6 pb-4 items-center">
          <Text className="text-center text-base font-bold mb-3">{title}</Text>
          <Text className="text-center text-[15px] text-neutral-700 mb-5">{message}</Text>
          <Pressable
            onPress={onClose}
            className="h-10 px-6 rounded-full bg-rose-400 items-center justify-center"
          >
            <Text className="text-white font-medium">{buttonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
