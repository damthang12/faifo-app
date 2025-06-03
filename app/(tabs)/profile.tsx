import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image, TextInput} from 'react-native';
import {useRouter} from 'expo-router';

import {Ionicons} from '@expo/vector-icons';
import Avtar from '@/assets/images/Avatar.png';
import LogoutModal from "@/components/modal/Logout";
import ArrLeft from "@/assets/images/arrow-left.png";

export default function ProfileScreen() {
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const user = {
        name: 'Thanh Thương',
        email: 'thanhthuong@faifo.com',
        country: 'Việt Nam',
        joinDate: '18/04/2025',
    };
    const options = [
        {
            label: 'Thông tin tài khoản',
            icon: 'person-outline' as const,
            onPress: () => router.push('/(app)/profileDetail'),
        },
        {
            label: 'Quản lý đặt chỗ',
            icon: 'calendar-outline' as const,
            onPress: () => router.push('/(app)/profileDetail'),
        },
        {
            label: 'Danh sách yêu thích',
            icon: 'heart-outline' as const,
            onPress: () => router.push('/(app)/FavoritesScreen'),
        },
        {
            label: 'Lịch sử hoạt động',
            icon: 'time-outline' as const,
            onPress: () => router.push('/(app)/history'),
        },
        {
            label: 'Ngôn ngữ sử dụng',
            icon: 'language-outline' as const,
            onPress: () => router.push('/(app)/language'),
        },
        {
            label: 'Tiền tệ',
            icon: 'cash-outline' as const,
            onPress: () => router.push('/(app)/currency'),
        },
        {
            label: 'Mời bạn bè',
            icon: 'share-social-outline' as const,
            onPress: () => router.push('/(app)/invite'),
        },
        {
            label: 'Đăng xuất tài khoản',
            icon: 'log-out-outline' as const,
            onPress: () => setShowLogoutModal(true),

        },
    ];

    return (
        <View className="flex-1 bg-white px-4 pt-20">
            {/* Header */}
            {/* Tài khoản */}
            <View className=" mb-6">
                <Text className="text-[#351904] text-[40px] uppercase font-semibold font-phudu">Tài khoản</Text>
            </View>
            <ScrollView contentContainerStyle={{paddingBottom: 150}} className="flex-1 bg-white  ">


                <View className=" mb-6 items-center justify-center gap-2">
                    <Image source={Avtar} width={120} height={120} className="rounded-full w-[120px] h-[120px]"/>
                    <Text className="text-xl font-bold text-black font-beVNBold mt-1">{user.name}</Text>
                    <Text className="text-gray-600 text-sm">{user.email}</Text>
                </View>

                {/* Quốc gia & Ngày tham gia */}
                <View className="flex-row items-center justify-center w-full mb-3 p-4 bg-[#F99F04] rounded-xl">
                    <View className="w-1/2 flex-col items-center justify-center gap-2">
                        <Text className="text-white text-sm font-beVN">Quốc gia</Text>
                        <Text className="text-white font-beVNSemibold">{user.country}</Text>
                    </View>
                    <View className="w-1/2 flex-col items-center justify-center gap-2">
                        <Text className="text-white text-sm font-beVN">Ngày tham gia</Text>
                        <Text className="text-white font-beVNSemibold">{user.joinDate}</Text>
                    </View>
                </View>

                {/* Các tùy chọn */}
                <View className="space-y-3">
                    {options.map((opt, idx) => (
                        <TouchableOpacity
                            key={idx}
                            onPress={opt.onPress}
                            className="flex-row items-center justify-between border-b border-gray-200 py-4"
                        >
                            <View className="flex-row items-center gap-3">
                                <Ionicons name={opt.icon} size={20} color="#8B3A00"/>
                                <Text className="text-lg font-bold text-gray-700 font-beVNBold">{opt.label}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#ccc"/>
                        </TouchableOpacity>
                    ))}
                </View>


                <LogoutModal
                    visible={showLogoutModal}
                    onClose={() => setShowLogoutModal(false)}
                    onLogout={() => {
                        setShowLogoutModal(false);
                        router.replace('/(login)');
                    }}
                />
            </ScrollView>

        </View>

    );
}
