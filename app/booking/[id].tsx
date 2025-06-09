import {Image, Pressable, ScrollView, Text, TouchableOpacity, View, Alert} from 'react-native';
import React, {useState} from 'react';
import {Ionicons} from '@expo/vector-icons';
import ArrLeft from "@/assets/images/arrow-left.png";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useTranslation} from "react-i18next";
import {PLACES_SECTIONS} from "@/constants/MockData";
import CalendarModal from "@/components/calendar/CustomCalendar";
import PeopleCountModal from "@/components/modal/PeopleCount";
import Profile from "@/assets/Icon/Profile";
import {useBookingStore} from "@/store/useBookingStore";
import KHHA from '@/assets/images/detail/KHHA.png';
import dayjs from "dayjs";
import {formatDate} from "@/constants/contanst";

export default function BookingScreen() {
    const {t} = useTranslation()
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const [selectedTime, setSelectedTime] = useState("");
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [peopleCount, setPeopleCount] = useState(2);
    const {addBooking} = useBookingStore();

    const [image, setImage] = useState(KHHA);
    const [location, setLocation] = useState('');
    const [place, setPlace] = useState('');



    const bookings = PLACES_SECTIONS.flatMap(s => s.items).find(p => p.id === id);


    const handleBack = () => {
        setTimeout(() => {
            router.back();
        }, 300);
    };

    const handleBooking = () => {
        if (!selectedDate || !selectedTime || !selectedBookingId) {
            Alert.alert(
                'Thiếu thông tin',
                'Vui lòng chọn ngày và giờ trước khi đặt chỗ.'
            );
            return;
        }
        addBooking({
            id: selectedBookingId ?? '',
            name: place,
            date: selectedDate,
            time: selectedTime,
            location: location,
            img: image,
            isCancel: false,
            status: 'Đang giữ chỗ'
        });

        router.push('/booking/success');
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

            <ScrollView contentContainerStyle={{marginTop: 12}}>
                <View className="flex-row gap-2 justify-between mb-5">
                    <TouchableOpacity
                        onPress={() => setCalendarVisible(true)}
                        className="w-[55%] border border-gray-300 p-3 rounded-3xl flex-row justify-between items-center"
                    >
                        <View className="flex-row gap-2 items-center">
                            <Ionicons name="calendar-outline" size={24} color="#000"/>
                            <Text className="text-gray-900 font-beVNSemibold text-base">
                                {selectedDate ? formatDate(selectedDate) : 'Chọn ngày'}
                            </Text>
                        </View>
                        <Ionicons name="chevron-down" size={20} color="#000"/>
                    </TouchableOpacity>

                    {/* Số người */}
                    <TouchableOpacity
                        onPress={() => setShowModal(true)}
                        className="flex-row items-center p-3 border justify-between border-gray-300 w-[40%] rounded-3xl ">


                        <View className="flex-row gap-2 items-center">
                            <Profile size={24} color="#000"/>
                            <Text className="text-gray-900 font-beVNSemibold text-base">
                                {peopleCount ? peopleCount : '0'}
                            </Text>
                        </View>
                        <Ionicons name="chevron-down" size={20} color="#000"/>

                    </TouchableOpacity>

                </View>
                {/* Chọn ngày */}


                {/* Danh sách lựa chọn */}
                {bookings?.booking?.map((b, idx) => (
                    <View key={idx}
                          className={`mb-6 p-4 border  rounded-2xl ${
                              selectedBookingId === b.id ? ' border-[#F99F04] bg-[#FFECB81A]' : 'border-gray-300'
                          }`}>
                        <View className="flex-row gap-2 items-center justify-between mb-4">

                            <Text className="font-medium font-beVNMedium text-[#000000] ">{b.name}</Text>

                            <View className="flex-row justify-end ">
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedBookingId(b.id);
                                        setImage(b.image)
                                        setLocation(b.location ?? '')
                                        setPlace(b.name)
                                    }}
                                    className={`p-1.5 rounded-full border ${
                                        selectedBookingId === b.id ? ' border-[#F99F04]' : 'border-gray-300'
                                    }`}
                                >
                                    <Text className={`font-beVN w-3 h-3 rounded-full ${selectedBookingId === b.id ? 'bg-[#F99F04]' : 'text-black'}`}/>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 8}}>
                            {b.time.map((t, i) => {
                                const isDisabled = selectedBookingId !== b.id;
                                const isSelected = selectedTime === t && selectedBookingId === b.id;
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => !isDisabled && setSelectedTime(t)}
                                        className={`px-4 py-2 rounded-full ${isSelected ? 'bg-[#F99F04]' : 'border border-gray-300'} ${isDisabled ? 'opacity-30' : ''}`}>
                                        <Text
                                            className={`font-beVN ${isSelected ? 'text-white' : 'text-black'}`}>{t}</Text>

                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        <Text className="text-xs text-[#8B3A00] font-beVN mt-4 bg-[#FFECB8] p-3 rounded-lg">
                            Miễn phí huỷ đặt chỗ trước 08:00 AM ngày {selectedDate}
                        </Text>

                        <View className="h-[1px] bg-gray-100 my-4"/>
                        <View className="flex-row items-center gap-2">
                            {b.price && (
                                <View className="flex-col gap-2">
                                    <Text className="text-base text-gray-600 line-through font-beVNSemibold">Tổng
                                        cộng: {b.originalPrice}</Text>
                                    <Text className="text-xl font-bold text-gray-800 font-beVNBold">Chỉ
                                        còn: {b.price}</Text>

                                </View>
                            )}
                            {!b.price && (
                                <Text className="text-xl font-bold text-[#351904] font-beVNSemibold">Tổng
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
            <Pressable onPress={handleBooking} className="bg-[#F99F04] p-5 rounded-full items-center mb-10">
                <Text className="text-white text-xl font-semibold font-beVNSemibold">Đặt chỗ</Text>
            </Pressable>

            <CalendarModal
                isVisible={calendarVisible}
                onClose={() => setCalendarVisible(false)}
                onSelectDate={(date) => {
                    const formatted = dayjs(date).format('YYYY-MM-DDTHH:mm');
                    setSelectedDate(formatted);
                }}            />

            <PeopleCountModal
                isVisible={showModal}
                onClose={() => setShowModal(false)}
                onSelect={(count) => setPeopleCount(count)}
                selected={peopleCount}
            />
        </View>
    );
}
