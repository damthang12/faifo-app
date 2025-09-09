import Profile from "@/assets/Icon/Profile";
import ArrLeft from "@/assets/images/arrow-left.png";
import KHHA from "@/assets/images/detail/KHHA.png";
import CalendarModal from "@/components/calendar/CustomCalendar";
import PeopleCountModal from "@/components/modal/PeopleCount";
import { formatDate } from "@/constants/contanst";
import { PLACES_SECTIONS } from "@/constants/MockData";
import { useIsTablet } from "@/hooks/useScreen";
import { useBookingStore } from "@/store/useBookingStore";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function BookingScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const isTablet = useIsTablet();
  const [selectedTime, setSelectedTime] = useState("");
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [peopleCount, setPeopleCount] = useState(2);
  const { addBooking } = useBookingStore();

  const [image, setImage] = useState(KHHA);
  const [location, setLocation] = useState("");
  const [place, setPlace] = useState("");

  const bookings = PLACES_SECTIONS.flatMap((s) => s.items).find(
    (p) => p.id === id
  );

  const handleBack = () => {
    setTimeout(() => {
      router.back();
    }, 300);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedBookingId) {
      Alert.alert(
        "Thiếu thông tin",
        "Vui lòng chọn ngày và giờ trước khi đặt chỗ."
      );
      return;
    }
    addBooking({
      id: selectedBookingId ?? "",
      name: place,
      date: selectedDate,
      time: selectedTime,
      location: location,
      img: image,
      isCancel: false,
      status: "Đang giữ chỗ",
    });

    router.push("/booking/success");
  };

  return (
    <View className="flex-1 bg-white px-4 tablet:px-8 pt-16 tablet:pt-20">
      <View className="flex-row items-center justify-between mb-6 tablet:mb-8">
        <TouchableOpacity onPress={handleBack}>
          <Image source={ArrLeft} className="h-6 w-6 tablet:h-8 tablet:w-8" />
        </TouchableOpacity>
        <Text className="text-xl tablet:text-2xl font-semibold">Đặt chỗ</Text>
        <View className="w-6 h-6 tablet:w-8 tablet:h-8" />
      </View>

      <ScrollView contentContainerStyle={{ marginTop: 12 }}>
        <View className="flex-row gap-2 tablet:gap-4 justify-between mb-5 tablet:mb-6">
          <TouchableOpacity
            onPress={() => setCalendarVisible(true)}
            className="w-[55%] tablet:w-[60%] border border-gray-300 p-3 tablet:p-4 rounded-3xl flex-row justify-between items-center"
          >
            <View className="flex-row gap-2 tablet:gap-3 items-center">
              <Ionicons name="calendar-outline" size={24} color="#000" />
              <Text className="text-gray-900 font-beVNSemibold text-base tablet:text-lg">
                {selectedDate ? formatDate(selectedDate) : "Chọn ngày"}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>

          {/* Số người */}
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            className="flex-row items-center p-3 tablet:p-4 border justify-between border-gray-300 w-[40%] tablet:w-[35%] rounded-3xl"
          >
            <View className="flex-row gap-2 tablet:gap-3 items-center">
              <Profile size={24} color="#000" />
              <Text className="text-gray-900 font-beVNSemibold text-base tablet:text-lg">
                {peopleCount ? peopleCount : "0"}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        {/* Chọn ngày */}

        {/* Danh sách lựa chọn */}
        <FlatList
          data={bookings?.booking || []}
          numColumns={isTablet ? 2 : 1}
          keyExtractor={(item: any, index: number) => `${item.id}-${index}`}
          renderItem={({
            item: b,
            index: idx,
          }: {
            item: any;
            index: number;
          }) => (
            <View
              className={`mb-6 tablet:mb-4 p-4 tablet:p-5 border rounded-2xl tablet:rounded-3xl ${
                selectedBookingId === b.id
                  ? " border-[#F99F04] bg-[#FFECB81A]"
                  : "border-gray-300"
              }`}
              style={isTablet ? { width: "49%" } : undefined}
            >
              <View className="flex-row gap-2 tablet:gap-3 items-center justify-between mb-4 tablet:mb-5">
                <Text className="font-medium font-beVNMedium text-[#000000] text-base tablet:text-lg">
                  {b.name}
                </Text>

                <View className="flex-row justify-end ">
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedBookingId(b.id);
                      setImage(b.image);
                      setLocation(b.location ?? "");
                      setPlace(b.name);
                    }}
                    className={`p-1.5 tablet:p-2  rounded-full border ${
                      selectedBookingId === b.id
                        ? " border-[#F99F04]"
                        : "border-gray-300"
                    }`}
                  >
                    <Text
                      className={`font-beVN w-3 h-3  tablet:w-4 tablet:h-4 rounded-full ${
                        selectedBookingId === b.id
                          ? "bg-[#F99F04]"
                          : "text-black"
                      }`}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {b.time.map((t: string, i: number) => {
                  const isDisabled = selectedBookingId !== b.id;
                  const isSelected =
                    selectedTime === t && selectedBookingId === b.id;
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() => !isDisabled && setSelectedTime(t)}
                      className={`px-4 py-2 tablet:px-5 tablet:py-3 tablet:h-12 rounded-full ${
                        isSelected ? "bg-[#F99F04]" : "border border-gray-300"
                      } ${isDisabled ? "opacity-30" : ""}`}
                    >
                      <Text
                        className={`font-beVN text-sm tablet:text-base ${
                          isSelected ? "text-white" : "text-black"
                        }`}
                      >
                        {t}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <Text className="text-xs tablet:text-sm text-[#8B3A00] font-beVN mt-4 tablet:mt-5 bg-[#FFECB8] p-3 tablet:p-4 rounded-lg tablet:rounded-xl">
                Miễn phí huỷ đặt chỗ trước 08:00 AM ngày {selectedDate}
              </Text>

              <View className="h-[1px] bg-gray-100 my-4 tablet:my-5" />
              <View className="flex-row items-center gap-2 tablet:gap-3">
                {b.price && (
                  <View className="flex-col gap-2 tablet:gap-3">
                    <Text className="text-base tablet:text-lg text-gray-600 line-through font-beVNSemibold">
                      Tổng cộng: {b.originalPrice}
                    </Text>
                    <Text className="text-xl tablet:text-2xl font-bold text-gray-800 font-beVNBold">
                      Chỉ còn: {b.price}
                    </Text>
                  </View>
                )}
                {!b.price && (
                  <Text className="text-xl tablet:text-2xl font-bold text-[#351904] font-beVNSemibold">
                    Tổng cộng: {b.originalPrice}
                  </Text>
                )}
              </View>
              {b.price && (
                <Text className="text-xs tablet:text-sm text-[#8B3A00] mt-1 tablet:mt-2 font-beVN">
                  Giá ưu đãi chỉ được áp dụng cho khách đặt chỗ trước
                </Text>
              )}
            </View>
          )}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          columnWrapperStyle={
            isTablet ? { justifyContent: "space-between", gap: 16 } : undefined
          }
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </ScrollView>

      {/* Nút đặt chỗ */}
      <Pressable
        onPress={handleBooking}
        className="bg-[#F99F04] p-5 tablet:p-6 rounded-full items-center mb-10 tablet:mb-12"
      >
        <Text className="text-white text-xl tablet:text-2xl font-semibold font-beVNSemibold">
          Đặt chỗ
        </Text>
      </Pressable>

      <CalendarModal
        isVisible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
        onSelectDate={(date) => {
          const formatted = dayjs(date).format("YYYY-MM-DDTHH:mm");
          setSelectedDate(formatted);
        }}
      />

      <PeopleCountModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onSelect={(count) => setPeopleCount(count)}
        selected={peopleCount}
      />
    </View>
  );
}
