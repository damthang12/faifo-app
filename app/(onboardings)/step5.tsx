import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import logoStep from '../../assets/images/mascot/Mascot6.png';
import logoStep2 from '../../assets/images/mascot/Mascot3.png';
import gradient from '../../assets/images/onboarding/Gradient.png';
import DialogueBox from "@/assets/images/onboarding/DialogueBox - lg-right.png";
import ArrLeft from "@/assets/images/arrow-left.png";
import { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";


const LANGUAGES = [
  { code: 'vh', label: 'Du lịch cá nhân' },
  { code: 'tn', label: 'Du lịch với gia đình' },
  { code: 'ms', label: 'Du lịch với bạn bè' },
  { code: 'nd', label: 'Du lịch kết hợp công tác' },
];

export default function OnboardingStep5() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<'loading' | 'profile'>('loading');
    const {t} = useTranslation()

  useEffect(() => {
    const timer = setTimeout(() => setStep('profile'), 3000);
    return () => clearTimeout(timer);
  }, []);


  const handleSkip = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push('/(onboardings)/step6');
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

  if (step === 'loading') {
    return (
        <View className="flex items-center bg-white w-full h-full px-6 ">
          <TouchableOpacity onPress={handleBack}
                            className="top-[59px] w-full flex justify-center">
            {/*<Image source={ArrLeft} className="h-6 w-6 "/>*/}
          </TouchableOpacity>
          <View className="top-[150px] w-full flex justify-center items-center z-10">
            <Image source={DialogueBox} className="h-[105px] w-full max-w-[304px] relative" resizeMode="contain"/>
            <Text className="text-base text-[#000000] font-beVN absolute text-center">
                {t('onboarding.step_5')}
            </Text>
          </View>
          <View className="top-20 w-full flex justify-center items-center">

            <Image source={gradient} className="h-[510px] w-[510px] relative" resizeMode="contain"/>
            <Image source={logoStep} className="h-[292px] w-full  absolute" resizeMode="contain"/>
          </View>
          <View className=" w-full  flex flex-col items-center justify-center gap-2">
              <Text className="text-2xl font-semibold text-[#8B3A00] font-phudu uppercase">
                  {t('onboarding.step_5_title')}

              </Text>
              <Text className="text-base font-bold  font-beVN text-center">
                  {t('onboarding.step_5_des')}
              </Text>
          </View>
        </View>
    );
  }

  return (
      <View className="flex flex-col items-center bg-white w-full h-full px-6 ">
          <TouchableOpacity onPress={handleBack}
                            className="top-[59px] w-full flex flex-row gap-5 items-center">
              <Image source={ArrLeft} className="h-6 w-6" />
              <View className=" flex items-start ">
                  <View className="h-[21px] bg-[#F99F04] w-1/3 absolute z-10 rounded-full" />
                  <View className="h-[21px] bg-gray-100 w-[346px] relative rounded-full" />
              </View>
          </TouchableOpacity>
        <View className="w-full h-full top-[110px] gap-10">
          <View className="flex  justify-center w-full flex-row">
            {/* Logo bên cạnh */}
            <Image source={logoStep2} className="h-[120px] w-[96px]" resizeMode="contain" />
            {/* Khung hội thoại */}
            <View className="relative flex items-center justify-center z-10">
              <Image source={DialogueBox} className="h-[87px] w-[287px]" resizeMode="contain" />
              <Text className="text-base text-[#000000] font-beVN absolute">
                  {t('onboarding.step_6')}
              </Text>
            </View>
          </View>

          <View className="w-full  flex flex-col justify-center gap-2">
            <Text className="text-[40px] text-[#8B3A00] font-phudu uppercase font-semibold ">
                {t('onboarding.step_6_title')}
            </Text>
            <TextInput placeholder="Nhập số tuổi của bạn" className="text-sm w-full text-[#181D27] border border-gray-400 rounded-[12px] p-4 font-beVN"></TextInput>


          </View>

        </View>

        <View className=" w-full absolute bottom-8 flex flex-col gap-4">
          <TouchableOpacity onPress={handleSkip}
                            className="h-[52px] w-full bg-[#F99F04] flex items-center justify-center  rounded-[32px]">
            <Text className="text-xl font-medium text-[#FFFFFF] font-beVNSemibold">
                {t('onboarding.language_btn')}
            </Text>
          </TouchableOpacity>
        </View>


      </View>
  );
}
