import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import logoStep from '../../assets/images/mascot/Mascot3.png';
import DialogueBox from "@/assets/images/onboarding/DialogueBox-md-ritgh.png";
import ArrLeft from "@/assets/images/arrow-left.png";
import {useTranslation} from "react-i18next";


export default function OnboardingStep6() {
  const router = useRouter();
  const {t} = useTranslation()

  const handleSkip = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push('/(onboardings)/step7');
    }, 300);
  };
  const handleBack = () => {
    setTimeout(() => {
      router.back();
    }, 300);
  };


  return (
      <View className="flex flex-col items-center bg-white w-full h-full px-6 ">
        <TouchableOpacity onPress={handleBack}
                          className="top-[59px] w-full flex flex-row gap-5 items-center">
          <Image source={ArrLeft} className="h-6 w-6" />
          <View className=" flex items-start w-auto ">
            <View className="h-[21px] bg-[#F99F04] w-1/2 absolute z-10 rounded-full" />
            <View className="h-[21px] bg-gray-100 w-[346px] relative rounded-full" />
          </View>
        </TouchableOpacity>
        <View className="w-full h-full top-[110px] gap-10">
          <View className="flex  justify-center w-full flex-row gap-2">
            {/* Logo bên cạnh */}
            <Image source={logoStep} className="h-[120px] w-[96px]" resizeMode="contain" />
            {/* Khung hội thoại */}
            <View className="relative flex items-center justify-center z-10">
              <Image source={DialogueBox} className="h-[87px] w-[287px]" resizeMode="contain" />
              <Text className="text-base text-[#000000] font-beVN absolute">
                {t('onboarding.step_7')}
              </Text>
            </View>
          </View>

          <View className="w-full  flex flex-col justify-center gap-2">
            <Text className="text-[40px] text-[#8B3A00] font-phudu uppercase font-semibold">
              {t('onboarding.step_7_title')}
            </Text>
            <TextInput placeholder="Nhập tên của bạn" className="text-sm w-full text-[#181D27] border border-gray-400 rounded-[12px] p-4 font-beVN"/>
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
