import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    LayoutAnimation,
    Platform,
    UIManager, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ParticipantDropdown({
                                                value,
                                                onChange,
                                            }: {
    value: number;
    onChange: (val: number) => void;
}) {
    const [open, setOpen] = useState(false);
    const options = [1, 2, 3, 4, 5, 6];

    const toggleDropdown = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpen(!open);
    };

    return (
        <View className="mb-4 relative z-10">
            <Text className="text-sm font-beVN mb-1">Số người tham gia</Text>

            {/* Selected */}
            <TouchableOpacity
                onPress={toggleDropdown}
                className="border p-3 rounded-xl bg-white flex-row justify-between items-center"
            >
                <Text className="text-base text-black">
                    {value ? `${value} người` : 'Chọn số người'}
                </Text>
                <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color="#000" />
            </TouchableOpacity>

            {/* Dropdown */}
            {open && (
                <Animated.View className="absolute z-50 w-full top-[74px] border rounded-xl bg-white shadow-md max-h-[150px]">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    onChange(option);
                                    setOpen(false);
                                }}
                                className="p-3 border-b border-gray-200 last:border-b-0"
                            >
                                <Text className="text-base text-black">
                                    {option === 6 ? 'Nhiều hơn 5' : `${option} người`}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Animated.View>
            )}
        </View>
    );
}
