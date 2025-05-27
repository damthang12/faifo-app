import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import {useFavoriteStore} from "@/store/useFavoriteStore";
import FavoriteModal from "@/components/modal/FavoriteModal";
import ArrLeft from "@/assets/images/arrow-left.png";

export default function FavoritesScreen() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const {lists} = useFavoriteStore()
    const handleBack = () => {
        setTimeout(() => {
            router.back();
        }, 300);
    };

    return (
        <View className="flex-1 bg-white px-4 pt-20">
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity onPress={handleBack}>
                    <Image source={ArrLeft} className="h-6 w-6" />
                </TouchableOpacity>
                <Text className="text-xl font-semibold">Danh sách yêu thích</Text>
                <View className="w-6 h-6" />
            </View>

            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-gray-100 py-4 rounded-xl justify-center items-center mb-4 h-[191px]"
            >
                <Text className="text-black font-bold text-lg font-beVN">+ Thêm danh sách mới</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {lists.map((list) => (
                    <TouchableOpacity
                        key={list.id}
                        onPress={() => router.push(`/favorites/${list.id}`)}
                        className="border border-gray-300 rounded-xl px-4 py-3 mb-4 "
                    >
                        <Text className="text-lg font-bold text-gray-800 font-beVN">{list.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>


            <FavoriteModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
            />


        </View>
    );
}
