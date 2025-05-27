import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Ionicons} from '@expo/vector-icons';
import ArrLeft from "@/assets/images/arrow-left.png";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useTranslation} from "react-i18next";
import {PLACES_SECTIONS} from "@/constants/MockData";
import CalendarModal from "@/components/calendar/CustomCalendar";
import PeopleCountModal from "@/components/modal/PeopleCount";
import Profile from "@/assets/Icon/Profile";

export default function BookingScreen() {
    const {t} = useTranslation()
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const [selectedTime, setSelectedTime] = useState("");
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [peopleCount, setPeopleCount] = useState(2);


    const bookings = PLACES_SECTIONS.flatMap(s => s.items).find(p => p.id === id);


    const handleBack = () => {
        setTimeout(() => {
            router.back();
        }, 300);
    };

    return (
        <View className="flex-1 bg-white px-4 pt-16">
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity onPress={handleBack}>
                    <Image source={ArrLeft} className="h-6 w-6"/>
                </TouchableOpacity>
                <Text className="text-xl font-semibold">Đặt chỗ</Text>
                <View className="w-6 h-6"/>
            </View>

            <ScrollView  contentContainerStyle={{marginTop: 12}}>
                <View className="flex-row gap-4 justify-between mb-5">
                    <TouchableOpacity
                        onPress={() => setCalendarVisible(true)}
                        className="w-[47%] border border-gray-300 p-3 rounded-3xl flex-row justify-between items-center"
                    >
                        <View className="flex-row gap-2 items-center">
                            <Ionicons name="calendar-outline" size={24} color="#9CA3AF"/>
                            <Text className="text-gray-700 font-beVN text-base">
                                {selectedDate ? selectedDate : 'Chọn ngày'}
                            </Text>
                        </View>
                        <Ionicons name="chevron-down" size={20} color="#9CA3AF"/>
                    </TouchableOpacity>

                    {/* Số người */}
                    <TouchableOpacity
                        onPress={() => setShowModal(true)}
                        className="flex-row items-center p-3 border justify-between border-gray-300 w-[47%] rounded-3xl ">


                        <View className="flex-row gap-2 items-center">
                            <Profile size={24} />
                            <Text className="text-gray-700 font-beVN text-base">
                                {peopleCount ? peopleCount : '0'}
                            </Text>
                        </View>
                        <Ionicons name="chevron-down" size={20} color="#9CA3AF"/>

                    </TouchableOpacity>

                </View>
                {/* Chọn ngày */}


                {/* Danh sách lựa chọn */}
                {bookings?.booking?.map((b, idx) => (
                    <View key={idx} className="mb-6 p-4 border border-[#F99F04] rounded-2xl">
                        <Text className="font-medium font-beVN text-[#000000] mb-4">{b.name}</Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{gap: 8}}>
                            {b.time.map((t, i) => (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => setSelectedTime(t)}
                                    className={` px-4 py-2 rounded-full ${selectedTime === t ? 'bg-[#F99F04] text-white' : ' border border-gray-300 '}`}
                                >
                                    <Text className={`font-beVN ${selectedTime === t ? 'bg-[#F99F04] text-white' : 'text-black'}`}>{t}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <Text className="text-xs text-[#8B3A00] font-beVN mt-4 bg-[#FFECB8] p-3 rounded-lg">
                            Miễn phí huỷ đặt chỗ trước 08:00 AM ngày {selectedDate}
                        </Text>

                        <View className="h-[1px] bg-gray-100 my-4"/>
                        <View className="flex-row items-center gap-2">
                            {b.price && (
                                <View className="flex-col gap-2">
                                    <Text className="text-base text-gray-600 line-through font-beVN">Tổng
                                        cộng: {b.originalPrice}</Text>
                                    <Text className="text-xl font-bold text-gray-800 font-beVN">Chỉ còn: {b.price}</Text>

                                </View>
                            )}
                            {!b.price && (
                                <Text className="text-base font-bold text-[#351904] font-beVN">Tổng
                                    cộng: {b.originalPrice}</Text>
                            )}
                        </View>
                        {b.price && (
                            <Text className="text-xs text-[#8B3A00] mt-1 font-beVN">
                                Giá ưu đãi chỉ được áp dụng cho khách đặt chỗ trước
                            </Text>
                        )}
                    </View>
                ))}


            </ScrollView>

            {/* Nút đặt chỗ */}
            <TouchableOpacity className="bg-[#F99F04] p-5 rounded-full items-center mb-10">
                <Text className="text-white text-xl font-semibold font-beVN">Đặt chỗ</Text>
            </TouchableOpacity>

            <CalendarModal
                isVisible={calendarVisible}
                onClose={() => setCalendarVisible(false)}
                onSelectDate={(date) => setSelectedDate(date)}
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
