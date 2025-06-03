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
};

export default function ExpandableSection2({ title, lines }: Props) {
    const [expanded, setExpanded] = useState(true);
    const animation = useRef(new Animated.Value(1)).current;

    const maxHeight = lines.length * 100 + 20;
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
        <View className="mb-3  ">
            <TouchableOpacity
                onPress={toggle}
                className="flex-row justify-between items-center py-3 "
            >
                <Text className="text-xl font-semibold text-[#8B3A00] font-beVNSemibold">{title}</Text>
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
                        <View key={index} className="text-gray-800">
                            <Text className="px-2 font-beVN">
                                {line}
                            </Text>

                        </View>
                    ))}
                </View>
            </Animated.View>
        </View>
    );
}
