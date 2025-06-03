import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import welcome from '../../assets/images/onboarding/welcome-img.png';



export default function OnboardingScreen() {
  const router = useRouter();

  const handleExplore = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push('/(onboardings)/step1');
    }, 300);
  };
  const handleLogin = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push('/(login)');
    }, 300);
  };


  return (
      <View className="flex items-center bg-white w-full h-full ">
        <Image source={welcome} className="h-[389px] w-full top-[59px]" resizeMode="contain"/>
        <View className="top-5 w-full max-w-[393px] flex flex-col items-center">
          <Text className="text-[48px] w-full text-center font-bold  text-[#8B3A00] uppercase font-phudu">
            Khám phá Hội An theo cách riêng của bạn – chỉ với
          </Text>
          <Text className="text-[80px] w-full text-center font-bold mb-6 text-[#8B3A00] uppercase font-phudu">
            một chạm
          </Text>

        </View>
        <View className="px-6 w-full absolute bottom-8 flex flex-col gap-4">
          <TouchableOpacity onPress={handleExplore}
                            className="h-[52px] w-full bg-[#F99F04] flex items-center justify-center  rounded-[32px]">
            <Text className="text-xl font-semibold text-[#FFFFFF] font-beVNSemibold">Khám phá ngay</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin}
                            className=" h-[52px] w-full border border-[#F99F04] flex items-center justify-center  rounded-[32px]">
            <Text className="text-xl font-semibold text-[#F99F04] font-beVNSemibold">Tôi đã có tài khoản</Text>
          </TouchableOpacity>
        </View>


      </View>
  );
}
