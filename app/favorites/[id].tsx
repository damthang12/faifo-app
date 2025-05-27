import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image, Pressable,
} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import { ACTIVITIES_DATA } from '@/constants/MockData';
import VH from "@/assets/Icon/VH";
import AT from "@/assets/Icon/AT";
import CI from "@/assets/Icon/CI";
import QLN from "@/assets/Icon/QLN";
import BT from "@/assets/Icon/BT";
import LN from "@/assets/Icon/LN";
import ArrLeft from "@/assets/images/arrow-left.png";
import {Ionicons} from "@expo/vector-icons";
import {useFavoriteStore} from "@/store/useFavoriteStore";

const TABS = ['Văn hoá', 'Checkin', 'Ẩm thực', 'Bảo tàng', 'Quà lưu niệm', 'Làng nghề'];

const CATEGORY_TABS: TabKey[] = [
    {
        title: 'Văn hoá',
        image: (isActive: boolean) => <VH color={isActive ? 'white' : '#414651'} />,
    },
    {
        title: 'Ẩm thực',
        image: (isActive: boolean) => <AT color={isActive ? 'white' : '#414651'} />,
    },
    {
        title: 'Checkin',
        image: (isActive: boolean) => <CI color={isActive ? 'white' : '#414651'} />,
    },
    {
        title: 'Quà lưu niệm',
        image: (isActive: boolean) => <QLN color={isActive ? 'white' : '#414651'} />,
    },
    {
        title: 'Bảo tàng',
        image: (isActive: boolean) => <BT color={isActive ? 'white' : '#414651'} />,
    },
    {
        title: 'Làng nghề',
        image: (isActive: boolean) => <LN color={isActive ? 'white' : '#414651'} />,
    },
];

type TabKey = {
    title: string;
    image: (isActive: boolean) => any;
};


export default function FavoriteDetail() {
    const { id } = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [likedItems, setLikedItems] = useState<string[]>([]);
    const {lists} = useFavoriteStore()

    const router = useRouter();

    const activities = ACTIVITIES_DATA[activeTab] || [];

    const handleLike = (id: string) => {
        setLikedItems((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    };
    const name = lists.find((list) => list.id === id)?.name || 'Danh sách yêu thích';
    const listItems = lists.find((list) => list.id === id)?.items[activeTab] || [];

    const isLiked = (id: string) => likedItems.includes(id);

    return (
        <View className="flex-1 bg-white px-4 pt-20">
            <View className="flex-row items-center justify-between mb-8">
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={ArrLeft} className="h-6 w-6" />
                </TouchableOpacity>
                <Text className="text-xl font-semibold">{name}</Text>
                <View className="w-6 h-6" />
            </View>
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4 "
                            contentContainerStyle={{ gap: 12, paddingHorizontal: 4 }}>
                    {CATEGORY_TABS.map((tab) => {
                        const isActive = activeTab === tab.title;
                        return (
                            <Pressable
                                key={tab.title}
                                onPress={() => setActiveTab(tab.title)}
                                className={`px-4 py-2 rounded-full flex-row justify-center items-center gap-2 ${isActive ? 'bg-[#F99F04]' : 'bg-white'}`}
                            >
                                {tab.image(isActive)}
                                <Text className={isActive ? 'text-white font-semibold' : 'text-black'}>{tab.title}</Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>

            </View>

            {/* Tabs */}

            {/* Items */}
            <ScrollView>
                <View className="space-y-4 pb-20 gap-4">
                    {listItems.map((item) => (
                        <View
                            key={item.id}
                            className="flex-col bg-white rounded-xl shadow p-2 gap-2"
                        >
                            <View className="relative">
                                <Image
                                    source={item.image}
                                    className="w-full h-[179px] rounded-xl"
                                    resizeMode="cover"
                                />

                                <TouchableOpacity
                                    className="absolute top-2 right-2 bg-white/70 p-2 rounded-full"
                                    onPress={() => handleLike(item.id)}
                                >
                                    <Ionicons
                                        name={isLiked(item.id) ? 'heart' : 'heart-outline'}
                                        size={20}
                                        color={isLiked(item.id) ? '#F99F04' : '#8B3A00'}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View className="flex-1 justify-between gap-2">
                                <Text className="text-lg font-bold text-gray-900 font-beVN">
                                    {item.name}
                                </Text>
                                <Text className="text-gray-500 text-sm font-beVN">
                                    ⭐ {item.rating} ({item.reviewCount} đánh giá)
                                </Text>
                                <View className="flex-row justify-between">
                                    <Text className="text-[#F99F04] text-base font-semibold font-beVN">
                                        Từ {Math.floor(Math.random() * 500 + 300)}.000đ
                                    </Text>
                                    <Text className="text-sm text-gray-400 font-beVN">
                                        Giờ mở cửa: {item.openTime}
                                    </Text>
                                </View>

                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

