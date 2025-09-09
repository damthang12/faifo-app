import ArrLeft from "@/assets/images/arrow-left.png";
import DialogueBox from "@/assets/images/onboarding/DialogueBox - lg-right.png";
import { useAudio } from "@/hooks/useAudio";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import logoStep2 from "../../assets/images/mascot/Mascot3.png";
import logoStep from "../../assets/images/mascot/Mascot6.png";
import gradient from "../../assets/images/onboarding/Gradient.png";
import AudioControls from "../../components/AudioControls";

const LANGUAGES = [
  { code: "vh", label: "Du lịch cá nhân" },
  { code: "tn", label: "Du lịch với gia đình" },
  { code: "ms", label: "Du lịch với bạn bè" },
  { code: "nd", label: "Du lịch kết hợp công tác" },
];

export default function OnboardingStep5() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<"loading" | "profile">("loading");
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
    // Load step5 audio when component mounts (for loading phase)
    const audioPath = `assets/audio/onboarding/${language}/step5.mp3`;
    loadAudio(audioPath);

    return () => {
      // Cleanup sẽ được handle bởi useAudio hook
    };
  }, [language]); // Chỉ phụ thuộc vào language, không phụ thuộc vào loadAudio và stop

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep("profile");
      // Load step6 audio when loading is complete
      const step6AudioPath = `assets/audio/onboarding/${language}/step6.mp3`;
      loadAudio(step6AudioPath);
    }, 3000);
    return () => clearTimeout(timer);
  }, [language, loadAudio]);

  const handleSkip = () =>
    setTimeout(() => router.push("/(onboardings)/step6"), 300);
  const handleBack = () => setTimeout(() => router.back(), 300);
  const handleSelectLanguage = (code: string) => setSelected(code);

  /* ------------------ LOADING ------------------ */
  if (step === "loading") {
    return (
      <View className="flex flex-1 h-full justify-center items-center bg-white w-full px-6">
        {/* Header placeholder để giữ khoảng thở */}
        <View className="w-full max-w-[420px] tablet:max-w-[900px] self-center mt-[59px] tablet:mt-20" />

        {/* Bubble + text */}
        <View className="w-full max-w-[420px] tablet:max-w-[900px] self-center mt-12 tablet:mt-16 items-center z-10">
          <Image
            source={DialogueBox}
            resizeMode="contain"
            className="w-full max-w-[304px] h-[105px]"
          />
          <Text className="font-beVN text-base text-black -mt-[70px] text-center px-6">
            {t("onboarding.step_5")}
          </Text>
        </View>

        {/* Mascot + gradient */}
        <View className="w-full items-center ">
          <View className="relative flex justify-center items-center">
            <Image
              source={gradient}
              resizeMode="contain"
              className="w-[320px] h-[320px] tablet:w-[410px] tablet:h-[410px]"
            />
            <Image
              source={logoStep}
              resizeMode="contain"
              className="w-[260px] h-[260px] tablet:w-[292px] tablet:h-[292px] absolute"
            />
          </View>
        </View>

        {/* Titles */}
        <View className="w-full items-center  gap-2">
          <Text className="text-2xl tablet:text-[28px] font-semibold text-[#8B3A00] font-phudu uppercase text-center">
            {t("onboarding.step_5_title")}
          </Text>
          <Text className="text-base tablet:text-[17px] font-bold font-beVN text-center px-4">
            {t("onboarding.step_5_des")}
          </Text>
        </View>

        {/* Footer spacing */}
        <View className="h-10 tablet:h-12" />
      </View>
    );
  }

  /* ------------------ PROFILE ------------------ */
  return (
    <View className="flex flex-1 items-center bg-white w-full">
      {/* Header + Progress (ngang hàng) */}
      <View className="w-full max-w-[420px]  tablet:max-w-full px-4 tablet:px-6 self-center flex-row items-center justify-between mt-[59px] tablet:mt-12">
        <TouchableOpacity
          onPress={handleBack}
          className="flex-row items-center"
        >
          <Image source={ArrLeft} className="w-6 h-6" />
        </TouchableOpacity>
        <View className="flex-1 ml-4">
          {/* Step 5 → ví dụ 5/6 ~ 83% (w-5/6). Tùy workflow bạn chỉnh lại */}
          <View className="w-full h-[21px] bg-gray-100 rounded-full overflow-hidden">
            <View className="h-full w-1/4 bg-[#F99F04]" />
          </View>
        </View>
      </View>

      {/* Body */}
      <View className="flex-1 w-full max-w-[420px]  tablet:max-w-full px-4 tablet:px-6 self-center mt-16 tablet:mt-20 gap-8">
        {/* Mascot + Dialogue */}
        <View className="w-full flex-row items-center gap-2">
          <Image
            source={logoStep2}
            resizeMode="contain"
            className="w-[96px] h-[120px] tablet:w-[210px] tablet:h-[250px]"
          />
          <View className="relative items-center justify-center">
            <Image
              source={DialogueBox}
              resizeMode="contain"
              className="w-[287px] h-[87px] tablet:w-[360px] tablet:h-[100px]"
            />
            <Text className="font-beVN text-base tablet:text-[16px] text-black absolute">
              {t("onboarding.step_6")}
            </Text>
          </View>
        </View>

        {/* Form */}
        <View className="w-full items-start gap-3">
          <Text className="text-[40px] tablet:text-[48px] text-[#8B3A00] font-phudu uppercase font-semibold">
            {t("onboarding.step_6_title")}
          </Text>
          <TextInput
            placeholder="Nhập số tuổi của bạn"
            keyboardType="number-pad"
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
