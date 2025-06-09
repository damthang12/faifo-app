import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import logoStep from '../../assets/images/mascot/Mascot7.png';
import {useTranslation} from "react-i18next";


export default function OnboardingSuccess() {
  const router = useRouter();
    const {t} = useTranslation()

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
          <Text className="text-2xl font-semibold text-[#8B3A00] font-phudu uppercase">
              {t('onboarding.step_10_title')}
          </Text>
          <Text className="text-base font-bold  font-beVNSemibold text-center">
              {t('onboarding.step_10_des')}
        </Text>
        </View>

        <View className=" w-full absolute bottom-8 flex flex-col gap-4">
          <TouchableOpacity onPress={handleSkip}
                            className="h-[52px] w-full bg-[#F99F04] flex items-center justify-center  rounded-[32px]">
            <Text className="text-xl font-medium text-[#FFFFFF] font-beVNMedium">
                {t('onboarding.step_10_btn')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}
