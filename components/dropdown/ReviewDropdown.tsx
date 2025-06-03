import {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

// Enable layout animation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Review = {
    content: string;
    name: string;
    date: string;
    rating: number;
};

const REVIEWS: Review[] = [
    {
        content:
            'Mình đến Hội An lần đầu tiên và quyết định thử dịch vụ may đồ tại đây. Thực sự bất ngờ với thời gian may nhanh, chỉ mất một buổi sáng là tôi đã có bộ đồ ưng ý. Đặc biệt, họ rất chú ý đến chi tiết, may rất tinh xảo. Chắc chắn sẽ giới thiệu cho bạn bè.',
        name: 'Ronald Richards',
        date: '02/03/2025',
        rating: 5,
    },
    {
        content:
            'Tôi đến Hội An và muốn may một bộ đồ truyền thống ngay lập tức, thật không ngờ dịch vụ lại nhanh như vậy. Sau vài giờ, bộ đồ của tôi đã hoàn thành, rất vừa vặn và đẹp mắt. Dịch vụ rất thân thiện, ai cũng nhiệt tình giúp đỡ.',
        name: 'Brooklyn Simmons',
        date: '01/06/2025',
        rating: 4,
    },
];

interface Props {
    onOpen: () => void;
}

export default function ReviewDropdown({onOpen}: Props) {
    const [expanded, setExpanded] = useState(true);

    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };


    const averageRating =
        REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length;


    return (
        <View className="mt-4">
            <TouchableOpacity onPress={toggle} className="flex-row justify-between items-center mb-3">
                <Text className="text-xl font-semibold text-[#8B3A00] font-beVNSemibold">Đánh giá</Text>
                <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={24} color="#351904"/>
            </TouchableOpacity>

            {expanded && (
                <View>
                    {/* Tổng quan đánh giá */}
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-3xl font-bold text-[#8B3A00]">
                            {averageRating.toFixed(1)}
                        </Text>
                        <TouchableOpacity onPress={() => onOpen()}>
                            <Text className="text-sm text-gray-800 font-medium underline">
                                Viết đánh giá
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center gap-2 mb-4">
                        <View className="flex-row">
                            {[...Array(5)].map((_, index) => (
                                <Ionicons
                                    key={index}
                                    name={index < Math.round(averageRating) ? 'star' : 'star-outline'}
                                    size={16}
                                    color="#FBBF24"
                                    style={{marginRight: 2}}
                                />
                            ))}
                        </View>
                        <Text className="text-sm text-gray-800 font-beVN ">(1924 đánh giá)</Text>


                    </View>


                    <SwiperFlatList
                        paginationStyle={{bottom: -10}}
                        data={REVIEWS}
                        renderItem={({item}) => (
                            <View className="p-4 rounded-2xl mr-4 w-[374px] max-h-[263px] border border-gray-200">
                                <View className="flex-row items-center mb-4">
                                    {[...Array(5)].map((_, index) => (
                                        <Ionicons
                                            key={index}
                                            name={index < item.rating ? 'star' : 'star-outline'}
                                            size={14}
                                            color="#FBBF24"
                                            style={{marginRight: 2}}
                                        />
                                    ))}
                                </View>
                                <Text className="text-base text-gray-900 mb-4  font-beVN "> {item.content}</Text>

                                <View className="flex-row justify-between items-center">
                                    <Text
                                        className="text-sm font-semibold text-[#0A0D12] mt-1 font-BeVNSemiBold">{item.name}</Text>
                                    <Text className="text-xs text-gray-800 ">{item.date}</Text>

                                </View>

                            </View>
                        )}
                        keyExtractor={(_, i) => `review-${i}`}
                    />
                </View>
            )}
        </View>
    );
}
