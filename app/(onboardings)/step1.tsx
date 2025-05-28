import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import logoStep from '../../assets/images/mascot/Mascot1.png';
import gradient from '../../assets/images/onboarding/Gradient.png';
import DialogueBox from "@/assets/images/onboarding/DialogueBox - md.png";
import ArrLeft from "@/assets/images/arrow-left.png";

export default function OnboardingStep1() {
  const router = useRouter();

  const handleSkip = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push('/(onboardings)/step2');
    }, 300);
  };

  const handleBack = () => {
    setTimeout(() => {
      router.back();
    }, 300);
  };


  return (
      <View className="flex items-center bg-white w-full h-full px-6">
        <TouchableOpacity onPress={handleBack}
                          className="top-[59px] w-full flex justify-center">
          <Image source={ArrLeft} className="h-6 w-6 "/>
        </TouchableOpacity>

        <View className="top-[150px] w-full flex justify-center items-center z-10">
          <Image source={DialogueBox} className="h-[90px] w-full max-w-[175px] relative" resizeMode="contain"/>
          <Text className="text-base text-[#000000] font-beVN absolute text-center">  Xin chào bạn,{'\n'}mình tên là Faifan.
          </Text>
        </View>
        <View className="top-[80px] w-full flex justify-center items-center">

          <Image source={gradient} className="h-[510px] w-[510px] relative" resizeMode="contain"/>
          <Image source={logoStep} className="h-[292px] w-full  absolute" resizeMode="contain"/>
        </View>
        <View className=" w-full absolute bottom-8 flex flex-col gap-4">
          <TouchableOpacity onPress={handleSkip}
                            className="h-[52px] w-full bg-[#F99F04] flex items-center justify-center  rounded-[32px]">
            <Text className="text-xl font-semibold text-[#FFFFFF] font-beVN">Tiếp theo</Text>
          </TouchableOpacity>
        </View>


      </View>
  );
}
