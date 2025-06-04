import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import logoStep from '../../assets/images/mascot/Mascot9.png';


export default function BookingSuccess() {
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
      <View className="flex w-full items-center bg-[#F7E9CE]  justify-center h-full px-6 gap-10">
        <View className=" w-full flex justify-center items-center">
          <Image source={logoStep} className="h-[287px] w-full " resizeMode="contain"/>
        </View>
        <View className=" w-full max-w-[348px] flex flex-col items-center justify-center gap-2">
          <Text className="text-2xl font-semibold text-[#8B3A00] font-phudu uppercase">Đặt chỗ thành công! 🎉</Text>
          <Text className="text-base font-bold  font-beVNBold text-center">Chúc mừng bạn! Chỗ bạn đã đặt đã được xác nhận. Faifan sẽ gửi thông tin chi tiết đến bạn qua email/ứng dụng.</Text>
        </View>

        <View className=" w-full flex items-center justify-center flex-row gap-4">
          <TouchableOpacity onPress={() => router.push('/booking/booked')}
                            className="h-[52px] px-4 flex items-center justify-center border border-[#F99F04] rounded-[32px]">
            <Text className="text-xl font-medium text-[#F99F04] font-beVNSemibold">Xem đặt chỗ</Text>
          </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(tabs)')}
                              className="h-[52px]  px-6 bg-[#F99F04] flex items-center justify-center  rounded-[32px]">
                <Text className="text-xl font-medium text-[#FFFFFF] font-beVNSemibold">Khám phá thêm</Text>
            </TouchableOpacity>
        </View>
      </View>
  );
}
