import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import logoStep from '../../assets/images/mascot/Mascot5.png';
import DialogueBox from "@/assets/images/onboarding/DialogueBox - sm.png";
import ArrLeft from "@/assets/images/arrow-left.png";
import { useState } from "react";
import {useTranslation} from "react-i18next";


const LANGUAGES = [
  { code: 'vh', label: 'Du lịch cá nhân' },
  { code: 'tn', label: 'Du lịch với gia đình' },
  { code: 'ms', label: 'Du lịch với bạn bè' },
  { code: 'nd', label: 'Du lịch kết hợp công tác' },
];

export default function OnboardingStep4() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const {t} = useTranslation()


  const handleSkip = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push('/(onboardings)/step5');
    }, 300);
  };
  const handleBack = () => {
    setTimeout(() => {
      router.back();
    }, 300);
  };

  const handleSelectLanguage = async (code: string) => {
    setSelected(code);
    // await SecureStore.setItemAsync('language', code);

  };

  return (
      <View className="flex flex-col items-center bg-white w-full h-full px-6 ">
        <TouchableOpacity onPress={handleBack}
                          className="top-[59px] w-full flex flex-row gap-5 items-center">
          <Image source={ArrLeft} className="h-6 w-6" />
          <View className=" flex items-start w-auto ">
            <View className="h-[21px] bg-[#F99F04] w-full absolute z-10 rounded-full" />
            <View className="h-[21px] bg-gray-100 w-[346px] relative rounded-full" />
          </View>
        </TouchableOpacity>
        <View className="w-full h-full top-[110px] gap-10">
          <View className="flex  justify-center w-full flex-row items-center space-x-2 gap-2">
            {/* Logo bên cạnh */}
            <Image source={logoStep} className="h-[120px] w-[96px]" resizeMode="contain" />
            {/* Khung hội thoại */}
            <View className="relative flex items-center justify-center z-10">
              <Image source={DialogueBox} className="h-[45px] w-[287px]" resizeMode="contain" />
              <Text className="text-base text-[#000000] font-beVN absolute text-center w-[250px] top-[10px]">
                {t('onboarding.step_4')}
              </Text>
            </View>
          </View>

          <View className="w-full h-full">
            <Text className="text-sm text-[#A4A7AE] font-beVN">
              {t('onboarding.step_4_choose')}

            </Text>

            {LANGUAGES.map((lang) => (
                <Pressable
                    key={lang.code}
                    className="py-6 rounded-xl flex-row items-center gap-4  "
                    onPress={() => handleSelectLanguage(lang.code)}
                >
                  <View
                      className={`w-6 h-6 rounded-full border-2 ${
                          selected === lang.code ? 'border-orange-500 ' : 'border-gray-400'
                      } items-center justify-center`}
                  >
                    {selected === lang.code && <View className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                  </View>
                  <Text className="text-base font-beVN">{lang.label}</Text>

                </Pressable>
            ))}
          </View>

        </View>

        <View className=" w-full absolute bottom-8 flex flex-col gap-4">
          <TouchableOpacity onPress={handleSkip}
                            className="h-[52px] w-full bg-[#F99F04] flex items-center justify-center  rounded-[32px]">
            <Text className="text-xl font-semibold text-[#FFFFFF] font-beVNSemibold">
              {t('onboarding.step_4_btn')}
            </Text>
          </TouchableOpacity>
        </View>


      </View>
  );
}
