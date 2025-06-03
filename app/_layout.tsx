import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-reanimated';
import '../global.css';
import { StyleSheet } from 'react-native';


import {useColorScheme} from '@/hooks/useColorScheme';
import AppLayoutWrapper from "@/components/layout/AppLayout";


export default function RootLayout() {
    const colorScheme = useColorScheme();


    const [loaded] = useFonts({
        'BeVN-Thin': require('@/assets/fonts/BeVietnamPro-Thin.ttf'),
        'BeVN-ExtraLight': require('@/assets/fonts/BeVietnamPro-ExtraLight.ttf'),
        'BeVN-Light': require('@/assets/fonts/BeVietnamPro-Light.ttf'),
        'BeVN-Regular': require('@/assets/fonts/BeVietnamPro-Regular.ttf'),
        'BeVN-Medium': require('@/assets/fonts/BeVietnamPro-Medium.ttf'),
        'BeVN-SemiBold': require('@/assets/fonts/BeVietnamPro-SemiBold.ttf'),
        'BeVN-Bold': require('@/assets/fonts/BeVietnamPro-Bold.ttf'),
        'BeVN-ExtraBold': require('@/assets/fonts/BeVietnamPro-ExtraBold.ttf'),
        'BeVN-Black': require('@/assets/fonts/BeVietnamPro-Black.ttf'),
        'Phudu': require('@/assets/fonts/Phudu-VariableFont_wght.ttf'),
    });

    if (!loaded) return null

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaProvider>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <AppLayoutWrapper>
                        <Stack screenOptions={{headerShown: false}}>
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
                            <Stack.Screen name="(app)"/>
                            <Stack.Screen name="+not-found"/>
                        </Stack>
                        <StatusBar style="auto"/>
                    </AppLayoutWrapper>
                </ThemeProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

