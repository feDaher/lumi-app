import { useCallback, useEffect, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNWColorScheme } from "nativewind";

type ThemePref = "light" | "dark" | "system";
const STORAGE_KEY = "@theme_pref";

export function useThemePersisted() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNWColorScheme();
  const [pref, setPref] = useState<ThemePref>("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        const valid: ThemePref =
          saved === "light" || saved === "dark" || saved === "system" ? (saved as ThemePref) : "system";

        setPref(valid);
        setColorScheme(valid);
      } finally {
        setReady(true);
      }
    })();
  }, [setColorScheme]);

  useEffect(() => {
    if (pref !== "system") return;
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme("system");
    });
    return () => {
      sub?.remove?.();
    };
  }, [pref, setColorScheme]);

  const setTheme = useCallback(
    async (next: ThemePref) => {
      setPref(next);
      await AsyncStorage.setItem(STORAGE_KEY, next);
      setColorScheme(next);
    },
    [setColorScheme]
  );

  return {
    isReady: ready,
    theme: pref,
    current: colorScheme,
    setTheme,
    toggleTheme: toggleColorScheme,
  };
}
