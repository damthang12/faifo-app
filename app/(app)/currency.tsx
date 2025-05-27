import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ArrLeft from '@/assets/images/arrow-left.png';

const currencies = [
    { name: 'Australian Dollar', symbol: 'AU$' },
    { name: 'Brazillian Real', symbol: 'R$' },
    { name: 'British Pound', symbol: '£' },
    { name: 'Canadian Dollar', symbol: 'CA$' },
    { name: 'Colombian Peso', symbol: 'COP' },
    { name: 'Chinese Yuan', symbol: '¥' },
    { name: 'Danish Krone', symbol: 'DKK' },
    { name: 'Euro', symbol: '€' },
    { name: 'Hong Kong Dollar', symbol: 'HK$' },
    { name: 'Indian Rupee', symbol: '₹' },
    { name: 'Japanese Yen', symbol: '¥' },
    { name: 'New Taiwan Dollar', symbol: 'NT$' },
    { name: 'Singapore Dollar', symbol: 'SGD' },
    { name: 'Vietnamese Dong', symbol: 'đ' },
];

export default function CurrencyScreen() {
    const router = useRouter();
    const [selectedCurrency, setSelectedCurrency] = useState('Vietnamese Dong');

    const handleSelect = (currencyName: string) => {
        setSelectedCurrency(currencyName);
        // TODO: Lưu vào store hoặc backend nếu cần
    };

    return (
        <View className="flex-1 bg-white px-4 pt-20">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={ArrLeft} className="h-6 w-6" />
                </TouchableOpacity>
                <Text className="text-xl font-semibold">Tiền tệ</Text>
                <View className="w-6 h-6" />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {currencies.map((currency, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleSelect(currency.name)}
                        className="flex-row justify-between items-center border-b border-gray-200 py-4"
                    >
                        <Text className="text-xl font-semibold font-beVN text-gray-800">
                            {currency.name} - {currency.symbol}
                        </Text>

                        {/* Custom radio circle */}
                        <View className={`w-5 h-5 border ${selectedCurrency === currency.name ? 'border-[#F99F04]' : 'border-gray-800'}  rounded-full items-center justify-center`}>
                            {selectedCurrency === currency.name && (
                                <View className="w-2.5 h-2.5 bg-[#F99F04] rounded-full" />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
