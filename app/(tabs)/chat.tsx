import {Image, Text, TouchableOpacity, View} from 'react-native';
import gradient from "@/assets/images/onboarding/Gradient.png";
import logoStep from "@/assets/images/mascot/Mascot1.png";
import {useRouter} from "expo-router";


export default function ChatScreen() {
  const router = useRouter();

  const handleSkip = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push('/(app)/chatbot');
    }, 300);
  };
  const handleBack = () => {
    setTimeout(() => {
      router.back();
    }, 300);
  };


  return (
      <View className="flex items-center bg-white w-full h-full px-4 ">
        {/*<TouchableOpacity onPress={handleBack}*/}
        {/*                  className="top-[59px] w-full flex justify-center">*/}
        {/*  <Image source={ArrLeft} className="h-6 w-6 "/>*/}
        {/*</TouchableOpacity>*/}
        <View className="top-[60px] w-full flex justify-center z-10">
          <Text className="text-[40px] uppercase text-[#351904] font-phudu font-semibold">
            Trợ lý ảo faifan
          </Text>
        </View>
        <View className=" w-full flex justify-center items-center top-[120px]">
          <Image source={gradient} className="h-[510px] w-[510px] relative" resizeMode="contain"/>

          <View className="absolute flex flex-col items-center justify-center gap-10">
            <Image source={logoStep} className="h-[292px] w-full  " resizeMode="contain"/>
            <View className=" w-full max-w-[348px] flex flex-col items-center justify-center gap-2 z-20">
              <Text className="text-2xl font-semibold text-[#8B3A00] font-phudu uppercase">Chào (Tên người dùng khi đăng ký)</Text>
              <Text className="text-base font-bold  font-beVN text-center">Mình là Faifan, trợ thủ du lịch của riêng bạn</Text>
            </View>
          </View>

          <View className="  flex flex-col ">
            <TouchableOpacity onPress={handleSkip}
                              className="p-4  bg-[#F99F04] flex items-center justify-center  rounded-[32px]">
              <Text className="text-xl font-medium text-[#FFFFFF] font-beVNSemibold">Trò chuyện với Faifan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
}
