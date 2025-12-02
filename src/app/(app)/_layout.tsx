import { Platform } from "react-native";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
         tabBarStyle: {
          backgroundColor: "#ff69b4",
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          height: Platform.OS === "ios" ? 90 : 100,
          paddingBottom: Platform.OS === "ios" ? 25 : 20,
          paddingTop: 7,
        },

        tabBarActiveTintColor: "#d10069",
        tabBarInactiveTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contatos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="riskAssessment"
        options={{
          title: "Teste de Risco",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="informative"
        options={{
          title: "Informativos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
      { <Tabs.Screen
        name="perfil"
        options={{
          title: "perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="woman" size={size} color={color} />
          ),
        }}
      /> }
    </Tabs>
  );
}
