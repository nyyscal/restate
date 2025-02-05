import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { login } from '@/lib/appwrite'
import { useGlobaleContext } from '@/lib/global-provider'
import { Redirect } from 'expo-router'

const SignIn = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { refetch, loading, isLoggedIn } = useGlobaleContext();

  // Redirect if already logged in
  if (!loading && isLoggedIn) return <Redirect href="/" />;
  
  const handleLogin = async () => {
    if (isLoggingIn) return;
    
    setIsLoggingIn(true);
    try {
      const result = await login();
      if (result) {
        console.log("Login successful, refreshing user data");
        await refetch();
      } else {
        Alert.alert("Login Failed", "The login process was canceled or failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An unexpected error occurred during login. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image source={images.onboarding} className="w-full h-4/6" resizeMode="contain" />
        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">Welcome to Restate</Text>
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Find your {"\n"}
            <Text className="text-primary-300">ideal home</Text>
          </Text>
          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to Restate with Google
          </Text>
          <TouchableOpacity 
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
            onPress={handleLogin}
            disabled={isLoggingIn}
          >
            <View className="flex flex-row items-center justify-center">
              <Image source={icons.google} className="w-5 h-5" resizeMode="contain" />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                {isLoggingIn ? 'Logging in...' : 'Continue with Google'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
 