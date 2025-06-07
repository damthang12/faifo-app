import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ArrLeft from "@/assets/images/arrow-left.png";
import {useRouter} from "expo-router";
import {useBookingStore} from "@/store/useBookingStore";
import ClockIcon from "@/assets/Icon/Clock";
import CheckInIcon from "@/assets/Icon/Checkin";
import {formatDate} from "@/constants/contanst";

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
                            activeTab === tab ? ' border-b border-b-[#F99F04]' : ''
                            
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
                        className="mb-4 p-4  rounded-xl border border-gray-200 "
                    >
                     <View className='flex-row justify-between'>
                         <Text className="text-gray-800 font-beVNSemibold">{formatDate(b.date)}</Text>
                         <Text className="text-gray-800 font-beVNSemibold">#{b.id}</Text>
                     </View>
                        <View className='w-full h-[1px] bg-gray-300 my-4'/>

                        <View className="flex-row items-center gap-3 mb-4">
                            <View className="h-full max-h-[96px] w-full max-w-[96px]">
                                <Image source={b.img} className="h-full w-full rounded-3xl"/>

                            </View>


                            <View className="gap-2 justify-start h-full flex-col">
                                <Text className="text-lg font-semibold">{b.name}</Text>
                                <View className="flex-row gap-2 items-center">
                                    <ClockIcon size={24}/>
                                    <Text className="text-sm text-gray-800 font-beVN">~ {b.time} </Text>

                                </View>
                                <View className="flex-row gap-2 items-center">
                                    <CheckInIcon size={24} color="#000"/>

                                    <Text className="text-sm text-gray-800 font-beVN">{b.location}</Text>
                                </View>
                            </View>


                        </View>


                        {/* Actions */}
                        {b.status === 'Đang giữ chỗ' && (
                            <View className="flex-row justify-between mt-2 items-center gap-2">
                                {b.isCancel ? (
                                    <>
                                        <TouchableOpacity className="px-6 py-3 w-[47%] border border-[#F99F04] rounded-full">
                                            <Text className="text-[#F99F04] font-beVNSemibold text-center">Đặt lại lịch</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className="px-6 py-3 w-[47%] bg-[#F99F04] rounded-full">
                                            <Text className="text-white font-beVNSemibold text-center">Chỉ đường</Text>
                                        </TouchableOpacity>
                                    </>

                                ) : (
                                    <>
                                        <TouchableOpacity className="px-6 py-3 w-[47%] border border-[#F99F04] rounded-full">
                                            <Text className="text-[#F99F04] font-beVNSemibold text-center">Huỷ giữ chỗ</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className="px-6 py-3 w-[47%] bg-[#F99F04] rounded-full">
                                            <Text className="text-white font-beVNSemibold text-center">Viết đánh giá</Text>
                                        </TouchableOpacity>
                                    </>


                                )}


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
