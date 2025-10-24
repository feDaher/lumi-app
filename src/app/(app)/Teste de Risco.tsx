import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, SafeAreaView, Platform, StatusBar, Animated, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Respostas {
  risco: string;
  acessoTelefone: string;
  historicoViolencia: string;
  acionouAutoridades: string;
  medo: string;
}

export default function TesteDeRisco() {
  const router = useRouter();
  const [respostas, setRespostas] = useState<Respostas>({
    risco: "",
    acessoTelefone: "",
    historicoViolencia: "",
    acionouAutoridades: "",
    medo: "",
  });

  const [openDropdown, setOpenDropdown] = useState<keyof Respostas | null>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const opcoesSimNao = ["Sim", "Não"];
  const opcoesMedo = ["Baixo", "Moderado", "Alto", "Muito alto"];

  const handleChange = (campo: keyof Respostas, valor: string) => {
    setRespostas((prev) => ({ ...prev, [campo]: valor }));
    closeDropdown();
  };

  const openDropdownAnimated = (campo: keyof Respostas) => {
    if (openDropdown === campo) {
      closeDropdown();
      return;
    }
    setOpenDropdown(campo);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const closeDropdown = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start(() => setOpenDropdown(null));
  };

  const handleAvaliar = () => {
    const pontos =
      (respostas.risco === "Sim" ? 2 : 0) +
      (respostas.acessoTelefone === "Sim" ? 1 : 0) +
      (respostas.historicoViolencia === "Sim" ? 2 : 0) +
      (respostas.acionouAutoridades === "Não" ? 1 : 0) +
      (["Alto", "Muito alto"].includes(respostas.medo) ? 2 : 0);

    let resultado = "";
    if (pontos <= 2) resultado = "Risco baixo";
    else if (pontos <= 5) resultado = "Risco moderado";
    else resultado = "Risco alto";

    Alert.alert("Resultado da avaliação", resultado);
  };

  const renderDropdown = (campo: keyof Respostas, opcoes: string[]) => {
    if (openDropdown !== campo) return null;

    const height = slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, opcoes.length * 45],
    });

    return (
      <Animated.View style={[styles.dropdownAnimated, { height }]}>
        {opcoes.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => handleChange(campo, item)}
            style={styles.dropdownItem}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF1C8DBD" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <View style={styles.backCircle}>
            <Ionicons name="chevron-back" size={22} color="#FF1C8DBD" />
          </View>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Teste de Risco</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={{ gap: 20 }}>
          {[
            {
              campo: "risco",
              pergunta: "1. Você sente que está em risco iminente?",
              opcoes: opcoesSimNao,
            },
            {
              campo: "acessoTelefone",
              pergunta: "2. Seu agressor tem acesso ao seu telefone?",
              opcoes: opcoesSimNao,
            },
            {
              campo: "historicoViolencia",
              pergunta: "3. Há histórico de violência física?",
              opcoes: opcoesSimNao,
            },
            {
              campo: "acionouAutoridades",
              pergunta: "4. Você já acionou autoridades antes?",
              opcoes: opcoesSimNao,
            },
            {
              campo: "medo",
              pergunta: "5. Qual o seu nível de medo atual?",
              opcoes: opcoesMedo,
            },
          ].map(({ campo, pergunta, opcoes }) => (
            <View key={campo}>
              <Text style={styles.question}>{pergunta}</Text>

              <View style={styles.dropdownContainer}>
                <TouchableOpacity
                  onPress={() => openDropdownAnimated(campo as keyof Respostas)}
                  style={styles.dropdownButton}
                >
                  <Text>{respostas[campo as keyof Respostas] || "Selecione..."}</Text>
                  <Ionicons
                    name={
                      openDropdown === campo ? "chevron-up" : "chevron-down"
                    }
                    size={18}
                    color="#FF1C8DBD"
                  />
                </TouchableOpacity>

                {renderDropdown(campo as keyof Respostas, opcoes)}
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleAvaliar}>
          <Text style={styles.submitText}>Avaliar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF0E6",
  },
  header: {
    backgroundColor: "#FF1C8DBD",
    marginTop: Platform.OS === "android" ? 0 : 10,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: -32,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  question: {
    fontWeight: "600",
    marginBottom: 4,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  dropdownButton: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownAnimated: {
    overflow: "hidden",
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#CCC",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  submitButton: {
    backgroundColor: "#971A9D",
    paddingVertical: 12,
    borderRadius: 999,
    marginTop: 32,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  submitText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
