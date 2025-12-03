import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "@/src/context/AuthContext";
import { Header } from "@/src/components/Header";

const COLORS = {
  pinkHeader: "#F25C9F",
  inputGray: "#F3F4F6",
  purpleButton: "#c64eccdc",
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
}

const InputField = ({
  placeholder,
  iconName,
  isPassword = false,
  showWarning = false,
  value,
  editable = true,
  onChange,
}: InputFieldProps) => {
  const [isSecure, setIsSecure] = useState(isPassword);

  return (
    <View className="bg-gray-100 rounded-xl px-4 py-1 mb-3 flex-row items-center border border-[#F25C9F]">
      <TextInput
        className="flex-1 text-gray-700 text-base mr-3"
        placeholder={placeholder}
        placeholderTextColor={COLORS.textGray}
        secureTextEntry={isSecure}
        value={value}
        onChangeText={onChange}
        editable={editable}
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
  const { user } = useAuth();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [cpf, setCpf] = useState(user?.cpf ?? '');
  const [address, setAddress] = useState(user?.address ?? '');

  return (
    <SafeAreaView className="flex-1 bg-[#fdf3ea]">
      <Header title="Perfil" showBack />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mt-6 mb-4">
          <View
            className="h-28 w-28 rounded-full bg-gray-100 shadow-md border-4 items-center justify-center"
            style={{ borderColor: COLORS.pinkHeader }}
          >
            <Ionicons
              name="person-outline"
              size={60}
              color={COLORS.pinkHeader}
            />

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

        <View className="px-6">
          <InputField
            placeholder="Nome Completo"
            iconName="person-outline"
            value={name}
            onChange={setName}
            editable={false}
          />

          <InputField
            placeholder="CPF"
            iconName="document-text-outline"
            value={cpf}
            onChange={setCpf}
            editable={false}
          />

          <InputField
            placeholder="@ email"
            iconName="mail-outline"
            value={email}
            onChange={setEmail}
            editable={false}
          />

          <InputField
            placeholder="Endereço"
            iconName="location-outline"
            showWarning={!address}
            value={address}
            onChange={setAddress}
          />

          <InputField
            placeholder="Nova senha"
            iconName="key-outline"
            isPassword
          />
          <InputField
            placeholder="Repita a senha"
            iconName="key-outline"
            isPassword
          />

          <Pressable
            className="rounded-full py-4 items-center mt-6 shadow-md"
            style={{ backgroundColor: COLORS.purpleButton }}
          >
            <Text className="text-white font-bold text-base">
              Salvar alterações
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
