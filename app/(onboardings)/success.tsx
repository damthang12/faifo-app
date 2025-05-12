import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import logoStep from '../../assets/images/onboarding/step-logo.png';
import DialogueBox from "@/assets/images/onboarding/DialogueBox-md-ritgh.png";
import ArrLeft from "@/assets/images/arrow-left.png";
import gradient from "@/assets/images/onboarding/Gradient.png";


export default function OnboardingSuccess() {
  const router = useRouter();

  const handleSkip = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push('/(tabs)');
    }, 300);
  };
  const handleBack = () => {
    setTimeout(() => {
      router.back();
    }, 300);
  };


  return (
      <View className="flex items-center bg-white w-full justify-center h-full px-6 gap-10">
        <View className=" w-full flex justify-center items-center">
          <Image source={logoStep} className="h-[287px] w-full " resizeMode="contain"/>
        </View>
        <View className=" w-full max-w-[348px] flex flex-col items-center justify-center gap-2">
          <Text className="text-2xl font-semibold text-[#8B3A00] font-phudu uppercase">tạo tài khoản thành công!</Text>
          <Text className="text-base font-bold  font-beVN text-center">Chúc mừng bạn đã tạo tài khoản thành công. Cùng Faifan bắt đầu cuộc hành trình khám phá Hội An thôi nào!</Text>
        </View>

        <View className=" w-full absolute bottom-8 flex flex-col gap-4">
          <TouchableOpacity onPress={handleSkip}
                            className="h-[52px] w-full bg-[#F99F04] flex items-center justify-center  rounded-[32px]">
            <Text className="text-xl font-medium text-[#FFFFFF] font-beVN">Đi tới Hội An thôi nào!</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}
