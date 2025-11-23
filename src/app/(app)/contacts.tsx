import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  TextInput,
  Linking,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Contact {
  name: string;
  phone: string;
}

export default function Contacts() {
  const router = useRouter();

  const [contacts, setContacts] = useState<Contact[]>([
    { name: "Maria Silva", phone: "3299999999" },
  ]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [newContactName, setNewContactName] = useState<string>("");
  const [newContactPhone, setNewContactPhone] = useState<string>("");
  const [menuVisibleIndex, setMenuVisibleIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [contactToDelete, setContactToDelete] = useState<number | null>(null);

  const handleAdd = () => {
    setNewContactName("");
    setNewContactPhone("");
    setModalVisible(true);
  };

  const handleSaveContact = () => {
    if (newContactName && newContactPhone) {
      setContacts((prev) => [
        ...prev,
        { name: newContactName, phone: newContactPhone },
      ]);
      setNewContactName("");
      setNewContactPhone("");
      setModalVisible(false);
    }
  };

  const makeCall = (phone: string) => {
    const phoneNumber =
      Platform.OS === "android" ? `tel:${phone}` : `telprompt:${phone}`;
    Linking.openURL(phoneNumber);
  };

  const sendWhatsApp = (phone: string) => {
    const message = "Preciso de ajuda!";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length <= 10) {
      return cleaned
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return cleaned
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAF0E6]">
      <StatusBar backgroundColor="#FF1C8D" barStyle="light-content" />

      <View className="flex-row items-center h-14 px-4 rounded-b-2xl bg-[#FF1C8D]">
        <TouchableOpacity onPress={() => router.back()}>
          <View className="w-9 h-9 rounded-full bg-white justify-center items-center">
            <Ionicons name="chevron-back" size={22} color="#FF1C8D" />
          </View>
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white font-bold text-base -ml-8">
          Contatos
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 50 }}>
        <Text className="text-[#FF1C8D] font-bold text-lg mb-2">
          Contatos Padrão
        </Text>

        {[
          { name: "Polícia Militar", phone: "190" },
          { name: "Central da Mulher", phone: "180" },
        ].map((c, i) => (
          <View
            key={i}
            className="bg-white w-full p-3 rounded-xl flex-row items-center justify-between mb-3"
            style={{
              elevation: 4,
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 3 },
            }}
          >
            <View>
              <Text className="text-gray-800 font-bold text-base">
                {c.name}
              </Text>
              <Text className="text-gray-600 text-sm">{c.phone}</Text>
            </View>
            <TouchableOpacity
              className="bg-green-500 px-3 py-1 rounded-full"
              onPress={() => makeCall(c.phone)}
            >
              <Ionicons name="call" size={16} color="white" />
            </TouchableOpacity>
          </View>
        ))}

        <Text className="text-[#FF1C8D] font-bold text-lg mt-5 mb-1">
          Contatos de Confiança
        </Text>

        <View className="w-full flex-row items-center justify-between -mt-1 mb-4">
          <View className="flex-1 h-[2px] bg-[#FF1C8D] mr-7" />
          <TouchableOpacity
            onPress={handleAdd}
            className="bg-[#FF1C8D] px-4 py-2 rounded-2xl flex-row items-center -mt-5"
          >
            <Ionicons name="add-circle-outline" size={18} color="white" />
            <Text className="text-white font-bold ml-1">Adicionar</Text>
          </TouchableOpacity>
        </View>

        {contacts.map((c, index) => (
          <View
            key={index}
            className="bg-white p-3 rounded-xl mb-3 relative flex-row justify-between"
            style={{
              elevation: 4,
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 3 },
            }}
          >
            {editingIndex === index ? (
              <View className="flex-1 mr-2">
                <TextInput
                  value={c.name}
                  onChangeText={(text) => {
                    const newContacts = [...contacts];
                    newContacts[index].name = text;
                    setContacts(newContacts);
                  }}
                  className="border border-[#FF1C8D] rounded-xl px-2 py-1 mb-1 text-sm w-40"
                />
                <TextInput
                  value={formatPhone(c.phone)}
                  onChangeText={(text) => {
                    const newContacts = [...contacts];
                    newContacts[index].phone = formatPhone(text);
                    setContacts(newContacts);
                  }}
                  className="border border-[#FF1C8D] rounded-xl px-2 py-1 text-sm w-40"
                  keyboardType="phone-pad"
                />
              </View>
            ) : (
              <View>
                <Text className="text-[#971A9D] font-bold text-base ml-2">
                  {c.name}
                </Text>
                <Text className="text-gray-700 font-semibold">  {formatPhone(c.phone)}</Text>
              </View>
            )}

            {editingIndex === index ? (
              <View className="flex-row items-center space-x-2 mt-7">
                <TouchableOpacity
                  className="bg-green-500 px-4 py-1 rounded-2xl ml-2"
                  onPress={() => setEditingIndex(null)}
                >
                  <Text className="text-white font-bold text-sm">Salvar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-row items-center space-x-2 mt-4">
                <TouchableOpacity
                  className="bg-green-500 px-3 py-1 rounded-full"
                  onPress={() => sendWhatsApp(c.phone)}
                >
                  <Ionicons name="logo-whatsapp" size={17} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-green-500 px-3 py-1 rounded-full"
                  onPress={() => makeCall(c.phone)}
                >
                  <Ionicons name="call" size={17} color="white" />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              className="p-1 absolute right-1 mt-0"
              onPress={() =>
                setMenuVisibleIndex(menuVisibleIndex === index ? null : index)
              }
            >
              <Ionicons name="ellipsis-horizontal" size={20} color="#FF1C8D" />
            </TouchableOpacity>

            {menuVisibleIndex === index && (
              <View
                className="absolute top-5 right-3 bg-white border border-[#FF1C8D] rounded-md shadow-md w-32 
                   z-50 elevation-[9999]"
              >
                <TouchableOpacity
                  className="p-1 border-b border-gray-200"
                  onPress={() => {
                    setEditingIndex(index);
                    setMenuVisibleIndex(null);
                  }}
                >
                  <Text className="text-[#FF1C8D] text-center">Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="p-1"
                  onPress={() => {
                    setContactToDelete(index);
                    setDeleteModalVisible(true);
                    setMenuVisibleIndex(null);
                  }}
                >
                  <Text className="text-red-500 text-center">Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/20 px-4">
          <View className="bg-white p-5 rounded-2xl border border-[#FF1C8D] w-full max-w-md items-center">
            <Text className="text-center text-black font-bold text-lg mb-4">
              Adicionar Contato
            </Text>

            <TextInput
              placeholder="Nome"
              value={newContactName}
              onChangeText={setNewContactName}
              className="border border-[#FF1C8D] rounded-xl p-3 w-full mb-3 text-sm"
            />
            <TextInput
              placeholder="Telefone"
              value={newContactPhone}
              onChangeText={(text) => setNewContactPhone(formatPhone(text))}
              keyboardType="phone-pad"
              className="border border-[#FF1C8D] rounded-xl p-3 w-full mb-5 text-sm"
            />

            <View className="flex-row justify-between w-full">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-red-600 px-5 py-3 rounded-2xl items-center"
              >
                <Text className="text-white font-bold">Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSaveContact}
                className="bg-green-500 px-5 py-3 rounded-2xl items-center"
              >
                <Text className="text-white font-bold">Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={deleteModalVisible} animationType="fade" transparent>
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/20 px-4">
          <View className="bg-white p-5 rounded-2xl border border-[#FF1C8D] w-full max-w-xs items-center">
            <Text className="text-center text-black font-bold text-lg mb-4">
              Deseja excluir este contato?
            </Text>

            <View className="flex-row justify-between w-full">
              <TouchableOpacity
                className="bg-gray-300 px-5 py-3 rounded-2xl items-center"
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text className="font-bold text-black">Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-500 px-5 py-3 rounded-2xl items-center"
                onPress={() => {
                  if (contactToDelete !== null) {
                    const newContacts = [...contacts];
                    newContacts.splice(contactToDelete, 1);
                    setContacts(newContacts);
                  }
                  setDeleteModalVisible(false);
                  setContactToDelete(null);
                }}
              >
                <Text className="text-white font-bold">Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
