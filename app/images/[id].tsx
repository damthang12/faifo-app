import React, { useRef, useState } from 'react';
import {
    FlatList,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Pressable
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Item, PLACES_SECTIONS } from '@/constants/MockData';
import ArrowLeftIcon from '@/assets/Icon/ArrowLeft';

const screenWidth = Dimensions.get('window').width;

export default function ImagesScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const place = PLACES_SECTIONS.flatMap(section => section.items).find(item => item.id === id) as Item | undefined;

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<'partner' | 'user'>('partner');

    const flatListRef = useRef<FlatList<any>>(null);

    const images = place?.images?.[activeTab] ?? [];
    const numColumns = 2;
    const spacing = 16;
    const totalSpacing = spacing * (numColumns + 1);
    const itemWidth = (screenWidth - totalSpacing) / numColumns;
    const itemHeight = screenWidth > 768 ? 345 : 182;

    if (!place) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-lg font-semibold text-red-500">Không tìm thấy địa điểm</Text>
            </View>
        );
    }

    const openImageModal = (index: number) => {
        setSelectedIndex(index);
        setModalVisible(true);
        setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index, animated: false });
        }, 50);
    };

    return (
        <View className="bg-white px-4 pt-20 h-full">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeftIcon size={24} color="#000" />
                </TouchableOpacity>
                <Text className="text-xl font-semibold font-beVNSemibold text-gray-900">Ảnh từ điểm đến</Text>
                <View className="w-6 h-6" />
            </View>

            {/* Tabs */}
            <View className="flex-row mb-6 w-full justify-between  gap-2">
                <TouchableOpacity
                    onPress={() => setActiveTab('partner')}
                    className={` py-2 w-1/2 flex items-center ${activeTab === 'partner' ? ' border-b-[#F99F04]  border-b' : ''}`}
                >
                    <Text className={`text-xl font-beVNSemibold ${activeTab === 'partner' ? 'text-[#F99F04]' : 'text-gray-600'}`}>Ảnh từ đối tác</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('user')}
                    className={` py-2 w-1/2 flex items-center ${activeTab === 'user' ? ' border-b-[#F99F04] border-b' : ''}`}
                >
                    <Text className={`text-xl  font-beVNSemibold ${activeTab === 'user' ? 'text-[#F99F04]' : 'text-gray-600'}`}>Ảnh từ khách du lịch</Text>
                </TouchableOpacity>
            </View>

            {/* Grid view */}
            <FlatList
                data={images}
                keyExtractor={(_, index) => index.toString()}
                numColumns={numColumns}
                columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: spacing }}
                contentContainerStyle={{ paddingBottom: 100 }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => openImageModal(index)}>
                        <View style={{ width: itemWidth, height: itemHeight, borderRadius: 12, overflow: 'hidden' }}>
                            <Image source={item} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Fullscreen modal */}
            <Modal visible={modalVisible} transparent animationType="fade">
                <View className="flex-1 bg-white pt-20 ">
                    <View className="px-4 flex-row items-center justify-between mb-4">
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <ArrowLeftIcon size={24} color="#000" />
                        </TouchableOpacity>
                        <Text className="text-xl font-semibold font-beVNSemibold">
                            {`${selectedIndex + 1} / ${images.length}`}
                        </Text>
                        <View className="w-6 h-6" />
                    </View>

                    <FlatList
                        ref={flatListRef}
                        data={images}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        initialScrollIndex={selectedIndex}
                        keyExtractor={(_, index) => index.toString()}
                        getItemLayout={(_, index) => ({
                            length: screenWidth,
                            offset: screenWidth * index,
                            index,
                        })}
                        onMomentumScrollEnd={(e) => {
                            const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
                            setSelectedIndex(index);
                        }}
                        renderItem={({ item }) => (
                            <View style={{ width: screenWidth, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={item} resizeMode="contain" style={{ width: screenWidth, height: '100%' }} />
                            </View>
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
}
