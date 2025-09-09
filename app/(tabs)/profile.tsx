import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import CheckInIcon from "@/assets/Icon/Checkin";
import ClockIcon from "@/assets/Icon/Clock";
import CupIcon from "@/assets/Icon/Cup";
import HeartIcon from "@/assets/Icon/Heart";
import InviteIcon from "@/assets/Icon/Invite";
import LanguageIcon from "@/assets/Icon/Language";
import LogoutIcon from "@/assets/Icon/Logout";
import ManageBooking from "@/assets/Icon/ManageBooking";
import MoneyIcon from "@/assets/Icon/Money";
import Profile from "@/assets/Icon/Profile";
import Avtar from "@/assets/images/Avatar.png";
import LogoutModal from "@/components/modal/Logout";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;

  const user = {
    name: "Thanh Thương",
    email: "thanhthuong@faifo.com",
    country: "Việt Nam",
    joinDate: "18/04/2025",
  };
  const options = [
    {
      label: "Thông tin tài khoản",
      icon: <Profile size={isTablet ? 32 : 24} color="#252B37" />,
      onPress: () => router.push("/(app)/profileDetail"),
    },
    {
      label: "Quản lý đặt chỗ",
      icon: <ManageBooking size={isTablet ? 32 : 24} color="#252B37" />,
      onPress: () => router.push("/booking/booked"),
    },
    {
      label: "Săn dấu ấn",
      icon: <CupIcon size={isTablet ? 32 : 24} color="#252B37" />,
      onPress: () => router.push("/(noti)/NoSupport1"),
    },
    {
      label: "Danh sách yêu thích",
      icon: <HeartIcon size={isTablet ? 32 : 24} color="#252B37" />,
      onPress: () => router.push("/(app)/FavoritesScreen"),
    },
    {
      label: "Bản đồ",
      icon: <CheckInIcon size={isTablet ? 32 : 24} color="#252B37" />,
      onPress: () => router.push("/(app)/map"),
    },
    {
      label: "Lịch sử hoạt động",
      icon: <ClockIcon size={isTablet ? 32 : 24} color="#252B37" />,
      onPress: () => router.push("/(app)/history"),
    },
    {
      label: "Ngôn ngữ sử dụng",
      icon: <LanguageIcon size={isTablet ? 32 : 24} color="#252B37" />,
      onPress: () => router.push("/(app)/language"),
    },
    {
      label: "Tiền tệ",
      icon: <MoneyIcon size={isTablet ? 32 : 24} color="#252B37" />,
      onPress: () => router.push("/(app)/currency"),
    },
    {
      label: "Mời bạn bè",
      icon: <InviteIcon size={isTablet ? 32 : 24} color="#252B37" />,
      onPress: () => router.push("/(app)/invite"),
    },
    {
      label: "Đăng xuất tài khoản",
      icon: <LogoutIcon size={isTablet ? 32 : 24} color="#252B37" />,
      onPress: () => setShowLogoutModal(true),
    },
  ];

  return (
    <View className="flex-1 bg-white px-4 tablet:px-8 pt-20">
      {/* Header */}
      {/* Tài khoản */}
      <View className=" mb-6">
        <Text className="text-[#351904] text-[40px] tablet:text-[48px] uppercase font-semibold font-phudu">
          Tài khoản
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }}
        className="flex-1 bg-white  "
      >
        <View className=" mb-6 items-center justify-center gap-2">
          <Image
            source={Avtar}
            width={120}
            height={120}
            className="rounded-full w-[120px] h-[120px]"
          />
          <Text className="text-xl tablet:text-2xl font-bold text-black font-beVNSemibold mt-4">
            {user.name}
          </Text>
          <Text className="text-gray-600 text-sm tablet:text-base">
            {user.email}
          </Text>
        </View>

        {/* Quốc gia & Ngày tham gia */}
        <View className="flex-row items-center justify-center w-full mb-3 p-4 bg-[#F99F04] rounded-xl">
          <View className="w-1/2 flex-col items-center justify-center gap-2">
            <Text className="text-white text-sm font-beVN">Quốc gia</Text>
            <Text className="text-white font-beVNSemibold">{user.country}</Text>
          </View>
          <View className="w-1/2 flex-col items-center justify-center gap-2">
            <Text className="text-white text-sm font-beVN">Ngày tham gia</Text>
            <Text className="text-white font-beVNSemibold">
              {user.joinDate}
            </Text>
          </View>
        </View>

        {/* Các tùy chọn */}
        <View className=" flex flex-col gap-3 tablet:gap-4">
          {options.map((opt, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={opt.onPress}
              className="flex-row items-center justify-between border-b border-gray-200 py-4 tablet:py-5 "
            >
              <View className="flex-row items-center gap-3">
                {opt.icon}
                <Text className="text-lg tablet:text-xl text-gray-700 font-beVNSemibold">
                  {opt.label}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        <LogoutModal
          visible={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onLogout={() => {
            setShowLogoutModal(false);
            router.replace("/(login)");
          }}
        />
      </ScrollView>
    </View>
  );
}
