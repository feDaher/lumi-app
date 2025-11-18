import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import * as SecureStore from "expo-secure-store";
import { AUTH_KEY } from "@/src/env";
import { signIn as signInService } from "@/src/services/signIn";
import { api } from "@/src/services/api";
import { User } from "../types";

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await SecureStore.getItemAsync(AUTH_KEY);
        if (stored) {
          setToken(stored);
          api.defaults.headers.common["Authorization"] = `Bearer ${stored}`;
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!email || !password) throw new Error("Informe e-mail e senha");

    try {
      const data = await signInService(email.trim(), password);

      if (!data?.token) {
        throw new Error("Resposta inesperada do servidor");
      }

      await SecureStore.setItemAsync(AUTH_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Falha ao fazer login");
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync(AUTH_KEY);
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      signIn,
      signOut,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
