import { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
// import * as SecureStore from 'expo-secure-store';
import logoFaifo from '../assets/images/onboarding/faifo-logo.png';
import selectLanguage from '../assets/images/onboarding/select-language.png';

const LANGUAGES = [
  { code: 'vi', label: '🇻🇳 Tiếng Việt (VI)' },
  { code: 'en', label: '🇬🇧 English (EN)' },
  { code: 'ko', label: '🇰🇷 한국어 (KR)' },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState<'splash' | 'language'>('splash');
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setStep('language'), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectLanguage = async (code: string) => {
    setSelected(code);
    // await SecureStore.setItemAsync('language', code);

  };

  const handleSkip = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push('/(onboardings)');
    }, 300);  };

  if (step === 'splash') {
    return (
        <View className="flex items-center justify-center w-full h-full bg-[#F99F04]">
          <Image source={logoFaifo} style={{ width: 178, height: 273 }} resizeMode="contain" />
        </View>
    );
  }

  return (
      <View className="flex items-center justify-center bg-white px-6 h-full">
        <Image source={selectLanguage} className="w-[336px] h-[339px] absolute z-0" resizeMode="contain" />
        <View className="top-[100px] absolute w-full h-full flex flex-col items-center">
          <Text className="text-[32px] font-bold mb-6 text-[#8B3A00] uppercase font-phudu">
            Select a language
          </Text>
          <View className="space-y-4 w-full">
            {LANGUAGES.map((lang) => (
                <Pressable
                    key={lang.code}
                    className="p-6 rounded-xl flex-row items-center justify-between border-b border-gray-300"
                    onPress={() => handleSelectLanguage(lang.code)}
                >
                  <Text className="text-xl font-semibold font-beVN">{lang.label}</Text>
                  <View
                      className={`w-6 h-6 rounded-full border-2 ${
                          selected === lang.code ? 'border-orange-500 ' : 'border-gray-400'
                      } items-center justify-center`}
                  >
                    {selected === lang.code && <View className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                  </View>
                </Pressable>
            ))}
          </View>
          </View>
        <TouchableOpacity onPress={handleSkip}  className="absolute bottom-10 h-[52px] w-full bg-[#F99F04] flex items-center justify-center  rounded-[32px]">
          <Text className="text-xl font-semibold text-[#FFFFFF] font-beVN">Tiếp theo</Text>
        </TouchableOpacity>

      </View>
  );
}
