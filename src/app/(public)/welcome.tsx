import { useEffect } from "react";
import * as Location from "expo-location";
import { View, Text, ImageBackground, Image, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    const askLocationPermission = async () => {
      let granted = false;

      while (!granted) {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          granted = true;
          let location = await Location.getCurrentPositionAsync({});
          break;
        } else {
          await new Promise((resolve) => {
            Alert.alert(
              "Permissão necessária",
              "Precisamos da sua localização para usar este app.",
              [
                { text: "OK", onPress: resolve } 
              ],
              { cancelable: false } 
            );
          });
        }
      }
    };

    askLocationPermission();
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/fundo.png")}
      resizeMode="cover"
      className="flex-1 justify-between items-center"
    >
      
      <View className="items-center mt-20">
        <Image
          source={require("../../../assets/logo-lotus.png")}
          className="w-58 h-58 mb-0"
          resizeMode="contain"
        />
      </View>
      
      <View className="items-center mb-12 relative w-full">
        <Image
          source={require("../../../assets/logo-texto.png")}
          className="w-56 h-56 opacity-70 absolute bottom-0"
          resizeMode="contain"
        />

        <TouchableOpacity
          onPress={() => router.push("/(public)/login")}
          className="px-6 py-2 rounded-full border border-white shadow-md absolute bottom-16"
          style={{ backgroundColor: "#5A1096", opacity: 0.75, zIndex: 1 }}
        >
          <Text className="text-white font-semibold text-lg">ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
