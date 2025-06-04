import React, { useState } from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import ArrLeft from "@/assets/images/arrow-left.png";
import {useRouter} from "expo-router";
import {useBookingStore} from "@/store/useBookingStore";

const tabs = ['Đang giữ chỗ', 'Hoàn thành', 'Đã huỷ'];


export default function BookingManagementScreen() {
    const [activeTab, setActiveTab] = useState('Đang giữ chỗ');
    const router = useRouter();


    const {bookings} = useBookingStore();
    const filteredBookings = bookings.filter(b => b.status === activeTab);

    const handleBack = () => {
        setTimeout(() => {
            router.back();
        }, 300);
    };
    return (
        <View className="flex-1 bg-white pt-20 px-4">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity onPress={handleBack}>
                    <Image source={ArrLeft} className="h-6 w-6"/>
                </TouchableOpacity>
                <Text className="text-2xl text-gray-900 font-semibold">Quản lý đặt chỗ</Text>
                <View className="w-6 h-6"/>
            </View>

            {/* Tabs */}
            <View className="flex-row mb-4 justify-between space-x-4">
                {tabs.map(tab => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        className={`px-4 py-2 ${
                            activeTab === tab ? 'bg-primary border-b border-b-[#F99F04]' : ''
                            
                        }`}
                    >
                        <Text className={`text-xl font-beVNSemibold ${activeTab === tab ? 'text-[#F99F04]' : 'text-gray-600'}`}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Booking List */}
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {filteredBookings.map((b, index) => (
                    <View
                        key={index}
                        className="mb-4 p-4  rounded-xl border border-gray-200 space-y-2"
                    >
                     <View className='flex-row justify-between'>
                         <Text className="text-gray-800 font-beVNSemibold">{b.date}</Text>
                         <Text className="text-gray-800 font-beVNSemibold">{b.id}</Text>
                     </View>
                        <View className='w-full h-[1px] bg-gray-300 my-4'/>

                        <View>
                            <Image source={b.img} className="h-6 w-6"/>


                            <Text className="text-lg font-semibold">{b.name}</Text>
                            <Text className="text-sm text-neutral-600">~ {b.time}</Text>
                            <Text className="text-sm text-neutral-600">{b.location}</Text>

                        </View>


                        {/* Actions */}
                        {b.status === 'Đang giữ chỗ' && (
                            <View className="flex-row justify-between mt-2 items-center gap-2">
                                <TouchableOpacity className="px-6 py-4 w-[47%] border border-[#F99F04] rounded-full">
                                    <Text className="text-[#F99F04] font-beVNSemibold text-center">Huỷ giữ chỗ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="px-6 py-4 w-[47%] bg-[#F99F04] rounded-full">
                                    <Text className="text-white font-beVNSemibold text-center">Chỉ đường</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}

                {filteredBookings.length === 0 && (
                    <Text className="text-center text-neutral-400 mt-10">Không có dữ liệu</Text>
                )}
            </ScrollView>
        </View>
    );
}
