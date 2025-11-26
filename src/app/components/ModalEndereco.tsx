import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";

type Props = {
  visible: boolean;
  onCancel?: () => void;
  onConfirm?: (data: {
    logradouro: string;
    numero: string | null;
    semNumero: boolean;
    cep: string;
    bairro: string;
    complemento: string;
  }) => void;
};

function maskCEP(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
}

function isValidCEP(cep: string) {
  return /^[0-9]{5}-[0-9]{3}$/.test(cep);
}

export default function ModalEndereco({ visible, onCancel, onConfirm }: Props) {
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [semNumero, setSemNumero] = useState(false);
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cepError, setCepError] = useState("");

  const handleCEPChange = (text: string) => {
    const masked = maskCEP(text);
    setCep(masked);

    if (masked.length === 9 && !isValidCEP(masked)) {
      setCepError("CEP inválido");
    } else {
      setCepError("");
    }
  };

  const handleConfirm = () => {
    if (!isValidCEP(cep)) {
      setCepError("CEP inválido");
      return;
    }

    onConfirm?.({
      logradouro,
      numero: semNumero ? null : numero,
      semNumero,
      cep,
      bairro,
      complemento,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View className="flex-1 bg-black/50 items-center justify-center px-6">
        <View className="w-full max-w-md bg-white py-6 px-5 rounded-2xl">

          <Text className="text-center font-bold text-lg mb-4">
            Complete seu Endereço!
          </Text>
          {}
          <TextInput
            placeholder="Logradouro"
            value={logradouro}
            onChangeText={setLogradouro}
            className="w-full bg-neutral-100 rounded-full px-4 py-3 mb-3"
          />

          {}
          <View className="flex-row w-full items-center justify-between mb-3">
            {}
            <TextInput
              placeholder="Nº"
              editable={!semNumero}
              value={semNumero ? "" : numero}
              onChangeText={setNumero}
              keyboardType="numeric"
              className={`flex-1 bg-neutral-100 rounded-full px-4 py-3 mr-2 ${
                semNumero ? "opacity-40" : ""
              }`}
            />

            {}
            <TouchableOpacity
              onPress={() => setSemNumero((p) => !p)}
              className="flex-row items-center mr-2"
            >
              <View
                className={`h-5 w-5 rounded-md border mr-1 items-center justify-center ${
                  semNumero
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-neutral-400 bg-white"
                }`}
              >
                {semNumero && <Text className="text-white text-xs">✓</Text>}
              </View>
              <Text>S/N</Text>
            </TouchableOpacity>

            {}
            <View className="flex-1">
              <TextInput
                placeholder="CEP"
                value={cep}
                onChangeText={handleCEPChange}
                keyboardType="numeric"
                className={`bg-neutral-100 rounded-full px-4 py-3
                  ${cepError ? "border border-rose-500" : ""}
                `}
              />
              {cepError ? (
                <Text className="text-rose-600 text-xs mt-1 ml-2">
                  {cepError}
                </Text>
              ) : null}
            </View>
          </View>

          {}
          <TextInput
            placeholder="Bairro"
            value={bairro}
            onChangeText={setBairro}
            className="w-full bg-neutral-100 rounded-full px-4 py-3 mb-3"
          />

          {}
          <TextInput
            placeholder="Complemento"
            value={complemento}
            onChangeText={setComplemento}
            className="w-full bg-neutral-100 rounded-full px-4 py-3 mb-5"
          />

          {}
          <View className="flex-row justify-between">
            <Pressable
              onPress={onCancel}
              className="flex-1 h-11 rounded-full bg-rose-500 items-center justify-center mr-2"
            >
              <Text className="text-white font-medium">Cancelar</Text>
            </Pressable>

            <Pressable
              onPress={handleConfirm}
              className="flex-1 h-11 rounded-full bg-green-500 items-center justify-center ml-2"
            >
              <Text className="text-white font-medium">Concluir</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}