import React, { useEffect, useState } from "react";
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
import { useMessage } from "@/src/context/MessageContext";
import { Header } from "@/src/components/Header";
import { ContactService } from "@/src/services/contacts";
import { Contact } from "@/src/types";
import { Feather } from "@expo/vector-icons";

const DDI = '55';

export default function Contacts() {
  const { showMessage } = useMessage();

  const [contacts, setContacts] = useState<Contact[]>([]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [newContactName, setNewContactName] = useState<string>("");
  const [newContactPhone, setNewContactPhone] = useState<string>("");
  const [menuVisibleIndex, setMenuVisibleIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [contactToDelete, setContactToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    try {
      const list = await ContactService.list();
      setContacts(list);
    } catch (e) {
      showMessage({ type: "error", text: "Erro ao carregar contatos" });
    }
  }

  const handleAdd = () => {
    setNewContactName("");
    setNewContactPhone("");
    setModalVisible(true);
  };

  async function handleSaveContact() {
    try {
      const cleaned = newContactPhone.replace(/\D/g, "");

      const ddd = cleaned.slice(0, 2);
      const phone = cleaned.slice(2);

      await ContactService.create({
        name: newContactName,
        ddd,
        phone,
      });

      showMessage({ type: "success", text: "Contato adicionado!" });
      setModalVisible(false);
      loadContacts();
    } catch (err) {
      showMessage({ type: "error", text: "Erro ao adicionar contato" });
    }
  }

  async function handleUpdateContact(index: number) {
    try {
      const item = contacts[index];
      const { id, name, ddd, phone } = item;

      await ContactService.update(id, {
        name,
        ddd,
        phone,
      });

      showMessage({ type: "success", text: "Contato atualizado!" });
      setEditingIndex(null);
      loadContacts();
    } catch (err) {
      showMessage({ type: "error", text: "Erro ao atualizar contato" });
    }
  }

  async function handleDeleteContact() {
    if (contactToDelete === null) return;

    try {
      const item = contacts[contactToDelete];

      await ContactService.delete(item.id);

      showMessage({ type: "success", text: "Contato removido!" });
      setDeleteModalVisible(false);
      setContactToDelete(null);
      loadContacts();
    } catch (err) {
      showMessage({ type: "error", text: "Erro ao excluir" });
    }
  }


  const makeCall = (phone: string, ddd?: string) => {
    const phoneNumber = `0${ddd}${phone}`;
    const url =
      Platform.OS === "android" ? `tel:${phoneNumber}` : `telprompt:${phoneNumber}`;
    Linking.openURL(url);
  };

  const sendWhatsApp = (ddd: string, phone: string) => {
    const message = 'Preciso de ajuda!';
    const phoneNumber = `${DDI}${ddd}${phone}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 10) {
      return digits
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

  function normalizeContactNumber(contact: Contact) {
    return `${contact.ddd}${contact.phone}`;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FAF0E6]">
      <StatusBar backgroundColor="#FF1C8D" barStyle="light-content" />

      <Header title="Contatos" showBack />

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

   <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#ffffffff",
          marginTop: 3,
          marginHorizontal: 16,
          paddingHorizontal: 12,
          paddingVertical: 1,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#e0e0e0",
        }}
      >
      <Feather name="search" size={18} color="#aaa7a7ff" style={{ marginRight: 8 }} />

      <TextInput
        placeholder="Pesquisar Contato..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor="#999"
        style={{
          flex: 1,
          fontSize: 13,
          color: "#333",
        }}
      />
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
                  value={formatPhone(`${c.ddd}${c.phone}`)}
                  onChangeText={(text) => {
                    const cleaned = text.replace(/\D/g, '');

                    const newContacts = [...contacts];

                    newContacts[index].ddd = cleaned.slice(0, 2);
                    newContacts[index].phone = cleaned.slice(2);

                    setContacts(newContacts);
                  }}
                  className="border border-[#FF1C8D] rounded-xl px-2 py-1 text-sm w-40"
                  keyboardType="phone-pad"
                  maxLength={15}
                />
              </View>
            ) : (
              <View>
                <Text className="text-[#971A9D] font-bold text-base ml-2">
                  {c.name}
                </Text>
                <Text className="text-gray-700 font-semibold">  {formatPhone(normalizeContactNumber(c))}</Text>
              </View>
            )}

            {editingIndex === index ? (
              <View className="flex-row items-center space-x-2 mt-7">
                <TouchableOpacity
                  className="bg-green-500 px-4 py-1 rounded-2xl ml-2"
                  onPress={() => handleUpdateContact(index)}
                >
                  <Text className="text-white font-bold text-sm">Salvar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-row items-center space-x-2 mt-4">
                <TouchableOpacity
                  className="bg-green-500 px-3 py-1 rounded-full"
                  onPress={() => sendWhatsApp(c.ddd, c.phone)}
                >
                  <Ionicons name="logo-whatsapp" size={17} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-green-500 px-3 py-1 rounded-full"
                  onPress={() => makeCall(c.phone, c.ddd)}
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
              maxLength={15}
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
                onPress={handleDeleteContact}
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
