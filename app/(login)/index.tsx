import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import logoStep from '../../assets/images/onboarding/step-logo.png';
import ArrLeft from "@/assets/images/arrow-left.png";
import { useEffect, useState } from "react";
import gradient from "@/assets/images/onboarding/Gradient.png";


export default function LoginScreen() {
  const router = useRouter();
  const [step, setStep] = useState<'login' | 'success'>('login');


  const handleLogin = () => {
    setStep('success');

    setTimeout(() => {
      router.push('/(tabs)');
    }, 5000);
  };

  const handlePassword = () => {
    setTimeout(() => {
      router.push('/(login)/password');
    }, 300);
  };
  const handleBack = () => {
    setTimeout(() => {
      router.back();
    }, 300);
  };


  if (step === 'success') {
    return (
        <View className="flex items-center bg-white w-full justify-center h-full px-6 ">
          <View className=" w-full flex justify-center items-center">
            <Image source={gradient} className="h-[510px] w-[510px] relative" resizeMode="contain"/>

            <View className="absolute flex flex-col items-center justify-center gap-10">
              <Image source={logoStep} className="h-[292px] w-full  " resizeMode="contain"/>
              <View className=" w-full max-w-[348px] flex flex-col items-center justify-center gap-2 z-20">
                <Text className="text-2xl font-semibold text-[#8B3A00] font-phudu uppercase">đang đăng nhập...</Text>
                <Text className="text-base font-bold  font-beVN text-center">Faifan đang đăng nhập tài khoản của bạn. Xin vui lòng chờ xíu nhé!</Text>
              </View>
            </View>
          </View>


        </View>
    );
  }


  return (
      <View className="flex items-center bg-white w-full  h-full px-6 gap-10">
        <TouchableOpacity onPress={handleBack}
                          className="top-[59px] w-full flex justify-center">
          <Image source={ArrLeft} className="h-6 w-6 "/>
        </TouchableOpacity>
        <View className="top-[80px] w-full flex justify-center items-center gap-10">

          <View className=" w-full  flex flex-col justify-center gap-2">
            <Text className="text-[40px] text-[#8B3A00] font-phudu uppercase font-semibold">đăng nhập</Text>
            <Text className=" text-[#535862] font-beVN ">Chào mừng bạn trở lại với Hội An – nơi mỗi lần ghé là một lần nhớ.</Text>
          </View>

          <View className="w-full  flex flex-col justify-center gap-4">
            <View className="w-full  flex flex-col justify-center gap-2">
              <Text className="text-sm text-[#181D27] font-beVN">Email</Text>
              <TextInput placeholder="Nhập email của bạn" className="text-sm w-full text-[#A4A7AE] border border-gray-400 rounded-[12px] p-4 font-beVN"></TextInput>
            </View>

            <View className="w-full  flex flex-col justify-center gap-2">
              <Text className="text-sm text-[#181D27] font-beVN">Mật khẩu</Text>
              <TextInput placeholder="Nhập mật khẩu" className="text-sm w-full text-[#A4A7AE] border border-gray-400 rounded-[12px] p-4 font-beVN"></TextInput>
            </View>

            <View className="w-full  flex flex-col justify-center gap-12 items-center">
              <TouchableOpacity onPress={handleLogin}
                                className="h-[52px] w-full bg-[#F99F04] flex items-center justify-center  rounded-[32px] top-5">
                <Text className="text-xl font-medium text-[#FFFFFF] font-beVN">Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePassword}
                                className=" w-full flex items-center justify-center  ">
                <Text className=" text-[#F99F04] font-semibold font-beVN">Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>

          </View>



        </View>

        <View className=" w-full absolute bottom-8 flex flex-col items-center gap-4">
          <Text className="text-gray-400">Hoặc</Text>
          <TouchableOpacity onPress={handlePassword}
                            className="h-[52px] w-full border border-[#A4A7AE] flex items-center justify-center  rounded-[32px]">
            <Text className="text-xl font-medium text-gray-500 font-beVN">Đăng nhập với Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePassword}
                            className="h-[52px] w-full border border-[#A4A7AE]  flex items-center justify-center  rounded-[32px]">
            <Text className="text-xl font-medium text-gray-500 font-beVN">Đăng nhập với Facebook</Text>
          </TouchableOpacity>
          <Text className="text-base  text-[#535862] text-center font-beVN">
            Bằng cách tiếp tục, bạn đồng ý với{' '}
            <Text className="text-black font-semibold">Điều khoản Sử dụng</Text> và{' '}
            <Text className="text-black font-semibold">Chính sách Bảo mật</Text> của chúng tôi.
          </Text>
        </View>
      </View>
  );
}
