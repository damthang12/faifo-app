import {useTripStore} from '@/store/useTripStore';
import React, {useMemo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {PlanModal} from "@/components/modal/PlanModal";

export function AddToItineraryButton({place, tripId, className}: { place: any, tripId?: string, className: string }) {
    const {hasItineraryItem} = useTripStore();
    const [modalVisible, setModalVisible] = useState(false);
    const alreadyAdded = hasItineraryItem(place.id);
    const isAdd = useMemo(() => {
        if (!modalVisible) {
            return hasItineraryItem(place.id);
        }
    }, [hasItineraryItem, place.id, modalVisible]);


    return (
        <View>

            <TouchableOpacity
                disabled={alreadyAdded}
                onPress={() => setModalVisible(true)}
                className={`${className} rounded-full items-center ${isAdd ? 'bg-gray-300' : 'bg-[#F99F04]'}`}
            >
                <Text className="text-white  font-beVNSemibold ">
                    {isAdd ? 'Đã thêm' : 'Thêm lịch trình'}
                </Text>
            </TouchableOpacity>

            {/* Modal chọn ngày */}
            <PlanModal showModal={modalVisible} place={place} tripId={tripId} onClose={() => setModalVisible(false)}/>
        </View>
    );
}
