import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const backgroundImage = require('@/assets/fundo.png');

const COLORS = {
  pinkHeader: '#F25C9F',
  inputGray: '#F3F4F6',
  greenButton: '#78C86C',
  warningYellow: '#FBBF24',
  textGray: '#A0A0A0'
};

interface InputFieldProps {
  placeholder: string;
  iconName: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  showWarning?: boolean;
  value?: string;
}

const InputField = ({ placeholder, iconName, isPassword = false, showWarning = false, value }: InputFieldProps) => {
  const [isSecure, setIsSecure] = useState(isPassword);

  return (
    <View className='flex-row items-center bg-gray-100 rounded-full px-6 py-4 mb-4 shadow-sm border border-gray-50'>
      <TextInput
        className='flex-1 text-gray-700 text-base mr-4'
        placeholder={placeholder}
        placeholderTextColor={COLORS.textGray}
        secureTextEntry={isSecure}
        defaultValue={value}
        style={{ includeFontPadding: false }}
      />

      {}
      {showWarning && (
        <FontAwesome5 name='exclamation-triangle' size={18} color={COLORS.warningYellow} style={{ marginRight: 12 }} />
      )}

      {}
      {isPassword ? (
        <Pressable onPress={() => setIsSecure(!isSecure)}>
          <Ionicons name={isSecure ? 'eye-outline' : 'eye-off-outline'} size={22} color={COLORS.textGray} />
        </Pressable>
      ) : (
        <Ionicons name={iconName} size={20} color={COLORS.textGray} />
      )}
    </View>
  );
};

export default function Perfil() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={backgroundImage} 
      className='flex-1' 
      resizeMode='cover'
    >
      
     <View 
        className='pt-12 pb-6 px-6 flex-row items-center justify-center rounded-b-[30px] shadow-lg z-10 relative'
        style={{ backgroundColor: COLORS.pinkHeader }}
      >
        <Pressable 
          onPress={() => router.back()} 
          className='absolute left-6 bottom-6 bg-white/20 rounded-full p-2 z-20'
        >
           <Ionicons name='chevron-back' size={24} color='white' />
        </Pressable>
        
        <Text className='text-white text-xl font-bold'>Perfil</Text>

      </View>

      <View className='flex-1 bg-white rounded-t-[40px] -mt-16 px-6 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]'>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
          className='overflow-visible'
        >
          
          <View className='items-center -mt-16 mb-8'>
            <View className='h-32 w-32 rounded-full bg-white border-[3px] items-center justify-center relative shadow-sm' style={{ borderColor: COLORS.pinkHeader }}>
              <Ionicons name='camera-outline' size={50} color={COLORS.pinkHeader} style={{ opacity: 0.5 }} />
              
              <View className='absolute bottom-1 right-1 rounded-full p-[6px] border-[3px] border-white flex items-center justify-center shadow-sm' style={{ backgroundColor: COLORS.pinkHeader }}>
                 <Ionicons name='add' size={16} color='white' fontWeight='bold' />
              </View>
            </View>
          </View>

          <View className='mt-4'>
            <InputField placeholder='Nome Completo' iconName='pencil-outline' value='Nome Completo' />
            <InputField placeholder='CPF' iconName='pencil-outline' value='CPF' />
            <InputField placeholder='@ E-mail' iconName='pencil-outline' value='@ E-mail' />
            
            <InputField placeholder='Endereço' iconName='pencil-outline' showWarning={true} value='Endereço' />
            
            <InputField placeholder='Altere sua senha' iconName='pencil-outline' isPassword={true} />
            <InputField placeholder='Repita a senha' iconName='pencil-outline' isPassword={true} />
          </View>

          <Pressable 
            className='rounded-full py-4 items-center mt-8 mx-8 shadow-md active:opacity-90'
            style={{ backgroundColor: COLORS.greenButton }}
          >
            <Text className='text-white text-lg font-bold'>Concluido</Text>
          </Pressable>

        </ScrollView>
      </View>
    </ImageBackground>
  );
}