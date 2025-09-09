import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal"; // ✅ đúng

interface Props {
  visible: boolean;
  onClose: () => void;
  onPickFromGallery: () => void;
  onTakePhoto: () => void;
  onRemoveAvatar: () => void;
}

export default function ModalEditAvatar({
  visible,
  onClose,
  onPickFromGallery,
  onTakePhoto,
  onRemoveAvatar,
}: Props) {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View className="flex-1 justify-end ">
        <View className="bg-white p-4 tablet:p-8 rounded-t-3xl tablet:rounded-t-3xl space-y-4 tablet:space-y-6">
          <View className="w-[100px] h-[6px] tablet:w-[120px] tablet:h-[8px] bg-gray-300 rounded-full self-center mb-5 tablet:mb-6" />

          <Text className="text-gray-900 font-semibold font-beVNSemibold text-2xl tablet:text-3xl mb-10 tablet:mb-12">
            Chỉnh sửa ảnh đại diện
          </Text>

          <TouchableOpacity
            onPress={onPickFromGallery}
            className="flex-row items-center gap-3 tablet:gap-4 py-2 tablet:py-3"
          >
            <Ionicons name="images-outline" size={20} color="#000" />
            <Text className="text-base tablet:text-lg font-beVN text-black">
              Chọn từ thư viện
            </Text>
          </TouchableOpacity>

          <View className="h-[1px] bg-gray-200 my-4 tablet:my-5" />

          <TouchableOpacity
            onPress={onTakePhoto}
            className="flex-row items-center gap-3 tablet:gap-4 py-2 tablet:py-3"
          >
            <Ionicons name="camera-outline" size={20} color="#000" />
            <Text className="text-base tablet:text-lg font-beVN text-black">
              Chụp ảnh
            </Text>
          </TouchableOpacity>
          <View className="h-[1px] bg-gray-200 my-4 tablet:my-5" />

          <TouchableOpacity
            onPress={onRemoveAvatar}
            className="flex-row items-center gap-3 tablet:gap-4 py-2 tablet:py-3"
          >
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
            <Text className="text-base tablet:text-lg font-beVN text-[#EF4444]">
              Gỡ ảnh hiện tại
            </Text>
          </TouchableOpacity>
          <View className="h-[1px] bg-gray-200 my-4 tablet:my-5" />
          <Text className="text-sm tablet:text-base font-beVN text-gray-500 mt-2 tablet:mt-3 mb-7 tablet:mb-8">
            Ảnh đại diện của bạn hiển thị với mọi người ở trên Faifo và ở các
            đánh giá.
          </Text>

          {/*<TouchableOpacity*/}
          {/*    onPress={onClose}*/}
          {/*    className="mt-4 p-3 bg-gray-200 rounded-full items-center"*/}
          {/*>*/}
          {/*    <Text className="text-gray-700 font-semibold font-beVN">Đóng</Text>*/}
          {/*</TouchableOpacity>*/}
        </View>
      </View>
    </Modal>
  );
}
