import { Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ArrLeft from "@/assets/images/arrow-left.png";
import { useState } from "react";

export default function PasswordScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSkip = () => {
    setTimeout(() => {
      router.push('/(login)/sendmail');
    }, 300);
  };

  const handleBack = () => {
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1 bg-white"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1 items-center px-6 gap-10">
            <TouchableOpacity onPress={handleBack} className="mt-[59px] w-full flex justify-center">
              <Image source={ArrLeft} className="h-6 w-6" />
            </TouchableOpacity>

            <View className="mt-[80px] w-full items-center gap-10">
              <View className="w-full gap-2">
                <Text className="text-[40px] text-[#8B3A00] font-phudu uppercase font-semibold">Quên mật khẩu</Text>
                <Text className="text-[#535862] font-beVN">
                  Nhập email mà bạn đã đăng ký trước đó để nhận đường dẫn cài lại mật khẩu
                </Text>
              </View>

              <View className="w-full gap-4">
                <View className="w-full gap-2">
                  <Text className="text-sm text-[#181D27] font-beVN">Email</Text>
                  <TextInput
                      placeholder="Nhập email của bạn"
                      className="text-sm text-[#A4A7AE] border border-gray-400 rounded-[12px] p-4 font-beVN"
                      keyboardType="email-address"
                      autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View className="absolute bottom-8 w-full px-6">
          <TouchableOpacity
              onPress={handleSkip}
              className="h-[52px] w-full bg-[#F99F04] items-center justify-center rounded-[32px]"
          >
            <Text className="text-xl font-semibold text-white font-beVNSemibold">Tiếp theo</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
  );
}
