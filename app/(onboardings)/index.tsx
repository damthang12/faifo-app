import { useLanguageStore } from "@/store/useLanguageStore";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import welcome from "../../assets/images/onboarding/welcome-img-2.png";

export default function OnboardingScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useLanguageStore();

  const handleExplore = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push("/(onboardings)/step1");
    }, 300);
  };
  const handleLogin = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push("/(login)");
    }, 300);
  };

  return (
    <View className="flex items-center bg-white w-full h-full ">
      <Image
        source={welcome}
        className="h-[389px] tablet:h-[653px] w-[600px] tablet:w-full top-[59px] tablet:top-10"
        resizeMode="contain"
      />
      <View className=" flex tablet:hidden top-5 tablet:top-[-40px] w-full max-w-[393px] tablet:max-w-[836px]  flex-col items-center">
        <Text className="text-[48px] tablet:text-[72px] w-full text-center font-bold  text-[#8B3A00] uppercase font-phudu">
          {/*Khám phá Hội An theo cách riêng của bạn – chỉ với*/}
          {t("onboarding.onboarding_title_1")}
        </Text>
        <Text className="  text-[80px] w-full text-center font-bold mb-6 text-[#8B3A00] uppercase font-phudu">
          {t("onboarding.onboarding_title_2")}
        </Text>
      </View>

      <View className=" hidden tablet:flex top-5 tablet:top-[-40px] w-full max-w-[393px] tablet:max-w-[836px]  flex-col items-center">
        <Text className="text-[48px] tablet:text-[72px] w-full text-center font-bold  text-[#8B3A00] uppercase font-phudu">
          {/*Khám phá Hội An theo cách riêng của bạn – chỉ với*/}
          {t("onboarding.onboarding_title_1")}{" "}
          {t("onboarding.onboarding_title_2")}
        </Text>
      </View>
      <View className="px-6 w-full tablet:max-w-[768px] absolute bottom-8 flex flex-col gap-4">
        <TouchableOpacity
          onPress={handleExplore}
          className=" h-[52px] tablet:h-[60px] w-full bg-[#F99F04] flex items-center justify-center  rounded-[32px]"
        >
          <Text className="text-xl tablet:text-2xl font-semibold text-[#FFFFFF] font-beVNSemibold">
            {t("onboarding.onboarding_btn_1")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
          className="  h-[52px] tablet:h-[60px] w-full border border-[#F99F04] flex items-center justify-center  rounded-[32px]"
        >
          <Text className="text-xl tablet:text-2xl font-semibold text-[#F99F04] font-beVNSemibold">
            {t("onboarding.onboarding_btn_2")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
