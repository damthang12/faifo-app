import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import logoStep from '../../assets/images/onboarding/step-logo.png';
import DialogueBox from "@/assets/images/onboarding/DialogueBox-md-ritgh.png";
import ArrLeft from "@/assets/images/arrow-left.png";


export default function OnboardingStep7() {
  const router = useRouter();

  const handleSkip = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push('/(onboardings)/step8');
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
                          className="top-[59px] w-full flex justify-center">
          <Image source={ArrLeft} className="h-6 w-6 "/>
        </TouchableOpacity>
        <View className="w-full h-full top-[110px] gap-10">
          <View className="flex  justify-center w-full flex-row gap-2">
            {/* Logo bên cạnh */}
            <Image source={logoStep} className="h-[120px] w-[96px]" resizeMode="contain" />
            {/* Khung hội thoại */}
            <View className="relative flex items-center justify-center z-10">
              <Image source={DialogueBox} className="h-[87px] w-[287px]" resizeMode="contain" />
              <Text className="text-base text-[#000000] font-beVN absolute">
                Sắp xong rồi, bạn chỉ cần nhập vài{'\n'} thông tin nữa thôi.
              </Text>
            </View>
          </View>

          <View className="w-full  flex flex-col justify-center gap-2">
            <Text className="text-[40px] text-[#8B3A00] font-phudu uppercase font-semibold">email của bạn là?</Text>
            <TextInput placeholder="Nhập email của bạn" className="text-sm w-full text-[#A4A7AE] border border-gray-400 rounded-[12px] p-4 font-beVN"></TextInput>
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
