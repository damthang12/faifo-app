import logoStep from "@/assets/images/mascot/Mascot1.png";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CameraScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-4 tablet:px-12 pt-20 tablet:pt-24">
      {/* Back button */}
      {/*<TouchableOpacity className="mb-4">*/}
      {/*    <Image source={ArrLeft} className="h-6 w-6" />*/}
      {/*</TouchableOpacity>*/}

      <Text className="text-[#351904] text-[40px] tablet:text-[48px] font-semibold uppercase font-phudu mb-10 tablet:mb-12">
        Ống kính Faifo
      </Text>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <View className="items-center">
          <Image
            source={logoStep}
            className="h-[290px] tablet:h-[350px] w-full mb-6 tablet:mb-8 mt-20 tablet:mt-24"
            resizeMode="contain"
          />
          <Text className="text-xl tablet:text-2xl font-semibold text-black font-beVNSemibold mb-2 tablet:mb-4 text-center">
            Khám phá Hội An qua ống kính của bạn
          </Text>
          <Text className="text-base tablet:text-2xl w-full tablet:max-w-[650px] font-beVN text-center mb-6 tablet:mb-8 px-4 tablet:px-8">
            Đưa camera lên bất kỳ địa điểm, bảng hiệu, hay ký tự nào trong phố
            cổ – Ứng dụng sẽ tự động nhận diện, dịch và hiển thị thông tin thú
            vị ngay trên màn hình!
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(app)/FaifoCamera")}
            className="bg-[#F99F04] p-5 tablet:p-6 rounded-full"
          >
            <Text className="text-white font-bold font-beVNSemibold text-xl tablet:text-2xl">
              Bắt đầu ngay
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
