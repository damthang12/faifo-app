import CheckInIcon from "@/assets/Icon/Checkin";
import ClockIcon from "@/assets/Icon/Clock";
import ArrLeft from "@/assets/images/arrow-left.png";
import { formatDate } from "@/constants/contanst";
import { useBookingStore } from "@/store/useBookingStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const tabs = ["Đang giữ chỗ", "Hoàn thành", "Đã huỷ"];

export default function BookingManagementScreen() {
  const [activeTab, setActiveTab] = useState("Đang giữ chỗ");
  const router = useRouter();

  const { bookings } = useBookingStore();
  const filteredBookings = bookings.filter((b) => b.status === activeTab);

  const handleBack = () => {
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <View className="flex-1 bg-white pt-20 tablet:pt-24 px-4 tablet:px-8">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6 tablet:mb-8">
        <TouchableOpacity onPress={handleBack}>
          <Image source={ArrLeft} className="h-6 w-6 tablet:h-8 tablet:w-8" />
        </TouchableOpacity>
        <Text className="text-2xl tablet:text-3xl text-gray-900 font-semibold">
          Quản lý đặt chỗ
        </Text>
        <View className="w-6 h-6 tablet:w-8 tablet:h-8" />
      </View>

      {/* Tabs */}
      <View className="flex-row mb-4 w-full tablet:mb-6 justify-between space-x-4 tablet:space-x-6">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`px-4 tablet:w-full tablet:max-w-[320px] tablet:px-6 py-2 flex items-center justify-center tablet:py-3 ${
              activeTab === tab ? " border-b border-b-[#F99F04]" : ""
            }`}
          >
            <Text
              className={`text-xl tablet:text-2xl font-beVNSemibold ${
                activeTab === tab ? "text-[#F99F04]" : "text-gray-600"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Booking List */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {filteredBookings.map((b, index) => (
          <View
            key={index}
            className="mb-4 tablet:mb-6 p-4 tablet:p-6 rounded-xl tablet:rounded-2xl border border-gray-200"
          >
            <View className="flex-row justify-between">
              <Text className="text-gray-800 font-beVNSemibold text-sm tablet:text-base">
                {formatDate(b.date)}
              </Text>
              <Text className="text-gray-800 font-beVNSemibold text-sm tablet:text-base">
                #{b.id}
              </Text>
            </View>
            <View className="w-full h-[1px] bg-gray-300 my-4 tablet:my-5" />

            <View className="flex-row items-center gap-3 tablet:gap-4 mb-4 tablet:mb-5">
              <View className="h-full max-h-[96px] tablet:max-h-[120px] w-full max-w-[96px] tablet:max-w-[120px]">
                <Image
                  source={b.img}
                  className="h-full w-full rounded-3xl tablet:rounded-3xl"
                />
              </View>

              <View className="gap-2 tablet:gap-3 justify-start h-full flex-col">
                <Text className="text-lg tablet:text-xl font-semibold">
                  {b.name}
                </Text>
                <View className="flex-row gap-2 tablet:gap-3 items-center">
                  <ClockIcon size={24} />
                  <Text className="text-sm tablet:text-base text-gray-800 font-beVN">
                    ~ {b.time}{" "}
                  </Text>
                </View>
                <View className="flex-row gap-2 tablet:gap-3 items-center">
                  <CheckInIcon size={24} color="#000" />

                  <Text className="text-sm tablet:text-base text-gray-800 font-beVN">
                    {b.location}
                  </Text>
                </View>
              </View>
            </View>

            {/* Actions */}
            {b.status === "Đang giữ chỗ" && (
              <View className="flex-row justify-between mt-2 tablet:mt-3 items-center gap-2 tablet:gap-3">
                {b.isCancel ? (
                  <>
                    <TouchableOpacity className="px-6 py-3 tablet:px-8 tablet:py-4 w-[47%] border border-[#F99F04] rounded-full">
                      <Text className="text-[#F99F04] font-beVNSemibold text-center text-sm tablet:text-base">
                        Đặt lại lịch
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-6 py-3 tablet:px-8 tablet:py-4 w-[47%] bg-[#F99F04] rounded-full">
                      <Text className="text-white font-beVNSemibold text-center text-sm tablet:text-base">
                        Chỉ đường
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity className="px-6 py-3 tablet:px-8 tablet:py-4 w-[47%] border border-[#F99F04] rounded-full">
                      <Text className="text-[#F99F04] font-beVNSemibold text-center text-sm tablet:text-base">
                        Huỷ giữ chỗ
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-6 py-3 tablet:px-8 tablet:py-4 w-[47%] bg-[#F99F04] rounded-full">
                      <Text className="text-white font-beVNSemibold text-center text-sm tablet:text-base">
                        Viết đánh giá
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            )}
          </View>
        ))}

        {filteredBookings.length === 0 && (
          <Text className="text-center text-base tablet:text-xl font-beVN text-gray-700 mt-[70%] tablet:mt-[50%]">
            Chưa có đặt chỗ nào trong lịch sử của bạn!
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
