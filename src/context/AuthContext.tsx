import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { AUTH_KEY } from "@/src/env";
import { signIn as signInService } from "@/src/services/signIn";
import { api } from "@/src/services/api";
import { User } from "../types";
import { logout } from "../services/session";

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = "user-data";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(AUTH_KEY);
        const storedUser = await SecureStore.getItemAsync(USER_KEY);

        if (storedToken && storedToken) {
          api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const { token, user } = await signInService(email, password);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      await SecureStore.setItemAsync(AUTH_KEY, token);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));

      setToken(token);
      setUser(user);
    } catch(e: any) {
      throw new Error(e.message ?? "Falha no login");
    }
  }


  const signOut = async () => {
    try{
      await logout();
    } catch(error) {
      console.log("Erro ao deslogar no backend")
    } finally {
    await SecureStore.deleteItemAsync(AUTH_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
    delete api.defaults.headers.common["Authorization"];

    setToken(null);
    setUser(null);

    router.replace("/(public)/login");
    }
  };

  const updateUser = (newUser: User) => {
    setUser(newUser);
    SecureStore.setItemAsync(USER_KEY, JSON.stringify(newUser));
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      signIn,
      signOut,
      updateUser
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
