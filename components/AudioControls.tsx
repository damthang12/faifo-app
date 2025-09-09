import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface AudioControlsProps {
  isPlaying: boolean;
  isLoading: boolean;
  onTogglePlayPause: () => void;
  onStop?: () => void;
  size?: "small" | "medium" | "large";
  showStopButton?: boolean;
  className?: string;
  hasAudio?: boolean;
  error?: string | null;
}

export default function AudioControls({
  isPlaying,
  isLoading,
  onTogglePlayPause,
  onStop,
  size = "medium",
  showStopButton = false,
  className = "",
  hasAudio = false,
  error = null,
}: AudioControlsProps) {
  const getIconSize = () => {
    switch (size) {
      case "small":
        return 20;
      case "large":
        return 32;
      default:
        return 24;
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case "small":
        return "w-8 h-8";
      case "large":
        return "w-12 h-12";
      default:
        return "w-10 h-10";
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "small":
        return "text-xs";
      case "large":
        return "text-base";
      default:
        return "text-sm";
    }
  };

  // If no audio is available, show a disabled state
  if (!hasAudio) {
    return (
      <View className={`flex-row items-center gap-2 ${className}`}>
        <View
          className={`${getButtonSize()} bg-gray-300 rounded-full items-center justify-center opacity-50`}
        >
          <Ionicons name="volume-mute" size={getIconSize()} color="white" />
        </View>
        <Text className={`${getTextSize()} text-gray-500 font-beVN`}>
          Audio not available
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-row items-center gap-2 ${className}`}>
      <TouchableOpacity
        onPress={onTogglePlayPause}
        disabled={isLoading}
        className={`${getButtonSize()} bg-[#F99F04] rounded-full items-center justify-center ${
          isLoading ? "opacity-50" : ""
        }`}
        activeOpacity={0.7}
      >
        {isLoading ? (
          <Ionicons
            name="hourglass-outline"
            size={getIconSize()}
            color="white"
          />
        ) : isPlaying ? (
          <Ionicons name="pause" size={getIconSize()} color="white" />
        ) : (
          <Ionicons name="play" size={getIconSize()} color="white" />
        )}
      </TouchableOpacity>

      {showStopButton && onStop && (
        <TouchableOpacity
          onPress={onStop}
          disabled={isLoading}
          className={`${getButtonSize()} bg-gray-500 rounded-full items-center justify-center ${
            isLoading ? "opacity-50" : ""
          }`}
          activeOpacity={0.7}
        >
          <Ionicons name="stop" size={getIconSize()} color="white" />
        </TouchableOpacity>
      )}

      <Text className={`${getTextSize()} text-gray-600 font-beVN`}>
        {isLoading ? "Loading..." : isPlaying ? "Playing" : "Tap to play"}
      </Text>
    </View>
  );
}
