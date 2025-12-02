import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, ImageBackground, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { AUTH_KEY } from "@/src/env";
import { validationSession } from "@/src/services/session";

// SplashScreen.preventAutoHideAsync();
export default function Splash() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
   const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();

const prepareApp = async () => {
  try {
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 2000));
    const sessionPromise = (async () => {
      const token = await SecureStore.getItem(AUTH_KEY);
      if (!token) {
            return "/(public)/login";
          }
        try {
          const data = await validationSession(token);            
            return "/(app)/home";
          } catch (error) {
            await SecureStore.deleteItemAsync(AUTH_KEY)
            return "/(public)/login";
          }
        })();
        const [_, nextRoute] = await Promise.all([minTimePromise, sessionPromise]);
        await SplashScreen.hideAsync();
        
        router.replace(nextRoute as any);

      } catch (e) {
        router.replace("(public)/login");
      }
    };

    prepareApp();

    return () => {
      loop.stop();
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
    }
  }, [isReady]);

  return (
    <ImageBackground
      source={require("../../../assets/fundo.png")}
      style={styles.fundo}
      resizeMode="cover"
      onLoadEnd={() => setIsReady(true)}
      onLayout={onLayoutRootView}
    >
    <Animated.Image
      source={require("../../../assets/logo.png")}
      style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
      resizeMode="contain"
    />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
