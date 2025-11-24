import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, SafeAreaView, Platform, StatusBar, Animated } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { questions, Option, Question } from "../../data/questions";

interface Answers {
  [key: string]: Option | null;
}

export default function RiskAssessment() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({
    risk: null,
    phoneAccess: null,
    violenceHistory: null,
    contactedAuthorities: null,
    fearLevel: null,
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleSelect = (field: string, option: Option) => {
    setAnswers((prev) => ({ ...prev, [field]: option }));
    closeDropdown();
  };

  const openDropdownAnimated = (field: string) => {
    if (activeDropdown === field) {
      closeDropdown();
      return;
    }
    setActiveDropdown(field);
    Animated.timing(slideAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start();
  };

  const closeDropdown = () => {
    Animated.timing(slideAnim, { toValue: 0, duration: 150, useNativeDriver: false }).start(() => setActiveDropdown(null));
  };

  const handleEvaluate = () => {
    if (Object.values(answers).some((a) => a === null)) {
      Alert.alert("Atenção", "Por favor, responda todas as perguntas antes de avaliar.");
      return;
    }

    const score = Object.values(answers).reduce((total, option) => total + (option?.value || 0), 0);

    let result = "";
    if (score <= 2) result = "Risco baixo";
    else if (score <= 6) result = "Risco moderado";
    else result = "Risco alto";

    Alert.alert("Resultado da avaliação", result);
  };

  const renderDropdown = (field: string, options: Option[]) => {
    if (activeDropdown !== field) return null;

    const height = slideAnim.interpolate({ inputRange: [0, 1], outputRange: [0, options.length * 55] });

    return (
      <Animated.View style={{ overflow: "hidden", height }} className="bg-white border-t border-gray-300 rounded-b-lg">
        {options.map((option) => (
          <TouchableOpacity key={option.label} onPress={() => handleSelect(field, option)} className="p-3 border-b border-gray-200">
            <Text className="font-semibold">{option.label}</Text>
            {option.desc && <Text className="text-gray-500 text-xs">{option.desc}</Text>}
          </TouchableOpacity>
        ))}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAF0E6]">
      <StatusBar backgroundColor="#ff69b4" barStyle="light-content" />
      <View className="bg-[#ff69b4] w-full pt-6 pb-5 px-5 rounded-b-3xl shadow flex-row items-center justify-between">
      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.7}
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        className="w-10 h-10 rounded-full bg-white/90 shadow justify-center items-center"
      >
        <Ionicons name="chevron-back" size={26} color="#FF1C8D" />
      </TouchableOpacity>
      <Text className="text-white text-xl font-bold text-center flex-1">
        Teste de Risco
      </Text>
      <View className="w-10 h-10" />
    </View>

      <ScrollView className="flex-1 px-4 pt-6" contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="space-y-5">
          {questions.map(({ field, question, options }: Question) => (
            <View key={field}>
              <Text className="font-semibold mb-1">{question}</Text>
              <View className="border border-gray-300 rounded-lg bg-white overflow-hidden">
                <TouchableOpacity onPress={() => openDropdownAnimated(field)} className="p-3 flex-row justify-between items-center">
                  <Text>{answers[field]?.label || "Selecione..."}</Text>
                  <Ionicons name={activeDropdown === field ? "chevron-up" : "chevron-down"} size={18} color="#FF1C8D" />
                </TouchableOpacity>
                {renderDropdown(field, options)}
              </View>
            </View>
          ))}

          <TouchableOpacity onPress={handleEvaluate} className="bg-[#971A9D] py-3 rounded-full mt-8 mb-6 shadow-md">
            <Text className="text-white font-bold text-center text-base">Avaliar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
