import ArrLeft from "@/assets/images/arrow-left.png";
import DialogueBox from "@/assets/images/onboarding/DialogueBox - sm.png";
import { useAudio } from "@/hooks/useAudio";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import logoStep from "../../assets/images/mascot/Mascot3.png";
import AudioControls from "../../components/AudioControls";

const LANGUAGES = [
  { code: "vh", label: "Văn hoá & lịch sử" },
  { code: "tn", label: "Thiên nhiên & khám phá" },
  { code: "ms", label: "Mua sắm & ẩm thực" },
  { code: "nd", label: "Nghỉ dưỡng & thư giãn" },
];

export default function OnboardingStep3() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
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
    // Load step3 audio when component mounts
    const audioPath = `assets/audio/onboarding/${language}/step3.mp3`;
    loadAudio(audioPath);

    return () => {
      // Cleanup sẽ được handle bởi useAudio hook
    };
  }, [language]); // Chỉ phụ thuộc vào language, không phụ thuộc vào loadAudio và stop

  const handleSkip = () =>
    setTimeout(() => router.push("/(onboardings)/step4"), 300);
  const handleBack = () => setTimeout(() => router.back(), 300);
  const handleSelectLanguage = (code: string) => setSelected(code);

  return (
    <View className="flex flex-1 items-center bg-white w-full h-full  ">
      {/* Header + Progress */}
      <View className="w-full max-w-[420px] tablet:max-w-full px-4 tablet:px-6 self-center flex-row items-center justify-between mt-[59px] tablet:mt-12">
        {/* Back */}
        <TouchableOpacity
          onPress={handleBack}
          className="flex-row items-center"
        >
          <Image source={ArrLeft} className="w-6 h-6" />
        </TouchableOpacity>

        {/* Progress */}
        <View className="flex-1 ml-4 tablet:ml-7">
          <View className="h-[21px]  bg-gray-100 w-full rounded-full overflow-hidden">
            <View className="h-[21px] bg-[#F99F04] w-1/2 rounded-full" />
          </View>
        </View>
      </View>

      {/* Body */}
      <View className="flex-1 w-full max-w-[420px]  tablet:max-w-full px-4 tablet:px-6 self-center mt-5 tablet:mt-10 gap-6">
        {/* Mascot + Dialogue */}
        <View className="w-full flex-row items-center gap-2">
          <Image
            source={logoStep}
            resizeMode="contain"
            className="w-[96px] h-[120px] tablet:w-[210px] tablet:h-[250px]"
          />
          <View className="relative items-center justify-center">
            <Image
              source={DialogueBox}
              resizeMode="contain"
              className="w-[287px] h-[45px] tablet:w-[360px] tablet:h-[56px]"
            />
            <Text className="font-beVN absolute top-2 tablet:top-2.5 w-[250px] tablet:w-[310px] text-center text-[14px] tablet:text-[18px] text-black">
              {t("onboarding.step_3")}
            </Text>
          </View>
        </View>

        {/* Options */}
        <View className="w-full">
          <Text className="font-beVN text-sm tablet:text-base text-[#A4A7AE] mb-2">
            Chọn câu trả lời
          </Text>

          {LANGUAGES.map((lang) => (
            <Pressable
              key={lang.code}
              onPress={() => handleSelectLanguage(lang.code)}
              className="flex-row items-center rounded-xl py-6 tablet:py-7 gap-4"
            >
              <View
                className={`items-center justify-center rounded-full border-2 w-6 h-6 tablet:w-7 tablet:h-7 ${
                  selected === lang.code
                    ? "border-orange-500"
                    : "border-gray-400"
                }`}
              >
                {selected === lang.code && (
                  <View className="w-2.5 h-2.5 tablet:w-3 tablet:h-3 rounded-full bg-orange-500" />
                )}
              </View>
              <Text className="font-beVN text-base tablet:text-[18px]">
                {lang.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Audio Controls */}
      <View className="w-full max-w-full tablet:max-w-[768px] self-center mb-6 px-6">
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
      </View>

      {/* CTA bottom */}
      <View className="w-full max-w-full tablet:max-w-[768px] self-center mb-10 tablet:mb-12 px-6">
        <TouchableOpacity
          onPress={handleSkip}
          activeOpacity={0.85}
          className="w-full h-[52px] tablet:h-[60px] bg-[#F99F04] rounded-[32px] items-center justify-center"
        >
          <Text className="font-beVNSemibold text-xl tablet:text-2xl font-semibold text-white">
            {t("onboarding.language_btn")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
