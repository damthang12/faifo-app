import {Image, ImageSourcePropType, Pressable, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from "expo-router";

export interface PropTypes {
    section: string
    item: {
        id: string;
        place: string;
        rating: number;
        reviewCount: number;
        price: string;
        openTime: string;
        image: ImageSourcePropType;
    };
}

export function PlaceCard({item, section}: PropTypes) {
    // const [liked, setLiked] = useState(false);
    const router = useRouter();
    // const {lists , addItemToList} = useFavoriteStore();
    //
    // const listName = lists.find(list => list.id === item.id)?.name || 'Favorites';
    //   const handleLike = () => {
    //       setLiked(!liked);
    //       if (!liked) {
    //       addItemToList(listName, {
    //           id: item.id,
    //           name: item.place,
    //           rating: item.rating,
    //           reviewCount: item.reviewCount,
    //           openTime: item.openTime,
    //           image: item.image,
    //           category: 'N/A',
    //       });
    //       }
    //   };


    return (
        <Pressable
            onPress={() => router.push(`/places/${item.id}`)}
            className="mr-4  overflow-hidden w-[280px] h-[272px]">
            <View className="relative">
                <Image
                    source={item.image}
                    className="w-full h-[179px] rounded-2xl"
                    resizeMode="cover"
                />
                {/*<Pressable*/}
                {/*    onPress={() => setLiked(!liked)}*/}
                {/*    className="absolute top-2 right-2 bg-white/70 p-1.5 rounded-full"*/}
                {/*>*/}
                {/*  <Ionicons*/}
                {/*      name={liked ? 'heart' : 'heart-outline'}*/}
                {/*      size={20}*/}
                {/*      color={liked ? '#EF4444' : '#6B7280'}*/}
                {/*  />*/}
                {/*</Pressable>*/}
            </View>

            <View className="py-3 space-y-1 flex flex-col gap-3">
                <Text className="font-semibold font-beVNSemibold text-base text-[#351904]">{item.place}</Text>

                {section !== 'section-3' && (
                    <>
                        <View className="flex-row items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Ionicons
                                    key={i}
                                    name="star"
                                    size={11}
                                    color={i < item.rating ? '#FBBF24' : '#E5E7EB'}/>
                            ))}
                            <Text className="text-sm text-gray-800 ml-1">({item.reviewCount} đánh giá)</Text>
                        </View><View className="flex-row items-center w-full justify-between">
                        <Text className="text-sm text-gray-800 font-beVN">{item.price}</Text>
                        <Text className="text-sm text-gray-800 font-beVN">Giờ mở cửa: {item.openTime}</Text>
                    </View>
                    </>

                )}

            </View>
        </Pressable>
    );
}
