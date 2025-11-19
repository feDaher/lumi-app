import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, ImageBackground, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

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

    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
      router.replace("/welcome");
    }, 3000);

    return () => {
      loop.stop();
      clearTimeout(timer);
    }
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
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
