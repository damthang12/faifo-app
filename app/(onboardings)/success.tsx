import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import logoStep from "../../assets/images/mascot/Mascot7.png";

export default function OnboardingSuccess() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleSkip = () => setTimeout(() => router.push("/(tabs)"), 300);

  return (
    <View className="flex flex-1 items-center bg-white w-full px-6">
      {/* Content center */}
      <View className="flex-1 w-full max-w-[420px] tablet:max-w-[900px] self-center items-center justify-center gap-10 mt-8 tablet:mt-12">
        <View className="w-full items-center">
          <Image
            source={logoStep}
            resizeMode="contain"
            className="w-full h-[287px] max-w-[420px] tablet:max-w-[540px] tablet:h-[360px]"
          />
        </View>

        <View className="w-full max-w-[348px] items-center gap-2">
          <Text className="text-2xl font-semibold text-[#8B3A00] font-phudu uppercase text-center">
            {t("onboarding.step_10_title")}
          </Text>
          <Text className=" tablet:text-lg font-beVNSemibold text-center">
            {t("onboarding.step_10_des")}
          </Text>
        </View>
      </View>

      {/* CTA bottom (không absolute) */}
      <View className="w-full max-w-[500px] tablet:max-w-[768px] self-center mb-10 tablet:mb-12">
        <TouchableOpacity
          onPress={handleSkip}
          activeOpacity={0.85}
          className="h-[52px] tablet:h-[60px] w-full bg-[#F99F04] rounded-[32px] items-center justify-center"
        >
          <Text className="text-xl tablet:text-2xl font-medium text-white font-beVNMedium">
            {t("onboarding.step_10_btn")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
