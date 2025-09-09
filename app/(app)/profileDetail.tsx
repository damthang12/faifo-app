import ArrLeft from "@/assets/images/arrow-left.png";
import ModalEditAvatar from "@/components/modal/EditAvatar";
import { useToast } from "@/components/Toast";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ProfileEditScreen() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("Thanh Thương");
  const [email, setEmail] = useState("thanhthuong@faifo.com");
  const [country, setCountry] = useState("Việt Nam");
  const [phone, setPhone] = useState("(+84) 965 600 858");
  const [dob, setDob] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const { showToast } = useToast();
  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleConfirm = (date: Date) => {
    const formatted = date.toLocaleDateString("vi-VN"); // Format theo kiểu Việt Nam
    setDob(formatted);
    hideDatePicker();
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
      setShowEditModal(false);
    }
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.status !== "granted") {
      alert("Bạn cần cấp quyền truy cập camera để sử dụng tính năng này.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setShowEditModal(false);
  };

  const handleBack = () => {
    router.back();
  };

  const handleUpdate = () => {
    showToast(
      "Cập nhật thành côngThông tin tài khoản của bạn đã được lưu.",
      "success"
    );
  };

  return (
    <View className="flex-1 bg-white items-center px-4 tablet:px-8 pt-20 tablet:pt-24">
      <View className="w-full flex flex-row items-center justify-between mb-[50px] tablet:mb-[60px]">
        {/* Back button */}
        <TouchableOpacity onPress={handleBack} className="">
          <Image source={ArrLeft} className="h-6 w-6 tablet:h-8 tablet:w-8" />
        </TouchableOpacity>
        <Text className="text-xl tablet:text-2xl font-semibold font-beVNSemibold">
          {" "}
          Thông tin tài khoản
        </Text>
        <View className="h-6 w-6 tablet:h-8 tablet:w-8" />
      </View>

      {/* Ảnh đại diện */}
      <TouchableOpacity
        onPress={() => setShowEditModal(true)}
        className="items-center mb-6 tablet:mb-8"
      >
        <Image
          source={
            avatar ? { uri: avatar } : require("@/assets/images/Avatar.png") // Ảnh fallback
          }
          className="w-[120px] h-[120px] tablet:w-[150px] tablet:h-[150px] rounded-full mb-4 tablet:mb-6"
        />
        <Text className="text-gray-900 font-semibold font-beVNSemibold text-sm tablet:text-base">
          Chỉnh sửa ảnh đại diện
        </Text>
      </TouchableOpacity>

      {/* Trường thông tin */}
      <View className="space-y-4 flex-col gap-4 w-full">
        <View>
          <Text className="font-semibold font-beVNSemibold text-sm tablet:text-xl text-gray-600 mb-1 tablet:mb-2">
            Tên người dùng
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="border border-gray-300 text-base tablet:text-xl rounded-xl p-3 h-[52px]"
          />
        </View>

        <View>
          <Text className="font-semibold font-beVNSemibold text-sm tablet:text-xl text-gray-600 mb-1 tablet:mb-2">
            Email
          </Text>
          <TextInput
            value={email}
            editable={false}
            className="border border-gray-300 text-base tablet:text-xl rounded-xl p-3 bg-gray-100 text-gray-400 h-[52px]"
          />
        </View>

        <View>
          <Text className="font-semibold font-beVNSemibold text-sm tablet:text-xl text-gray-600 mb-1 tablet:mb-2">
            Quốc gia
          </Text>
          <TextInput
            value={country}
            onChangeText={setCountry}
            className="border border-gray-300 text-base tablet:text-xl rounded-xl p-3 h-[52px]"
          />
        </View>

        <View>
          <Text className="font-semibold font-beVNSemibold text-sm tablet:text-xl text-gray-600 mb-1 tablet:mb-2">
            Số điện thoại
          </Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            className="border border-gray-300 text-base tablet:text-xl rounded-xl p-3 h-[52px]"
          />
        </View>

        <View>
          <Text className="font-semibold font-beVNSemibold text-sm tablet:text-xl text-gray-600 mb-1 tablet:mb-2">
            Sinh nhật
          </Text>
          <TouchableOpacity onPress={showDatePicker}>
            <View className="flex-row items-center border border-gray-300 text-base tablet:text-xl text-black rounded-xl px-3 py-3 h-[52px]">
              <View className="flex-1">
                <TextInput
                  placeholder="Chưa có thông tin"
                  value={dob}
                  editable={false}
                  pointerEvents="none"
                  className="text-black text-base tablet:text-xl"
                />
              </View>
              <Ionicons name="calendar-outline" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleUpdate}
        className="bg-[#F99F04] absolute bottom-10 w-full  p-4 rounded-full items-center h-[52px]"
      >
        <Text className="text-white font-bold text-lg">Lưu thông tin</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        locale="vi"
        maximumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS="Xác nhận"
        cancelTextIOS="Huỷ"
        display="spinner"
        textColor="#000000"
        accentColor="#F99F04"
        modalStyleIOS={{
          width: "100%",
          margin: 0,
          paddingHorizontal: 0,
        }}
        pickerContainerStyleIOS={{
          width: "100%",
          paddingHorizontal: 0,
          marginHorizontal: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
        pickerComponentStyleIOS={{
          width: "100%",
          marginHorizontal: 0,
          alignSelf: "center",
        }}
      />

      <ModalEditAvatar
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        onPickFromGallery={handlePickImage}
        onTakePhoto={handleTakePhoto}
        onRemoveAvatar={handleRemoveAvatar}
      />
    </View>
  );
}
