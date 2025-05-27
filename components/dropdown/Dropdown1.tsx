import { useRef, useState } from 'react';
import {
    Animated,
    Easing,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    title: string;
    lines: string[];
    isChatBot?: boolean;
};

export default function ExpandableSection1({ title, lines, isChatBot }: Props) {
    const [expanded, setExpanded] = useState(true);
    const animation = useRef(new Animated.Value(1)).current;

    const maxHeight = lines.length * 100 + 20; // tùy chỉnh cao 1 dòng + padding

    const toggle = () => {
        Animated.timing(animation, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start(() => setExpanded(!expanded));
    };

    const containerHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, maxHeight],
    });

    const opacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    return (
        <View className="mb-3">
            <TouchableOpacity
                onPress={toggle}
                className="flex-row justify-between items-center py-3 "
            >
                <Text className="text-xl font-beVN font-semibold text-[#8B3A00]">{title}</Text>
                <Ionicons
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color="#351904"
                />
            </TouchableOpacity>

            <Animated.View
                style={{
                    maxHeight: containerHeight,
                    opacity,
                    overflow: 'hidden',
                }}
            >
                <View className=" flex flex-col gap-2 space-y-1">
                    {lines.map((line, index) => (
                        <View key={index} className="flex-row gap-1 text-gray-800">
                            <Text>
                                •
                            </Text>
                            <Text className="px-2 font-beVN font-medium">
                                {line}
                            </Text>

                        </View>
                    ))}
                </View>
                {isChatBot && (
                    <TouchableOpacity className="mt-4 bg-[#FFF1CB] p-5 rounded-full items-center">
                        <Text className="text-[#8B3A00] font-semibold font-beVN">Thêm chuyện với Faifan</Text>
                    </TouchableOpacity>
                )}
            </Animated.View>


        </View>
    );
}
