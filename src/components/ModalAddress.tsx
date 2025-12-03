import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { maskCEP, isValidCEP, sanitizeCEP, formatCEP } from "../utils";

type Props = {
  visible: boolean;
  onCancel?: () => void;
  onConfirm?: (data: {
    street: string;
    number: string | null;
    noNumber: boolean;
    zip: string;
    neighborhood: string;
    complement: string;
    city: string;
    state: string;
  }) => void;
};

export default function ModalAddress({ visible, onCancel, onConfirm }: Props) {
  const [street, setStreet] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [noNumber, setNoNumber] = useState(false);
  const [zip, setZip] = useState<string>('');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [complement, setComplement] = useState<string>('');
  const [zipError, setZipError] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');

  const handleZipChange = (text: string) => {
    const sanitized = sanitizeCEP(text);
    setZip(formatCEP(sanitized));

    if (!isValidCEP(sanitized)) {
      setZipError("CEP inválido");
    } else {
      setZipError("");
    }
  };

  const handleConfirm = () => {
    if (!isValidCEP(zip)) {
      setZipError("CEP inválido");
      return;
    }
    const sanitizedZip = sanitizeCEP(zip);

    onConfirm?.({
      street,
      number: noNumber ? null : number,
      noNumber,
      zip: sanitizedZip,
      neighborhood,
      complement,
      city,
      state,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/50 items-center justify-center px-6">
        <View className="w-full max-w-md bg-white py-6 px-5 rounded-2xl">
          <Text className="text-center font-bold text-lg mb-4">
            Preencha seu endereço
          </Text>

          <TextInput
            placeholder="Logradouro"
            value={street}
            onChangeText={setStreet}
            className="w-full bg-neutral-100 rounded-full px-4 py-3 mb-3"
          />

          <View className="flex-row w-full items-center justify-between mb-3">
            <TextInput
              placeholder="Nº"
              editable={!noNumber}
              value={noNumber ? "" : number}
              onChangeText={setNumber}
              keyboardType="numeric"
              className={`flex-1 bg-neutral-100 rounded-full px-4 py-3 mr-2 ${
                noNumber ? "opacity-40" : ""
              }`}
            />

            <TouchableOpacity
              onPress={() => setNoNumber((prev) => !prev)}
              className="flex-row items-center mr-2"
            >
              <View
                className={`h-5 w-5 rounded-md border mr-1 items-center justify-center ${
                  noNumber
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-neutral-400 bg-white"
                }`}
              >
                {noNumber && <Text className="text-white text-xs">✓</Text>}
              </View>
              <Text>S/N</Text>
            </TouchableOpacity>

            <View className="flex-1">
              <TextInput
                placeholder="CEP"
                value={zip}
                onChangeText={handleZipChange}
                keyboardType="numeric"
                className={`bg-neutral-100 rounded-full px-4 py-3 ${
                  zipError ? "border border-rose-500" : ""
                }`}
              />
              {zipError ? (
                <Text className="text-rose-600 text-xs mt-1 ml-2">
                  {zipError}
                </Text>
              ) : null}
            </View>
          </View>

          <TextInput
            placeholder="Bairro"
            value={neighborhood}
            onChangeText={setNeighborhood}
            className="w-full bg-neutral-100 rounded-full px-4 py-3 mb-3"
          />

          <TextInput
            placeholder="Complemento"
            value={complement}
            onChangeText={setComplement}
            className="w-full bg-neutral-100 rounded-full px-4 py-3 mb-5"
          />

          <TextInput
            placeholder="Cidade"
            value={city}
            onChangeText={setCity}
            className="w-full bg-neutral-100 rounded-full px-4 py-3 mb-3"
          />

          <TextInput
            placeholder="UF"
            value={state}
            onChangeText={(text) => setState(text.toUpperCase())}
            keyboardType="default"
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={2}
            className="w-full bg-neutral-100 rounded-full px-4 py-3 mb-3"
          />

          <View className="flex-row justify-between">
            <Pressable
              onPress={onCancel}
              className="flex-1 h-11 rounded-full bg-rose-500 items-center justify-center mr-2"
            >
              <Text className="text-white font-medium">Cancelar</Text>
            </Pressable>

            <TouchableOpacity
              onPress={handleConfirm}
              className="flex-1 h-11 rounded-full bg-green-500 items-center justify-center ml-2"
            >
              <Text className="text-white font-medium">Concluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
