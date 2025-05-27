import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import ArrLeft from "@/assets/images/arrow-left.png";
import {useTranslation} from "react-i18next";

export default function HistoryScreen() {
    const router = useRouter();
    const {t} = useTranslation()

    const handleBack = () => {
        setTimeout(() => {
            router.back();
        }, 300);
    };

    return (
        <View className="flex-1 bg-white px-4 pt-20 h-full">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity onPress={handleBack}>
                    <Image source={ArrLeft} className="h-6 w-6" />
                </TouchableOpacity>
                <Text className="text-xl font-semibold">{t('history')}</Text>
                <View className="w-6 h-6" />
            </View>
            <ScrollView  contentContainerStyle={{height: '100%'}}>
                <View className="flex-col items-center justify-center h-full ">
                    <Text>Faifan chưa ghi nhận hoạt động nào</Text>
                </View>
            </ScrollView>
        </View>
    );
}
