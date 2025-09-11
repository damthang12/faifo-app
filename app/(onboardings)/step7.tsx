import ArrLeft from "@/assets/images/arrow-left.png";
import DialogueBox from "@/assets/images/onboarding/DialogueBox-md-ritgh.png";
import { useAudio } from "@/hooks/useAudio";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import logoStep from "../../assets/images/mascot/Mascot3.png";
import AudioControls from "../../components/AudioControls";

export default function OnboardingStep7() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const {
    loadAudio,
    togglePlayPause,
    isPlaying,
    isLoading,
    stop,
    hasAudio,
    error,
  } = useAudio({
    autoPlay: true,
  });

  useEffect(() => {
    // Load step7 audio when component mounts
    const audioPath = `assets/audio/onboarding/${language}/step8.mp3`;
    loadAudio(audioPath);

    return () => {
      // Cleanup sẽ được handle bởi useAudio hook
    };
  }, [language]); // Chỉ phụ thuộc vào language, không phụ thuộc vào loadAudio và stop

  const handleSkip = () =>
    setTimeout(() => router.push("/(onboardings)/step8"), 300);
  const handleBack = () => setTimeout(() => router.back(), 300);

  return (
    <View className="flex flex-1 items-center bg-white w-full">
      {/* Header + Progress (ngang hàng) */}
      <View className="w-full max-w-[420px] tablet:max-w-full px-4 tablet:px-6 self-center flex-row items-center justify-between mt-[59px] tablet:mt-12">
        {/* Back */}
        <TouchableOpacity
          onPress={handleBack}
          className="flex-row items-center"
        >
          <Image source={ArrLeft} className="w-6 h-6" />
        </TouchableOpacity>

        {/* Progress (giữ 2/3 như bản gốc) */}
        <View className="flex-1 ml-4">
          <View className="w-full h-[21px] bg-gray-100 rounded-full overflow-hidden">
            <View className="h-full w-3/4 bg-[#F99F04]" />
          </View>
        </View>
      </View>

      {/* Body */}
      <View className="flex-1 w-full max-w-[420px]  tablet:max-w-full px-4 tablet:px-6 self-center mt-16 tablet:mt-20 gap-8">
        {/* Mascot + Dialogue */}
        <View className="w-full flex-row items-center  gap-2">
          <Image
            source={logoStep}
            resizeMode="contain"
            className="w-[96px] h-[120px] tablet:w-[210px] tablet:h-[250px]"
          />
          <View className="relative items-center justify-center">
            <Image
              source={DialogueBox}
              resizeMode="contain"
              className="w-[287px] h-[87px] tablet:w-[360px] tablet:h-[100px]"
            />
            <Text className="font-beVN text-base tablet:text-[18px] text-black absolute text-center px-3">
              {t("onboarding.step_8")}
            </Text>
          </View>
        </View>

        {/* Form */}
        <View className="w-full items-start gap-3">
          <Text className="text-[40px] tablet:text-[48px] text-[#8B3A00] font-phudu uppercase font-semibold">
            {t("onboarding.step_8_title")}
          </Text>
          <TextInput
            placeholder="Nhập email của bạn"
            className="w-full text-sm tablet:text-base text-[#181D27] border border-gray-400 rounded-[12px] p-4 font-beVN"
          />
        </View>
      </View>

      {/* CTA bottom (không absolute) */}
      <View className="w-full max-w-[500px] tablet:max-w-[900px] self-center mb-10 tablet:mb-12 px-6">
        {/* Audio Controls */}
        <View className="hidden">
          <AudioControls
            isPlaying={isPlaying}
            isLoading={isLoading}
            onTogglePlayPause={togglePlayPause}
            onStop={stop}
            size="medium"
            showStopButton={true}
            hasAudio={hasAudio}
            error={error}
          />
        </View>

        <TouchableOpacity
          onPress={handleSkip}
          activeOpacity={0.85}
          className="w-full h-[52px] tablet:h-[60px] bg-[#F99F04] rounded-[32px] items-center justify-center"
        >
          <Text className="font-beVNSemibold text-xl tablet:text-[22px] font-medium text-white">
            {t("onboarding.language_btn")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
