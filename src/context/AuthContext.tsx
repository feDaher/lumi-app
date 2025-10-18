import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AUTH_KEY } from '@/src/env';

type User = { email: string; password: string };


type AuthContextType = {
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await SecureStore.getItem(AUTH_KEY);
        if (stored) setToken(stored);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

    const signUp = async (email: string, password: string) => {
    if (!email || !password) throw new Error('Informe e-mail e senha');

    const usersData = await SecureStore.getItemAsync("users");
    const users: User[] = usersData ? JSON.parse(usersData) : [];

    if (users.some(u => u.email === email)) {
      throw new Error("E-mail já registrado!");
    }

    const newUsers = [...users, { email, password }];
    await SecureStore.setItemAsync("users", JSON.stringify(newUsers));

    const fakeJwt = 'demo-' + Math.random().toString(36).slice(2);
    await SecureStore.setItemAsync(AUTH_KEY, fakeJwt);
    setToken(fakeJwt);
  };

  const signIn = async (email: string, password: string) => {
    if (!email || !password) throw new Error('Informe e-mail e senha');

    const usersData = await SecureStore.getItemAsync("users");
    const users: User[] = usersData ? JSON.parse(usersData) : [];

    const foundUser = users.find(u => u.email === email);
  
    if (!foundUser) {
      throw new Error("Usuário não encontrado!")
    }

    if (foundUser.password !== password) {
      throw new Error("Senha incorreta!")
    }

    const fakeJwt = 'demo-' + Math.random().toString(36).slice(2);
    await SecureStore.setItem(AUTH_KEY, fakeJwt);
    setToken(fakeJwt);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync(AUTH_KEY);
    setToken(null);
  };

  const value = useMemo(() => ({ token, isLoading, signIn, signOut, signUp }), [token, isLoading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
