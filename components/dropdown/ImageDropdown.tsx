import { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageSourcePropType,
    Animated,
    LayoutAnimation,
    Platform,
    UIManager,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useRouter} from "expo-router";

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GAP = 8;

export default function ImageGalleryDropdown({ images, id }: { images: ImageSourcePropType[], id: string }) {
    const [expanded, setExpanded] = useState(true);
    const [showAllImages, setShowAllImages] = useState(false);
    const animation = useRef(new Animated.Value(1)).current;
    const router = useRouter();

    const topImages = images.slice(0, 2);
    const bottomImages = showAllImages ? images.slice(2) : images.slice(2, 5);
    const hiddenCount = images.length - 5;

    const imageWidthTop = (SCREEN_WIDTH - GAP * 5) / 2; // 2 ảnh top
    const imageWidthBottom = (SCREEN_WIDTH - GAP * 6) / 3; // 3 ảnh bottom

    console.log(images.length)

    useEffect(() => {
        Animated.timing(animation, {
            toValue: expanded ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [expanded]);

    const handleToggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
        if (expanded) setShowAllImages(false);
    };

    return (
        <View className="mt-4 ">
            {/* Header */}
            <TouchableOpacity
                onPress={handleToggle}
                className="flex-row justify-between items-center mb-3"
            >
                <Text className="text-xl font-semibold text-[#8B3A00] font-beVNSemibold">Ảnh từ điểm đến</Text>
                <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={24} color="#351904" />
            </TouchableOpacity>

            {/* Expandable Section with animation */}
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
                    {/* Top 2 big images */}
                    <View style={{ flexDirection: 'row', gap: GAP, marginBottom: GAP }}>
                        {topImages.map((img, index) => (
                            <Image
                                key={`top-${index}`}
                                source={img}
                                style={{
                                    width: imageWidthTop,
                                    height: 131,
                                    borderRadius: 12,
                                }}
                                resizeMode="cover"
                            />
                        ))}
                    </View>

                    {/* Bottom 3 images */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: GAP, justifyContent: 'space-between' }}>
                        {bottomImages.map((img, index) => {
                            const isLastPreview = !showAllImages && index === 2 && hiddenCount > 0;
                            return (
                                <TouchableOpacity
                                    key={`bottom-${index}`}
                                    onPress={() => isLastPreview && router.push(`/images/${id}`)}
                                    style={{
                                        width: imageWidthBottom,
                                        height: 120,
                                        borderRadius: 12,
                                        overflow: 'hidden',
                                        position: 'relative',
                                    }}
                                >
                                    <Image source={img} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                                    {isLastPreview && (
                                        <View className="absolute inset-0 bg-black/40 items-center justify-center">
                                            <Text className="text-white font-bold text-sm">+{hiddenCount}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Collapse */}
                    {showAllImages && (
                        <TouchableOpacity
                            onPress={() => setShowAllImages(false)}
                            className="mt-3 self-center px-4 py-2 bg-gray-200 rounded-full"
                        >
                            <Text className="text-sm font-medium text-gray-700">Thu gọn</Text>
                        </TouchableOpacity>
                    )}
                </Animated.View>
            )}
        </View>
    );
}
