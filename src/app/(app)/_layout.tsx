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

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fbe0f0",
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
        name="avisos"
        options={{
          title: "Avisos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert-circle" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="contatos"
        options={{
          title: "Contatos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="info"
        options={{
          title: "Informações",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
