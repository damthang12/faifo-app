import CameraIcon from "@/assets/Icon/Camera";
import { askGeminiWithImage } from "@/service/api";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ArrowLeftIcon from "@/assets/Icon/ArrowLeft";
import OK from "@/assets/images/camera/OK.png";
import ChatBotModal from "@/components/modal/ChatBotModal";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TEXTS = [
  {
    description: "Bạn có muốn nghe về truyền thuyết con Cù nằm dưới cầu không?",
  },
  {
    description:
      "Bạn có biết vì sao người Nhật dựng cầu mà lại thờ thần Bắc Đế của người Hoa?",
  },
];

export default function FaifoScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [resultModal, setResultModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      setLoading(true);
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setImageUri(photo.uri);

      const result = await askGeminiWithImage(
        `data:image/jpeg;base64,${photo.base64}`,
        `Đây là địa danh nào ở Hội An, và có thông tin lịch sử nào không? chỉ trả lời tiếng việt`
      );

      if (result && result !== "Không có phản hồi.") {
        setAiResponse(result);
        setResultModal(true);
      } else {
        setErrorModal(true);
      }
    } catch (err) {
      console.error("❌ Lỗi chụp hoặc xử lý ảnh:", err);
      setErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  if (!permission?.granted) {
    return (
      <View className="flex-1 justify-center items-center px-6 tablet:px-12">
        <Text className="text-base tablet:text-xl text-center">
          Bạn cần cấp quyền camera để tiếp tục.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="mt-4 px-4 py-2 tablet:px-6 tablet:py-3 bg-blue-500 rounded"
        >
          <Text className="text-white text-sm tablet:text-base">Cấp quyền</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSearch = (text: string) => {
    setShowChatbot(true);
    setSearchText(text);
  };

  const handleClose = () => {
    setImageUri("");
  };

  const renderView = () => {
    if (imageUri) {
      return (
        <ScrollView scrollEnabled={false}>
          <View className="flex-1 justify-center bg-black/60 w-full h-full">
            <View className="bg-white rounded-xl pb-10 tablet:pb-16">
              <View className="flex-col">
                <View className="flex-row justify-between items-center absolute px-4 tablet:px-8 mt-[60px] tablet:mt-[80px] z-10 w-full ">
                  <TouchableOpacity
                    onPress={() => handleClose()}
                    className="border border-gray-900 rounded-full p-1 tablet:p-2"
                  >
                    <Ionicons
                      name="close"
                      size={20}
                      color="#000"
                      className="tablet:text-2xl"
                    />
                  </TouchableOpacity>
                  <Text className="text-xl tablet:text-2xl text-black font-beVNSemibold font-semibold">
                    Ống kính Faifo
                  </Text>
                  <View className="w-6 h-6 tablet:w-8 tablet:h-8" />
                </View>
                {imageUri && (
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: "100%", height: 400 }}
                    className="tablet:h-[500px]"
                    resizeMode="cover"
                  />
                )}
              </View>

              {/* Kết quả AI */}
              <View className="px-4 tablet:px-8 mt-4 tablet:mt-6">
                <Text className="text-xl tablet:text-2xl font-semibold font-phudu text-[#8B3A00] mb-3 tablet:mb-4">
                  Thông tin từ trợ lý ảo Faifan:
                </Text>
                <View
                  className="bg-[#F7E9CE80]/50 p-4 tablet:p-6 rounded-xl tablet:rounded-2xl tablet:h-[450px]"
                  style={{ height: 350 }}
                >
                  <ScrollView>
                    <Text className="text-base tablet:text-lg font-beVNSemibold text-gray-900">
                      {aiResponse}
                    </Text>
                  </ScrollView>
                </View>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                horizontal
                className="flex-row w-full px-4 tablet:px-8 my-5 tablet:my-6"
              >
                {TEXTS.map((text, i) => (
                  <View key={i} className="pr-4 tablet:pr-6">
                    <TouchableOpacity
                      onPress={() => handleSearch(text?.description)}
                      className="p-3 tablet:p-4 rounded-2xl tablet:rounded-3xl items-center border border-gray-300 w-[330px] tablet:w-[400px]"
                    >
                      <Text className="text-black font-semibold font-beVNSemibold text-sm tablet:text-base text-center">
                        {text.description}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      );
    }

    return (
      <CameraView
        ref={cameraRef}
        facing="back"
        style={{ flex: 1 }}
        className="px-4 tablet:px-8"
      >
        {/* Bọc toàn bộ UI overlay lại */}
        <View pointerEvents="box-none" className="absolute inset-0 z-50">
          {/* Header */}
          <View className="flex-row justify-between items-center mt-[60px] tablet:mt-[80px] px-4 tablet:px-8">
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeftIcon size={24} />
            </TouchableOpacity>
            <Text className="text-xl tablet:text-2xl text-white font-beVNSemibold font-semibold">
              Ống kính Faifo
            </Text>
            <View className="w-6 h-6 tablet:w-8 tablet:h-8" />
          </View>

          {/* Overlay center frame */}
          <View className="absolute inset-0 justify-center items-center">
            <Image
              source={OK}
              className="w-[369px] h-[327px] tablet:w-[500px] tablet:h-[450px]"
            />
          </View>

          {/* Footer */}
          <View className="absolute bottom-10 tablet:bottom-16 w-full items-center gap-4 tablet:gap-6 px-4 tablet:px-8">
            <Text className="text-white text-xl tablet:text-2xl font-beVN">
              Nhấn chụp để khám phá
            </Text>
            <TouchableOpacity
              onPress={takePhoto}
              className="w-[80px] h-[80px] tablet:w-[100px] tablet:h-[100px] items-center justify-center bg-[#FFFFFFB2]/70 rounded-full"
            >
              <CameraIcon size={42} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Loading overlay */}
        {loading && (
          <View className="absolute inset-0 bg-black/50 items-center justify-center z-50">
            <ActivityIndicator size="large" color="#fff" />
            <Text className="text-white mt-2 tablet:mt-4 text-base tablet:text-lg">
              Đang xử lý...
            </Text>
          </View>
        )}
      </CameraView>
    );
  };

  return (
    <View className="flex-1">
      {renderView()}
      {/* Modal: Không nhận diện được */}
      <Modal visible={errorModal} animationType="fade" transparent>
        <View className="flex-1 justify-center items-center bg-black/50 p-6 tablet:p-12">
          <View className="bg-white p-6 tablet:p-8 rounded-xl tablet:rounded-2xl items-center max-w-sm tablet:max-w-md">
            <Text className="text-xl tablet:text-2xl font-bold mb-2 tablet:mb-4 text-center">
              Ôi, Faifo chưa nhận ra được rồi...
            </Text>
            <Text className="text-gray-600 mb-4 tablet:mb-6 text-center text-sm tablet:text-base">
              Bạn thử chụp lại từ khoảng cách gần hơn, hoặc chọn một góc khác
              xem sao nhé!
            </Text>
            <TouchableOpacity
              onPress={() => setErrorModal(false)}
              className="bg-[#F99F04] px-6 py-3 tablet:px-8 tablet:py-4 rounded-full"
            >
              <Text className="text-white font-semibold text-sm tablet:text-base">
                Thử lại
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ChatBotModal
        searchText={searchText}
        isVisible={showChatbot}
        onClose={() => setShowChatbot(false)}
      />
    </View>
  );
}
