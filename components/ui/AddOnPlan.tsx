import React, {useState} from 'react';
import {LayoutAnimation, Platform, ScrollView, Text, TouchableOpacity, UIManager, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useTripStore} from '@/store/useTripStore';

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
                            const expanded = expandedPlanning[dayBlock.day];

                            return (
                                <View key={dayBlock.day} className="mb-4 rounded-2xl bg-white  py-2 shadow">
                                    {/* Header for each day */}
                                    <TouchableOpacity
                                        onPress={() => toggle(dayBlock.day)}
                                        className="flex-row items-center justify-between mb-2"
                                    >
                                        <Text className="text-xl font-bold text-[#8B3A00] font-beVN">
                                            {dayBlock.day || dayBlock.plan}
                                        </Text>
                                        <Ionicons
                                            name={expanded ? 'chevron-up' : 'chevron-down'}
                                            size={24}
                                            color="#351904"
                                        />
                                    </TouchableOpacity>

                                    {/* Itinerary List */}
                                    {expanded && (
                                        <View className="space-y-4 mt-4">
                                            {dayBlock.itinerary.map((item, index) => {
                                                const isLast = index === dayBlock.itinerary.length - 1;
                                                return (
                                                    <View key={item.id} className="flex-row gap-3">
                                                        <View className="items-center w-8">
                                                            <View className="w-6 h-6 rounded-full bg-[#F99F04] items-center justify-center">
                                                                <Text className="text-white text-sm font-bold">{index + 1}</Text>
                                                            </View>
                                                            {!isLast && <View className="w-[2px] flex-1 bg-[#F99F04]" />}
                                                        </View>
                                                        <View className="flex-1 pb-5 font-beVN">
                                                            <Text className="text-sm text-gray-700">{item.time}</Text>
                                                            <Text className="font-bold text-gray-900 mt-1">{item.title}</Text>
                                                            {item.location && (
                                                                <Text className="text-xs text-gray-500 mt-1">Địa điểm: {item.location}</Text>
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
            <View className="flex-row justify-between">
                <TouchableOpacity
                    onPress={() => {}}
                    className="border border-[#F99F04] px-4 py-3 rounded-full items-center w-[48%]"
                >
                    <Text className="text-[#F99F04] text-[16px] font-semibold font-beVNSemibold">Trợ giúp từ Faifan</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {}}
                    className="bg-[#F99F04] px-4 py-3 rounded-full w-[48%] items-center"
                >
                    <Text className="text-white text-[16px] font-semibold font-beVN">Thêm lịch trình</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
