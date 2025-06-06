import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import logoStep from '../../assets/images/mascot/Mascot9.png';
import ArrLeft from "@/assets/images/arrow-left.png";
import { useEffect, useState } from "react";
import gradient from "@/assets/images/onboarding/Gradient.png";


export default function LoginScreen() {
  const router = useRouter();
  const [step, setStep] = useState<'login' | 'success'>('login');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLoginGG = () => {
    setTimeout(() => {
      router.push('/(noti)/NoSupport');
    }, 300);
  };

  const handleLoginFb = () => {
    setTimeout(() => {
      router.push('/(noti)/NoSupport');
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
                <Text className="text-base font-bold  font-beVNSemibold text-center">Faifan đang đăng nhập tài khoản của bạn.{'\n'} Xin vui lòng chờ xíu nhé!</Text>
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
              <Text className="text-sm text-[#181D27] font-beVNSemibold">Email</Text>
              <TextInput placeholder="Nhập email của bạn" className="text-sm w-full text-[#181D27] border border-gray-400 rounded-[12px] p-4 font-beVN"></TextInput>
            </View>

            <View className="w-full flex flex-col justify-center gap-2">
              <Text className="text-sm text-[#181D27] font-beVNSemibold">Mật khẩu</Text>

              <View className="relative">
                <TextInput
                    textContentType="password"
                    secureTextEntry={!showPassword}
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChangeText={setPassword}
                    className=" w-full text-[#181D27] border border-gray-400 rounded-[12px] p-4 pr-12 font-beVN"
                />

                {/*<TouchableOpacity*/}
                {/*    className="absolute right-4 top-4"*/}
                {/*    onPress={() => setShowPassword(!showPassword)}*/}
                {/*>*/}
                {/*  {showPassword ? (*/}
                {/*      <Eye size={20} color="#181D27" />*/}
                {/*  ) : (*/}
                {/*      <EyeOff size={20} color="#181D27" />*/}
                {/*  )}*/}
                {/*</TouchableOpacity>*/}
              </View>
            </View>

            <View className="w-full  flex flex-col justify-center gap-12 items-center">
              <TouchableOpacity onPress={handleLogin}
                                className="h-[52px] w-full bg-[#F99F04] flex items-center justify-center  rounded-[32px] top-5">
                <Text className="text-xl font-medium text-[#FFFFFF] font-beVNSemibold">Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePassword}
                                className=" w-full flex items-center justify-center  ">
                <Text className=" text-[#F99F04] font-semibold font-beVNSemibold">Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>

          </View>



        </View>

        <View className=" w-full absolute bottom-8 flex flex-col items-center gap-4">
          <Text className="text-gray-400">Hoặc</Text>
          <TouchableOpacity onPress={handleLoginGG}
                            className="h-[52px] w-full border border-[#A4A7AE] flex items-center justify-center  rounded-[32px]">
            <Text className="text-xl font-medium text-gray-500 font-beVNSemibold">Đăng nhập với Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLoginFb}
                            className="h-[52px] w-full border border-[#A4A7AE]  flex items-center justify-center  rounded-[32px]">
            <Text className="text-xl font-medium text-gray-500 font-beVNSemibold">Đăng nhập với Facebook</Text>
          </TouchableOpacity>
          <Text className="text-base  text-[#535862] text-center font-beVN">
            Bằng cách tiếp tục, bạn đồng ý với{' '}
            <Text className="text-black font-semibold font-beVNSemibold">Điều khoản Sử dụng</Text> và{' '}
            <Text className="text-black font-semibold font-beVNSemibold">Chính sách Bảo mật</Text> của chúng tôi.
          </Text>
        </View>
      </View>
  );
}