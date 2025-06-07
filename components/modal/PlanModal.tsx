import {useTripStore} from '@/store/useTripStore';
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Modal from "react-native-modal";
import {useToast} from "@/components/Toast";
import {router} from "expo-router";

interface Props {
    place: any,
    tripId?: string,
    onClose: () => void,
    showModal: boolean,
}

export function PlanModal({place, tripId, onClose, showModal}: Props) {
    const {addItineraryItem, itinerary} = useTripStore();
    const [day, setDay] = useState('');
    const {showToast} = useToast()

    const trip = itinerary.find(item => item.id === tripId);
    const startDate = trip?.startDate;

    const handleSeeMore = () => {
        router.push('/(noti)/MaintenanceScreen')
    }


    const handleAddToDay = (day: string) => {
        const newItem = {
            // id: Date.now().toString(),
            id: place.id,
            time: place.expendTime,
            title: place.name,
            location: place.location || '',
        };

        addItineraryItem(tripId || '', day, newItem);
        showToast('Lịch trình này đã được thêm vào trong chuyến đi này của bạn. Bạn có thể xem hoặc chỉnh sửa lại nếu muốn.',
            'success',
            (
                <TouchableOpacity
                    onPress={handleSeeMore}
                    className="p-3 bg-white border-gray-400 border w-[143px] rounded-[32px]  mt-3">

                    <Text className="text-gray-900 font-beVN font-semibold text-center "> Xem lịch trình</Text>
                </TouchableOpacity>
            )
        )
        onClose()
    };


    const DayOptions = startDate ? generateDayOptions(startDate, 5) : [];

    function generateDayOptions(startDate: string, totalDays: number): string[] {
        const baseParts = startDate.split('/'); // "10/6/2025"
        const baseDate = new Date(+baseParts[2], +baseParts[1] - 1, +baseParts[0]);
        const weekdays = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        return Array.from({length: totalDays}, (_, i) => {
            const currentDate = new Date(baseDate);
            currentDate.setDate(baseDate.getDate() + i); // 👉 Tự động tăng ngày

            const weekday = weekdays[currentDate.getDay()]; // 👉 Tự động tính thứ
            const dateStr = currentDate.toLocaleDateString('vi-VN'); // "dd/MM/yyyy"

            return `Ngày ${i + 1} - ${weekday}, ${dateStr}`;
        });
    }


    return (

        <Modal
            isVisible={showModal}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection="down"
            style={{justifyContent: 'flex-end', margin: 0}}>
            <View className="bg-white px-5 pt-4 rounded-t-3xl  items-center gap-10 pb-10 overflow-hidden">
                <View className="h-[6px] w-[100px] bg-gray-300 rounded-2xl"/>
                <View className="overflow-y-auto h-[350px] w-full">
                    <Text className="text-left font-beVNBold text-2xl  text-gray-900 mb-4">Chọn ngày thêm lịch
                        trình</Text>
                    <ScrollView className="">
                        {DayOptions?.map((item, index) => (
                            <TouchableOpacity
                                key={`${item} + ${index}}`}
                                onPress={() => setDay(item)}
                                className={`p-3 gap-2 flex-col   `}
                            >
                                <Text
                                    className={`text-center text-xl font-beVNSemibold ${
                                        item === day ? 'text-[#F99F04]' : 'text-gray-700'
                                    }`}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View className="flex w-auto flex-row  justify-between gap-3 overflow-hidden">
                        <TouchableOpacity
                            onPress={onClose}
                            className=" w-[48%]   px-4 py-3 rounded-full items-center border border-[#F99F04]">
                            <Text className="text-[#F99F04] text-xl font-semibold font-beVNSemibold">Huỷ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleAddToDay(day)}
                            className=" w-[48%]  bg-[#F99F04] px-4 py-3  rounded-full items-center">
                            <Text className="text-white text-xl font-semibold font-beVNSemibold">Xác nhận</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </Modal>
    );
}
