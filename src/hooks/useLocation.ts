import { useCallback, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

type GateStatus = "idle" | "checking" | "granted" | "denied" | "blocked" | "error";

export function useLocationGate(autoRequest = true) {
  const [status, setStatus] = useState<GateStatus>("idle");
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const getLocation = useCallback(async () => {
    const last = await Location.getLastKnownPositionAsync();
    if (last?.coords && mounted.current) {
      setCoords(last.coords);
      return last.coords;
    }

    const current = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    if (mounted.current) setCoords(current.coords);
    return current.coords;
  }, []);

  const request = useCallback(async () => {
    try {
      if (mounted.current) setStatus("checking");

      const services = await Location.hasServicesEnabledAsync();
      if (!services) {
        await new Promise<void>((resolve) => {
          Alert.alert(
            "Localização desativada",
            "Ative a localização do dispositivo para continuar.",
            [{ text: "OK", onPress: () => resolve() }],
            { cancelable: false }
          );
        });
      }

      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        await getLocation();
        if (mounted.current) setStatus("granted");
        return;
      }

      if (status === "denied" && canAskAgain) {
        if (mounted.current) setStatus("denied");
        await new Promise<void>((resolve) =>
          Alert.alert(
            "Permissão necessária",
            "Precisamos da sua localização para usar este app.",
            [{ text: "Tentar novamente", onPress: () => resolve() }],
            { cancelable: false }
          )
        );

        return await request();
      }

      if (!canAskAgain) {
        if (mounted.current) setStatus("blocked");
        await new Promise<void>((resolve) =>
          Alert.alert(
            "Permissão bloqueada",
            "Abra as configurações do app e permita o acesso à localização.",
            [
              { text: "Cancelar", style: "cancel", onPress: () => resolve() },
              { text: "Abrir Ajustes", onPress: async () => { await Linking.openSettings(); resolve(); } },
            ],
            { cancelable: false }
          )
        );
        return;
      }
    } catch (e) {
      if (mounted.current) setStatus("error");
    }
  }, [getLocation]);

  useEffect(() => {
    if (autoRequest) request();
  }, [autoRequest, request]);

  return { status, coords, request };
}
