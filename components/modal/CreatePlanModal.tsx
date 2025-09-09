import CalendarIcon from "@/assets/Icon/Calendar";
import ParticipantDropdown from "@/components/dropdown/ParticipantDropdown";
import { useIsTablet } from "@/hooks/useScreen";
import { useTripStore } from "@/store/useTripStore";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function CreatePlanModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isSameDay, setIsSameDay] = useState(false);
  const [isSupport, setSupport] = useState(false);
  const [participants, setParticipants] = useState(1);
  const [notes, setNotes] = useState("");

  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const { addPlannedTrip } = useTripStore();
  const isTablet = useIsTablet();

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    const newTrip = {
      id: Date.now().toString(),
      place: tripName,
      startDate: startDate?.toLocaleDateString() || "",
      endDate: (isSameDay ? startDate : endDate)?.toLocaleDateString() || "",
      participants,
      notes,
      image: image
        ? { uri: image }
        : require("@/assets/images/plan/hoi-an.png"),
      items: [{ day: "", itinerary: [] }],
    };

    addPlannedTrip(newTrip);
    onClose();
  };

  const handlePlanWithFaifan = () => {
    router.push("/(noti)/MaintenanceScreen");
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{ justifyContent: "flex-end", margin: 0 }}
      avoidKeyboard
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="bg-white p-6 tablet:p-8 rounded-t-3xl tablet:rounded-t-3xl max-h-[100%]">
          <View className="w-[90px] h-[6px] tablet:w-[120px] tablet:h-[8px] bg-gray-300 rounded-full self-center mb-5 tablet:mb-6" />
          <ScrollView>
            <Text className="text-xl tablet:text-2xl font-bold font-beVNSemibold mb-4 tablet:mb-6">
              Tạo chuyến đi mới
            </Text>

            <Text className="font-semibold font-beVNSemibold mb-1 tablet:mb-2 text-base tablet:text-lg">
              Ảnh{" "}
            </Text>
            <TouchableOpacity
              onPress={handlePickImage}
              className="mb-4 tablet:mb-6 border border-dashed border-gray-400 rounded-xl tablet:rounded-2xl p-4 tablet:p-6 items-center justify-center h-40 tablet:h-48 w-full"
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  className="w-full h-full rounded-xl tablet:rounded-2xl"
                  resizeMode="cover"
                />
              ) : (
                <Text className="text-gray-500 font-beVN text-sm tablet:text-base">
                  Chọn ảnh đại diện cho chuyến đi
                </Text>
              )}
            </TouchableOpacity>

            {/* Tên chuyến đi */}
            <Text className="font-semibold font-beVNSemibold mb-1 tablet:mb-2 text-base tablet:text-lg">
              Tên chuyến đi
            </Text>
            <TextInput
              placeholder="Đặt tên chuyến đi của bạn"
              value={tripName}
              onChangeText={setTripName}
              className="border p-3 tablet:p-4 rounded-xl tablet:rounded-2xl mb-4 tablet:mb-6 text-sm tablet:text-base"
            />

            {/* Chọn ngày */}
            <View className="flex-row justify-between mb-4 tablet:mb-6 gap-2 tablet:gap-4">
              {/* Start Date */}
              <View className="flex-1">
                <Text className="text-sm tablet:text-base mb-1 tablet:mb-2 font-beVN">
                  Ngày bắt đầu
                </Text>
                <TouchableOpacity
                  className="border rounded-xl tablet:rounded-2xl flex-row items-center justify-between px-4 py-3 tablet:px-5 tablet:py-4"
                  onPress={() => setStartPickerVisible(true)}
                >
                  <Text className="text-gray-500 font-medium text-sm tablet:text-base">
                    {startDate
                      ? startDate.toLocaleDateString()
                      : "Ngày bắt đầu"}
                  </Text>
                  <CalendarIcon size={20} color="#000" />
                </TouchableOpacity>
              </View>

              {/* End Date */}
              <View className="flex-1">
                <Text className="font-beVN mb-1 tablet:mb-2 text-sm tablet:text-base">
                  Ngày kết thúc
                </Text>
                <TouchableOpacity
                  className={`border rounded-xl tablet:rounded-2xl flex-row items-center justify-between px-4 py-3 tablet:px-5 tablet:py-4 ${
                    isSameDay ? "bg-gray-100" : ""
                  }`}
                  disabled={isSameDay}
                  onPress={() => setEndPickerVisible(true)}
                >
                  <Text className="text-gray-500 font-medium text-sm tablet:text-base">
                    {endDate ? endDate.toLocaleDateString() : "Ngày kết thúc"}
                  </Text>
                  <CalendarIcon size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Toggle */}
            <View className="flex-row items-center mb-4 tablet:mb-6">
              <TouchableOpacity
                onPress={() => setIsSameDay(!isSameDay)}
                className={`w-5 h-5 tablet:w-6 tablet:h-6 rounded-[6px] tablet:rounded-[8px] items-center justify-center ${
                  isSameDay ? "bg-[#F99F04]" : "border border-gray-800"
                }`}
              >
                {isSameDay && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </TouchableOpacity>
              <Text className="ml-2 text-sm tablet:text-base text-gray-800">
                Đi trong ngày
              </Text>
            </View>

            {/* Số người */}
            <ParticipantDropdown
              value={participants}
              onChange={setParticipants}
            />

            {/* Ghi chú */}
            <Text className="font-semibold font-beVNSemibold mb-1 tablet:mb-2 text-base tablet:text-lg">
              Ghi chú
            </Text>
            <TextInput
              multiline
              placeholder="Nhập ghi chú cho chuyến đi"
              value={notes}
              onChangeText={setNotes}
              className="border p-3 tablet:p-4 rounded-xl tablet:rounded-2xl h-[100px] tablet:h-[120px] mb-4 tablet:mb-6 text-sm tablet:text-base"
            />

            <View className="flex-row items-center mb-4 tablet:mb-6">
              <TouchableOpacity
                disabled
                onPress={handlePlanWithFaifan}
                className={`w-5 h-5 tablet:w-6 tablet:h-6 rounded-[6px] tablet:rounded-[8px] items-center justify-center ${
                  isSupport ? "bg-[#F99F04]" : "border border-gray-800"
                }`}
              >
                {isSupport && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </TouchableOpacity>
              <Text className="ml-2 font-medium font-beVN text-gray-800 text-sm tablet:text-base">
                Tạo lịch trình với sự hỗ trợ từ Faifan
              </Text>
            </View>

            <TouchableOpacity
              className="bg-[#F99F04] p-4 tablet:p-5 rounded-full tablet:rounded-2xl mt-4 tablet:mt-6"
              onPress={handleSubmit}
            >
              <Text className="text-center text-xl tablet:text-2xl text-white font-bold font-beVNSemibold">
                Tạo chuyến đi mới
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Modal pickers */}
        <DateTimePickerModal
          isVisible={isStartPickerVisible}
          mode="date"
          locale="vi"
          confirmTextIOS="Xác nhận"
          cancelTextIOS="Huỷ"
          date={startDate || new Date()}
          onConfirm={(date) => {
            setStartDate(date);
            setStartPickerVisible(false);
          }}
          onCancel={() => setStartPickerVisible(false)}
          display="spinner"
          textColor="#000000"
          accentColor="#F99F04"
          modalStyleIOS={
            isTablet
              ? {
                  width: "100%",
                  margin: 0,
                  paddingHorizontal: 0,
                }
              : undefined
          }
          pickerContainerStyleIOS={
            isTablet
              ? {
                  width: "100%",
                  paddingHorizontal: 0,
                  marginHorizontal: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }
              : undefined
          }
          pickerComponentStyleIOS={
            isTablet
              ? {
                  width: "100%",
                  marginHorizontal: 0,
                  alignSelf: "center",
                }
              : undefined
          }
        />

        <DateTimePickerModal
          isVisible={isEndPickerVisible}
          mode="date"
          locale="vi"
          cancelTextIOS="Huỷ"
          confirmTextIOS="Xác nhận"
          date={endDate || new Date()}
          onConfirm={(date) => {
            setEndDate(date);
            setEndPickerVisible(false);
          }}
          onCancel={() => setEndPickerVisible(false)}
          display="spinner"
          textColor="#000000"
          accentColor="#F99F04"
          modalStyleIOS={
            isTablet
              ? {
                  width: "100%",
                  margin: 0,
                  paddingHorizontal: 0,
                }
              : undefined
          }
          pickerContainerStyleIOS={
            isTablet
              ? {
                  width: "100%",
                  paddingHorizontal: 0,
                  marginHorizontal: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }
              : undefined
          }
          pickerComponentStyleIOS={
            isTablet
              ? {
                  width: "100%",
                  marginHorizontal: 0,
                  alignSelf: "center",
                }
              : undefined
          }
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}
