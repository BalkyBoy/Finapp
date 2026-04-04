import { Stack } from "expo-router";
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from "react-native";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, setLoaded] = useState(false);

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Load fonts
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          ReadexBold: require('@/assets/fonts/ReadexPro-Bold.ttf'),
          ReadexMedium: require('@/assets/fonts/ReadexPro-Medium.ttf'),
          ReadexRegular: require('@/assets/fonts/ReadexPro-Regular.ttf'),
          ReadexLight: require('@/assets/fonts/ReadexPro-Light.ttf'),
          ReadexSemiBold: require('@/assets/fonts/ReadexPro-SemiBold.ttf'),

        });
        setLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  // Don’t render until fonts are loaded
  if (!loaded) {
    return null;
  }

  return (
   <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack
    screenOptions={{
      headerShown:false
  
    }}
    >
      <Stack.Screen name="(onboarding)"/>
      <Stack.Screen name="(auth)"/>
      <Stack.Screen name="(tabs)"/>
    </Stack>
   </ThemeProvider>
  );
}
