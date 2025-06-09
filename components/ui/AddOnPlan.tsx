import React, {useState} from 'react';
import {LayoutAnimation, Platform, ScrollView, Text, TouchableOpacity, UIManager, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useTripStore} from '@/store/useTripStore';
import {router} from "expo-router";

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function PlanningList() {
    const { itinerary } = useTripStore();
    const [expandedPlanning, setExpandedPlanning] = useState<Record<string, boolean>>({});

    const toggle = (plan: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedPlanning((prev) => ({
            ...prev,
            [plan]: !prev[plan],
        }));
    };



    const hasAnyItineraryItem = Array.isArray(itinerary) && itinerary.some(planning =>
            Array.isArray(planning.items) && planning.items.some(dayBlock =>
                Array.isArray(dayBlock.itinerary) && dayBlock.itinerary.length > 0
            )
    );

    const handleAction = () => {
        router.push('/(noti)/MaintenanceScreen')
    }

    const handleSp = () => {
        router.push('/(app)/chatbot')
    }

    return (
        <View className="flex-1 justify-between pb-[100px] bg-white">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    paddingBottom: 160,
                    paddingHorizontal: 16,
                    paddingTop: 16,
                }}
            >
                {!hasAnyItineraryItem ? (
                    <View className="flex-1 justify-center items-center py-20">
                        <Text className="text-center text-gray-500 font-beVN">
                            Chưa có lịch trình nào cho ngày hôm nay. Hãy tạo lịch trình mới ngay nào!
                        </Text>
                    </View>
                ) : (
                    itinerary.map((planning) => {
                        return planning.items.map((dayBlock, dayIdx) => {
                            if (!dayBlock.day && !dayBlock.plan) return null;

                            const expanded = expandedPlanning[dayBlock.day];

                            return (
                                <View key={dayIdx} className="mb-4 rounded-2xl bg-white shadow">
                                    {/* Header for each day */}
                                    <TouchableOpacity
                                        onPress={() => toggle(dayBlock.day)}
                                        className="flex-row items-center justify-between mb-2 "
                                    >
                                        <Text className="text-lg font-beVNBold text-gray-700">
                                            {dayBlock.day ? dayBlock.day : dayBlock.plan}
                                        </Text>
                                        <Ionicons
                                            name={expanded ? 'chevron-up' : 'chevron-down'}
                                            size={24}
                                            color="#351904"
                                        />
                                    </TouchableOpacity>

                                    {/* Itinerary List */}
                                    {expanded && (
                                        <View className="mt-4 ">
                                            {dayBlock.itinerary.map((item, index) => {
                                                const isLast = index === dayBlock.itinerary.length - 1;
                                                return (
                                                    <View key={item.id} className="flex-row gap-3">
                                                        <View className="items-center w-8">
                                                            <View className="w-6 h-6 rounded-full bg-[#F99F04] items-center justify-center">
                                                                <Text className="text-white text-sm font-bold">
                                                                    {index + 1}
                                                                </Text>
                                                            </View>
                                                            {!isLast && <View className="w-[2px] flex-1 bg-[#F99F04]" />}
                                                        </View>
                                                        <View className="flex-1 pb-5 ">
                                                            <Text className="text-sm font-beVNtext-gray-700">{item.time}</Text>
                                                            <Text className="font-bold font-beVNBold text-gray-900 mt-2">{item.title}</Text>
                                                            {item.location && (
                                                                <Text className="text-sm font-beVN text-gray-900 mt-1">
                                                                    Địa điểm: {item.location}
                                                                </Text>
                                                            )}
                                                        </View>
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    )}
                                </View>
                            );
                        });
                    })
                )}
            </ScrollView>



            {/* Bottom Fixed Buttons */}
            <View className="flex-row justify-between w-auto px-4">
                <TouchableOpacity
                    onPress={handleSp}
                    className="border border-[#F99F04] px-4 py-3  rounded-full items-center w-[46%]"
                >
                    <Text className="text-[#F99F04] text-xl font-semibold font-beVNSemibold">Trợ giúp từ Faifan</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleAction}
                    className="bg-[#F99F04] px-4 py-3 rounded-full w-[49%] items-center"
                >
                    <Text className="text-white text-xl font-beVNSemibold ">{itinerary.length > 0 ? "Chỉnh sửa lịch trình" : " Thêm lịch trình" }</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
