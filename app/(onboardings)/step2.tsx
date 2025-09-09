import ArrLeft from "@/assets/images/arrow-left.png";
import DialogueBox from "@/assets/images/onboarding/DialogueBox - lg.png";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import logoStep from "../../assets/images/mascot/Mascot2.png";
import gradient from "../../assets/images/onboarding/Gradient.png";
import AudioControls from "../../components/AudioControls";
import { useAudio } from "../../hooks/useAudio";

export default function OnboardingStep2() {
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
    // Load step2 audio when component mounts
    const audioPath = `assets/audio/onboarding/${language}/step2.mp3`;
    loadAudio(audioPath);

    return () => {
      // Cleanup sẽ được handle bởi useAudio hook
    };
  }, [language]); // Chỉ phụ thuộc vào language, không phụ thuộc vào loadAudio và stop

  const handleSkip = () => {
    // await SecureStore.setItemAsync('language', 'en');
    setTimeout(() => {
      router.push("/(onboardings)/step3");
    }, 300);
  };
  const handleBack = () => {
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <View className="flex items-center bg-white w-full h-full px-6 tablet:px-12">
      <TouchableOpacity
        onPress={handleBack}
        className="top-[59px] tablet:top-[80px] w-full flex justify-center"
      >
        <Image source={ArrLeft} className="h-6 w-6 tablet:h-8 tablet:w-8" />
      </TouchableOpacity>
      <View className="top-[150px] tablet:top-[200px] w-full flex justify-center items-center z-10">
        <Image
          source={DialogueBox}
          className="h-[105px] w-full max-w-[304px] tablet:max-w-[400px] tablet:h-[140px] relative"
          resizeMode="contain"
        />
        <Text className="text-base tablet:text-xl text-[#000000] font-beVN absolute text-center">
          {t("onboarding.step_2")}
        </Text>
      </View>
      <View className="top-[80px] tablet:top-[120px] w-full flex justify-center items-center">
        <Image
          source={gradient}
          className="h-[510px] w-[510px] tablet:h-[600px] tablet:w-[600px] relative"
          resizeMode="contain"
        />
        <Image
          source={logoStep}
          className="h-[292px] w-full tablet:h-[350px] absolute"
          resizeMode="contain"
        />
      </View>
      <View className=" w-full tablet:max-w-[768px] absolute bottom-12 flex flex-col gap-4">
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
          className=" h-[52px] tablet:h-[60px] w-full bg-[#F99F04] flex items-center justify-center  rounded-[32px]"
        >
          <Text className="text-xl tablet:text-2xl font-semibold text-[#FFFFFF] font-beVNSemibold">
            {t("onboarding.language_btn")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
