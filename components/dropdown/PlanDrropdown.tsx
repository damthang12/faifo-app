import {useEffect, useRef, useState} from 'react';
import {Animated, LayoutAnimation, Platform, Text, TouchableOpacity, UIManager, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {itinerarys} from "@/constants/MockData";
import HA from '@/assets/images/plan/hoi-an.png';
import {useTripStore} from "@/store/useTripStore";
import {Planning} from "@/types/type";

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}


export function ItineraryDropdown() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isSameDay, setIsSameDay] = useState(false);
    const [participants, setParticipants] = useState('1');
    const [notes, setNotes] = useState('');
    const [expanded, setExpanded] = useState(true);
    const animation = useRef(new Animated.Value(1)).current;
    const {addPlannedTrip, itinerary, updateTripItinerary} = useTripStore()
    useEffect(() => {
        Animated.timing(animation, {
            toValue: expanded ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [expanded]);

    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    // const handleAddItinerary = () => {
    //     useTripStore.getState().addItineraryItems(itinerary);
    // };

    const handleAddItinerary = () => {
        const existingTrip = itinerary.find(
            (trip) => trip.place === 'Chuyến đi Hội An'
        );
        const randomId = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingTrip) {
            updateTripItinerary(existingTrip?.id || '', itinerarys.items);
        } else {
            const newTrip: Planning = {
                id: randomId,
                place: itinerarys.place,
                startDate:  startDate?.toLocaleDateString() || new Date(Date.now()).toLocaleDateString(),
                endDate: (isSameDay ? startDate : endDate)?.toLocaleDateString() || new Date(Date.now() + 86400000).toLocaleDateString(),
                participants: 1,
                notes: '',
                image: HA ,
                isFinished: itinerarys.isFinished,
                items: itinerarys.items,
            };

            addPlannedTrip(newTrip);
        }
    };




    return (
        <View className="my-4  rounded-2xl shadow">
            <TouchableOpacity onPress={toggle} className="flex-row items-center justify-between mb-2">
                <Text className="text-xl font-bold text-[#8B3A00] font-beVN">{itinerarys.items[0].plan}</Text>
                <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={24} color="#351904"/>
            </TouchableOpacity>

            {expanded && (
                <Animated.View
                    style={{
                        opacity: animation,
                        transform: [
                            {
                                translateY: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-10, 0],
                                }),
                            },
                        ],
                    }}
                >
                    <View className="space-y-3">
                        {itinerarys?.items.map((dayBlock, dayIndex) => (
                            <View key={dayIndex} className="space-y-3">
                                {/* Tiêu đề ngày */}
                                {/*{dayBlock.day && (*/}
                                {/*    <Text className="text-lg font-bold text-[#8B3A00] font-beVN mb-2">*/}
                                {/*        {dayBlock.day || `Ngày ${dayBlock.day + 1}`}*/}
                                {/*    </Text>*/}
                                {/*)}*/}


                                {dayBlock.itinerary.map((item, index) => {
                                    const isLast = index === dayBlock.itinerary.length - 1;
                                    return (
                                        <View key={item.id} className="flex-row gap-2">
                                            {/* Cột số thứ tự & line */}
                                            <View className="items-center w-8">
                                                <View className="w-6 h-6 rounded-full bg-[#F99F04] items-center justify-center">
                                                    <Text className="text-white text-sm font-bold">{index + 1}</Text>
                                                </View>
                                                {!isLast && <View className="w-[2px] flex-1 bg-[#F99F04]" />}
                                            </View>

                                            {/* Nội dung lịch trình */}
                                            <View className="flex-1 pb-6 font-beVN">
                                                <Text className="text-sm text-gray-700 font-beVN">{item.time}</Text>
                                                <Text className="font-bold text-gray-900 mt-1 font-beVN">{item.title}</Text>
                                                {item.location && (
                                                    <Text className="text-xs text-gray-500 mt-1 font-beVN">
                                                        Địa điểm: {item.location}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        ))}

                        {/* Nút thêm lịch trình */}
                        <TouchableOpacity
                            onPress={handleAddItinerary}
                            className="mt-4 bg-[#FFF1CB] p-4 rounded-full items-center"
                        >
                            <Text className="text-[#8B3A00] font-semibold font-beVN">
                                Thêm lịch trình vào chuyến đi
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        </View>
    );
}
