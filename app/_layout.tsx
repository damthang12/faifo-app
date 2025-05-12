import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import '../global.css';


import { useColorScheme } from '@/hooks/useColorScheme';
import AppLayoutWrapper from "@/components/layout/AppLayout";


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Phudu: require('../assets/fonts/Phudu-VariableFont_wght.ttf'),
    BeVN: require('../assets/fonts/BeVietnamPro-SemiBold.ttf'),
  });

  if (!loaded) return null;

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <AppLayoutWrapper>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)"/>
                <Stack.Screen name="(onboardings)"/>
                <Stack.Screen name="(onboardings)/step1"/>
                <Stack.Screen name="(onboardings)/step2"/>
                <Stack.Screen name="(onboardings)/step3"/>
                <Stack.Screen name="(onboardings)/step4"/>
                <Stack.Screen name="(onboardings)/step5"/>
                <Stack.Screen name="(onboardings)/step6"/>
                <Stack.Screen name="(onboardings)/step7"/>
                <Stack.Screen name="(login)"/>
                <Stack.Screen name="+not-found"/>
              </Stack>
              <StatusBar style="auto"/>
            </AppLayoutWrapper>

          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
  );
}
