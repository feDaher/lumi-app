import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import { Stack } from 'expo-router';

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signIn(email.trim(), pwd);
    } catch (e: any) {
      Alert.alert('Erro', e?.message ?? 'Falha no login');
    } finally {
      setLoading(false)
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Stack.Screen options={{ title: 'Entrar', headerShown: true }} />
      <Text className="text-2xl font-bold mb-6">Bem-vindo</Text>

      <TextInput
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-3"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-4"
        placeholder="Senha"
        secureTextEntry
        value={pwd}
        onChangeText={setPwd}
      />

      <Pressable
        onPress={handleLogin}
        disabled={loading}
        className="w-full rounded-xl px-4 py-3 items-center justify-center bg-zinc-800"
      >
        <Text className="text-white font-semibold">{loading ? 'Entrando...' : 'Entrar'}</Text>
      </Pressable>
    </View>
  );
}
