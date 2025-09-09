import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import logoStep from "../../assets/images/mascot/Mascot9.png";

export default function BookingSuccess() {
  const router = useRouter();

  const handleSkip = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push("/(tabs)");
    }, 300);
  };
  const handleBack = () => {
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <View className="flex w-full items-center bg-[#8B3A00]  justify-center h-full px-6 gap-10">
      <View className=" w-full flex justify-center items-center">
        <Image
          source={logoStep}
          className="h-[287px] w-full "
          resizeMode="contain"
        />
      </View>
      <View className=" w-full max-w-[348px]  tablet:max-w-[420px] flex flex-col items-center justify-center gap-2">
        <Text className="text-2xl font-semibold text-white font-phudu uppercase">
          Đặt chỗ thành công! 🎉
        </Text>
        <Text className="text-base text-white text-center">
          Chúc mừng bạn! Chỗ bạn đã đặt đã được xác nhận. Faifan sẽ gửi thông
          tin chi tiết đến bạn qua email/ứng dụng.
        </Text>
      </View>

      <View className=" w-full flex items-center justify-center flex-row gap-4 ">
        <TouchableOpacity
          onPress={() => router.push("/booking/booked")}
          className="h-[52px] w-full max-w-[132px] tablet:max-w-[376px] px-4 flex items-center bg-[#FFF1CB] justify-center  rounded-[32px]"
        >
          <Text className="text-xl font-medium text-[#8B3A00]">
            Xem đặt chỗ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          className="h-[52px] w-full max-w-[189px] tablet:max-w-[376px] px-6 bg-[#F99F04] flex items-center justify-center  rounded-[32px]"
        >
          <Text className="text-xl font-medium text-[#FFFFFF] font-beVNSemibold">
            Khám phá thêm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
