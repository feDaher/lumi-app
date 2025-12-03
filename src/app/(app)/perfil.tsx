import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { useAuth } from "@/src/context/AuthContext";
import { useMessage } from "@/src/context/MessageContext";
import { Header } from "@/src/components/Header";

import ModalAddress from "@/src/components/ModalAddress";
import { AddressService } from "@/src/services/address";
import { Address } from "@/src/types";
import { formatCEP } from "@/src/utils";

const COLORS = {
  pinkHeader: "#F25C9F",
  inputGray: "#F3F4F6",
  purpleButton: "#FF1C8D",
  warningYellow: "#FBBF24",
  textGray: "#A0A0A0",
};

interface InputFieldProps {
  placeholder: string;
  iconName: string;
  isPassword?: boolean;
  showWarning?: boolean;
  value?: string;
  editable?: boolean;
  onChange?: (t: string) => void;
  style?: any;
  multiline?: any;
}

const InputField = ({
  placeholder,
  iconName,
  isPassword = false,
  showWarning = false,
  value,
  editable = true,
  onChange,
  style,
  multiline,
}: InputFieldProps) => {
  const [isSecure, setIsSecure] = useState(isPassword);

  return (
    <View className="bg-gray-100 rounded-xl px-4 py-3 mb-3 flex-row items-center border border-[#F25C9F]">
      <TextInput
        className="flex-1 text-gray-700 text-base mr-3"
        placeholder={placeholder}
        placeholderTextColor={COLORS.textGray}
        secureTextEntry={isSecure}
        editable={editable}
        onChangeText={onChange}
        value={value}
        style={style}
        multiline
      />

      {showWarning && (
        <FontAwesome5
          name="exclamation-triangle"
          size={18}
          color={COLORS.warningYellow}
          style={{ marginRight: 6 }}
        />
      )}

      {isPassword ? (
        <Pressable onPress={() => setIsSecure(!isSecure)}>
          <Ionicons
            name={isSecure ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={COLORS.textGray}
          />
        </Pressable>
      ) : (
        <Ionicons name={iconName} size={18} color={COLORS.textGray} />
      )}
    </View>
  );
};

export default function Perfil() {
  const { user, updateUser } = useAuth();
  const { showMessage } = useMessage();

  const [addressObj, setAddressObj] = useState<Address | null>(null);
  const [addressModalVisible, setAddressModalVisible] = useState(false);

  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  useEffect(() => {
    loadAddress();
  }, []);

  async function loadAddress() {
    try {
      const addr = await AddressService.getUserAddress();
      setAddressObj(addr);
    } catch (err) {
      showMessage({ type: "error", text: "Sem endereço" });
    }
  }

  async function handleCreateAddress(data: any) {
    try {
      const a = await AddressService.create({
        street: data.street,
        houseNumber: data.number,
        neighborhood: data.neighborhood,
        complement: data.complement,
        zipCode: data.zip,
        city: data.city,
        state: data.state,
        isPrimary: true,
      });

      setAddressObj(a);
      setAddressModalVisible(false);

      updateUser({ ...user, address: a });
      showMessage({ type: "success", text: "Endereço cadastrado!" });
    } catch {
      showMessage({ type: "error", text: "Erro ao salvar endereço" });
    }
  }

  const handleSaveChanges = () => {
    if (pass1 && pass1 !== pass2) {
      return showMessage({
        type: "error",
        text: "Senhas não conferem",
      });
    }
    showMessage({ type: "success", text: "Dados salvos!" });
  };

  const formattedAddress = [
    addressObj?.street,
    addressObj?.houseNumber,
    addressObj?.neighborhood,
    `${addressObj?.city} - ${addressObj?.state}`,
    `CEP ${formatCEP(addressObj?.zipCode)}`
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <SafeAreaView className="flex-1 bg-[#fdf3ea]">
      <Header title="Perfil" showBack />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="px-6"
      >
        <View className="items-center mt-6 mb-4">
          <View
            className="h-28 w-28 rounded-full bg-gray-100 shadow-md border-4 items-center justify-center"
            style={{ borderColor: COLORS.pinkHeader }}
          >
            <Ionicons name="person-outline" size={60} color={COLORS.pinkHeader} />

            <View
              className="absolute bottom-1 right-1 rounded-full p-1 border-2"
              style={{
                backgroundColor: COLORS.pinkHeader,
                borderColor: "white",
              }}
            >
              <Ionicons name="camera" size={12} color="white" />
            </View>
          </View>
        </View>

        <InputField
          placeholder="Nome Completo"
          iconName="person-outline"
          value={user?.name}
          editable={false}
        />

        <InputField
          placeholder="CPF"
          iconName="document-text-outline"
          value={user?.cpf}
          editable={false}
        />

        <InputField
          placeholder="@ email"
          iconName="mail-outline"
          value={user?.email}
          editable={false}
        />

        <InputField
          placeholder="Endereço"
          iconName="location-outline"
          value={addressObj ? formattedAddress : ""}
          showWarning={!addressObj}
          onChange={() => {}}
          editable={false}
          style={{
            minHeight: 70,
          }}
        />

        <Pressable
          onPress={() => setAddressModalVisible(true)}
          className="rounded-xl py-2 px-3 bg-[#F25C9F] self-start mb-3"
        >
          <Text className="text-white font-semibold text-sm">
            {addressObj ? "Editar endereço" : "Cadastrar endereço"}
          </Text>
        </Pressable>

        <InputField
          placeholder="Nova senha"
          iconName="key-outline"
          isPassword
          onChange={setPass1}
          value={pass1}
        />

        <InputField
          placeholder="Repita a senha"
          iconName="key-outline"
          isPassword
          onChange={setPass2}
          value={pass2}
        />

        <Pressable
          onPress={handleSaveChanges}
          className="rounded-full py-4 items-center mt-6 shadow-md"
          style={{ backgroundColor: COLORS.purpleButton }}
        >
          <Text className="text-white font-bold text-base">
            Salvar alterações
          </Text>
        </Pressable>
      </ScrollView>

      <ModalAddress
        visible={addressModalVisible}
        onCancel={() => setAddressModalVisible(false)}
        onConfirm={handleCreateAddress}
      />
    </SafeAreaView>
  );
}
