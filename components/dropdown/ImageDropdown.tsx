import {useEffect, useRef, useState} from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageSourcePropType,
    LayoutAnimation,
    Platform,
    Text,
    TouchableOpacity,
    UIManager,
    View,
    NativeSyntheticEvent,
    LayoutChangeEvent,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GAP = 8;
const isTablet = SCREEN_WIDTH >= 768;

export default function ImageGalleryDropdown({
                                                 images,
                                                 id,
                                             }: {
    images: ImageSourcePropType[];
    id: string;
}) {
    const [expanded, setExpanded] = useState(true);
    const [showAllImages, setShowAllImages] = useState(false);
    const [containerWidth, setContainerWidth] = useState<number>(SCREEN_WIDTH); // <-- đo theo container
    const animation = useRef(new Animated.Value(1)).current;
    const router = useRouter();
    
    const topImages = images.slice(0, 2);
    const bottomImages = showAllImages ? images.slice(2) : images.slice(2, 5);
    const hiddenCount = images.length - 5;
    
    // TÍNH THEO BỀ NGANG CONTAINER + GAP
    // 2 ảnh: 1 khoảng GAP ở giữa -> trừ 1*GAP rồi chia 2
    const imageWidthTop = (containerWidth - GAP) / 2;
    // 3 ảnh: 2 khoảng GAP ở giữa -> trừ 2*GAP rồi chia 3
    const imageWidthBottom = (containerWidth - GAP * 2) / 3;
    
    // CHIỀU CAO: Tablet = 260px, Mobile: giữ thấp hơn
    const IMAGE_HEIGHT = isTablet ? 260 : (SCREEN_WIDTH <= 375 ? 120 : 120);
    
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
    
    const onContainerLayout = (e: LayoutChangeEvent) => {
        setContainerWidth(e.nativeEvent.layout.width);
    };
    
    return (
      <View className="mt-4" onLayout={onContainerLayout}>
          {/* Header */}
          <TouchableOpacity onPress={handleToggle} className="flex-row justify-between items-center mb-3">
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
                            height: IMAGE_HEIGHT,           // <-- tablet luôn 260
                            borderRadius: 12,
                        }}
                        resizeMode="cover"
                      />
                    ))}
                </View>
                
                {/* Bottom 3 images */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: GAP }}>
                    {bottomImages.map((img, index) => {
                        const isLastPreview = !showAllImages && index === 2 && hiddenCount > 0;
                        return (
                          <TouchableOpacity
                            key={`bottom-${index}`}
                            onPress={() => isLastPreview && router.push(`/images/${id}`)}
                            style={{
                                width: imageWidthBottom,
                                height: IMAGE_HEIGHT,         // <-- tablet luôn 260
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
