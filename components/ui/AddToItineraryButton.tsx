import { useTripStore } from '@/store/useTripStore';
import {useMemo, useState} from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

const DayOptions = ['Ngày 1', 'Ngày 2', 'Ngày 3']; // Tuỳ biến

export function AddToItineraryButton({ place, tripId }: { place: any, tripId?: string }) {
    const { addItineraryItem, hasItineraryItem } = useTripStore();
    const [modalVisible, setModalVisible] = useState(false);
    const alreadyAdded = hasItineraryItem(place.id);

    const isAdd = useMemo(() => {
        if (!modalVisible){
            return hasItineraryItem(place.id);
        }
    }, [hasItineraryItem, place.id,modalVisible]);


    const handleAddToDay = (day: string) => {
        const newItem = {
            // id: Date.now().toString(),
            id: place.id,
            time: place.expendTime,
            title: place.name,
            location: place.location || '',
        };

        addItineraryItem(tripId || '' ,day, newItem);
        setModalVisible(false);
    };

    return (
        <View>

            <TouchableOpacity
                disabled={alreadyAdded}
                onPress={() => setModalVisible(true)}
                className={`p-3 rounded-full items-center ${isAdd ? 'bg-gray-300' : 'bg-[#F99F04]'}`}
            >
                <Text className="text-white font-medium font-beVN">
                    {isAdd ? 'Đã thêm' : 'Thêm lịch trình'}
                </Text>
            </TouchableOpacity>

            {/* Modal chọn ngày */}
            <Modal visible={modalVisible} transparent animationType="fade">
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-4 rounded-2xl w-[80%]">
                        <Text className="text-center font-bold text-lg mb-4">Chọn ngày thêm lịch trình</Text>
                        {DayOptions.map((day) => (
                            <TouchableOpacity
                                key={day}
                                className="p-3 border-b border-gray-200"
                                onPress={() => handleAddToDay(day)}
                            >
                                <Text className="text-center text-[#8B3A00] font-semibold font-beVNSemibold">{day}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-4 items-center">
                            <Text className="text-red-500 font-semibold">Huỷ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
