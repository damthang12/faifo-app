import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import logoStep from '../../assets/images/onboarding/step-logo.png';
import gradient from '../../assets/images/onboarding/Gradient.png';
import DialogueBox from "@/assets/images/onboarding/DialogueBox - lg-right.png";
import ArrLeft from "@/assets/images/arrow-left.png";
import { useEffect, useState } from "react";


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
            <Image source={ArrLeft} className="h-6 w-6 "/>
          </TouchableOpacity>
          <View className="top-[150px] w-full flex justify-center items-center z-10">
            <Image source={DialogueBox} className="h-[105px] w-full max-w-[304px] relative" resizeMode="contain"/>
            <Text className="text-base text-[#000000] font-beVN absolute text-center">
              Faifan đang cá nhân hoá hồ{'\n'} sơ của bạn. Chờ xíu nhé!
            </Text>
          </View>
          <View className="top-20 w-full flex justify-center items-center">

            <Image source={gradient} className="h-[510px] w-[510px] relative" resizeMode="contain"/>
            <Image source={logoStep} className="h-[292px] w-full  absolute" resizeMode="contain"/>
          </View>
          <View className=" w-full  flex flex-col items-center justify-center gap-2">
              <Text className="text-2xl font-semibold text-[#8B3A00] font-phudu uppercase">đang tạo hồ sơ...</Text>
              <Text className="text-base font-bold  font-beVN text-center">Hệ thống đang cá nhân hoá hồ sơ của bạn.{'\n'} Vui lòng đợi trong giây lát.</Text>
          </View>
        </View>
    );
  }

  return (
      <View className="flex flex-col items-center bg-white w-full h-full px-6 ">
        <TouchableOpacity onPress={handleBack}
                          className="top-[59px] w-full flex justify-center">
          <Image source={ArrLeft} className="h-6 w-6 "/>
        </TouchableOpacity>
        <View className="w-full h-full top-[110px] gap-10">
          <View className="flex  justify-center w-full flex-row">
            {/* Logo bên cạnh */}
            <Image source={logoStep} className="h-[120px] w-[96px]" resizeMode="contain" />
            {/* Khung hội thoại */}
            <View className="relative flex items-center justify-center z-10">
              <Image source={DialogueBox} className="h-[87px] w-[287px]" resizeMode="contain" />
              <Text className="text-base text-[#000000] font-beVN absolute">
                Để có thể đưa ra gợi ý phù hợp,{'\n'} bạn vui lòng cho Faifan biết tuổi{'\n'} của bạn nha?
              </Text>
            </View>
          </View>

          <View className="w-full  flex flex-col justify-center gap-2">
            <Text className="text-[40px] text-[#8B3A00] font-phudu uppercase font-semibold">bạn bao nhiêu tuổi?</Text>
            <TextInput placeholder="Nhập số tuổi của bạn" className="text-sm w-full text-[#A4A7AE] border border-gray-400 rounded-[12px] p-4 font-beVN"></TextInput>


          </View>

        </View>

        <View className=" w-full absolute bottom-8 flex flex-col gap-4">
          <TouchableOpacity onPress={handleSkip}
                            className="h-[52px] w-full bg-[#F99F04] flex items-center justify-center  rounded-[32px]">
            <Text className="text-xl font-medium text-[#FFFFFF] font-beVN">Tiếp theo</Text>
          </TouchableOpacity>
        </View>


      </View>
  );
}
