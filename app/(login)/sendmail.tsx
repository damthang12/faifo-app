import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import logoStep from '../../assets/images/mascot/Mascot8.png';
import gradient from '../../assets/images/onboarding/Gradient.png';


export default function SendmailScreen() {
  const router = useRouter();

  const handleSkip = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push('/(login)');
    }, 300);
  };
  const handleBack = () => {
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
      <View className="flex items-center bg-white w-full justify-center h-full px-6 ">
        <View className=" w-full flex justify-center items-center">
          <Image source={gradient} className="h-[510px] w-[510px] relative" resizeMode="contain"/>

          <View className="absolute flex flex-col items-center justify-center gap-10">
            <Image source={logoStep} className="h-[292px] w-full  " resizeMode="contain"/>
            <View className=" w-full max-w-[348px] flex flex-col items-center justify-center gap-2 z-20">
              <Text className="text-2xl font-semibold text-[#8B3A00] font-phudu uppercase">gửi mail thành công</Text>
              <Text className="text-base font-bold  font-beVN text-center">Faifan đã gửi mail đến địa chỉ email đăng ký tài khoản của bạn để cài lại mật khẩu. Kiểm tra hộp thư email của bạn nhé!</Text>
            </View>
          </View>

        </View>


        <View className=" w-full absolute bottom-8 flex flex-col gap-4">
          <TouchableOpacity onPress={handleSkip}
                            className="h-[52px] w-full bg-[#F99F04] flex items-center justify-center  rounded-[32px]">
            <Text className="text-xl font-semibold text-[#FFFFFF] font-beVNSemibold">Quay về</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}
