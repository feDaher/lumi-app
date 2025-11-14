import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const handleAlert = () => {
    Alert.alert("⚠️ Alerta acionado!", "Sua localização foi enviada!");
  };

  return (
    <View style={styles.container}>
      {/* Topo */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Olá!</Text>
      </View>

      {/* Campo de localização */}
      <View style={styles.locationContainer}>
        <TextInput
          style={styles.locationInput}
          placeholder="sua localização"
          placeholderTextColor="#aaa"
        />
        <Ionicons name="location-outline" size={22} color="#ff69b4" style={styles.locationIcon} />
      </View>

      {/* Botão vermelho central */}
      <TouchableOpacity style={styles.alertButton} onPress={handleAlert}>
        <Text style={styles.alertText}>ACIONAR ALERTA!</Text>
      </TouchableOpacity>

      {/* Barra inferior */}
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Ionicons name="home" size={22} color="#fff" />
          <Text style={styles.footerText}>Início</Text>
        </View>

        <View style={styles.footerItem}>
          <Ionicons name="alert-circle" size={22} color="#fff" />
          <Text style={styles.footerText}>Avisos</Text>
        </View>

        <View style={styles.footerItem}>
          <Ionicons name="call" size={22} color="#fff" />
          <Text style={styles.footerText}>Contatos</Text>
        </View>

        <View style={styles.footerItem}>
          <Ionicons name="information-circle" size={22} color="#fff" />
          <Text style={styles.footerText}>Informações</Text>
        </View>

        <View style={styles.footerItem}>
          <Ionicons name="settings" size={22} color="#fff" />
          <Text style={styles.footerText}>Perfil</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff4ef",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    backgroundColor: "#ff69b4",
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    marginTop: 20,
    width: "85%",
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  locationInput: {
    flex: 1,
    height: 45,
    color: "#333",
  },
  locationIcon: {
    marginLeft: 8,
  },
  alertButton: {
    backgroundColor: "red",
    borderRadius: 100,
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  alertText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ff69b4",
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingVertical: 10,
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 3,
  },
});
