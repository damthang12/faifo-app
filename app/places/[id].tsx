import {Image, ScrollView, Share, Text, TouchableOpacity, View} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Item, PLACES_SECTIONS} from "@/constants/MockData";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import DollarIcon from "@/assets/Icon/Dollar";
import ClockIcon from "@/assets/Icon/Clock";
import CheckInIcon from "@/assets/Icon/Checkin";
import ExpandableSection1 from "@/components/dropdown/Dropdown1";
import ExpandableSection2 from "@/components/dropdown/Dropdown2";
import {ItineraryDropdown} from "@/components/dropdown/PlanDrropdown";
import ImageDropdown from "@/components/dropdown/ImageDropdown";
import XT1 from '@/assets/images/detail/xem-them-1.png';
import XT2 from '@/assets/images/detail/xem-them-2.png';
import XT3 from '@/assets/images/detail/xem-them-3.png';
import XT4 from '@/assets/images/detail/xem-them-4.png';
import XT5 from '@/assets/images/detail/xem-them-5.png';
import ReviewDropdown from "@/components/dropdown/ReviewDropdown";
import FavoriteListModal from "@/components/modal/FavoriteListModal";
import WriteReviewModal from "@/components/modal/ReviewModal";


export default function PlaceDetailScreen() {
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const [liked, setLiked] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showFavoriteModal, setShowFavoriteModal] = useState(false);
    const place = PLACES_SECTIONS.flatMap(section => section.items).find(item => item.id === id) as Item;
    return (
        <ScrollView className=" z-0">
            <View className="flex-1">
                {/* Swiper for images */}
                <SwiperFlatList
                    data={place?.images}
                    showPagination
                    autoplay
                    autoplayDelay={5}
                    autoplayLoop
                    autoplayLoopKeepAnimation
                    index={0}
                    renderItem={({item}) => (
                        <Image source={item?.url} className="w-[430px] h-[332px] "/>
                    )}
                    keyExtractor={(item, index) => `${place.id}-img-${index}`}
                    paginationStyle={{
                        position: 'absolute',
                        bottom: 0,
                        alignSelf: 'center',
                    }}
                    paginationStyleItem={{
                        width: 32,
                        height: 4,
                        marginHorizontal: 4,
                        borderRadius: 4,
                        opacity: 0.8,
                    }}
                    paginationStyleItemActive={{
                        backgroundColor: '#fff',
                        opacity: 1,
                    }}
                />

                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute top-12 left-4 z-50 bg-white/80 p-2 rounded-full"
                >
                    <Ionicons name="arrow-back" size={20} color="#000"/>
                </TouchableOpacity>

                <View className="absolute top-12 right-4 z-50 flex-row space-x-3 gap-2">
                    <TouchableOpacity
                        onPress={() => setShowFavoriteModal(true)}
                        className="bg-white/80 p-2 rounded-full"
                    >
                        <View>
                            <Ionicons name={liked ? 'heart' : 'heart-outline'} size={20}
                                      color={liked ? 'red' : '#000'}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={async () => {
                            try {
                                await Share.share({
                                    message: `Khám phá địa điểm: ${place?.place}`,
                                });
                            } catch (error) {
                                console.log('Share error:', error);
                            }
                        }}
                        className="bg-white/80 p-2 rounded-full"
                    >
                        <Ionicons name="share-social-outline" size={20} color="#000"/>
                    </TouchableOpacity>
                </View>

            </View>

            <View className="p-4 flex-1 gap-2">
                <Text className="text-2xl font-semibold text-[#8B3A00] font-beVNSemibold my-5">{place?.place}</Text>
                <View className='flex-row  items-center gap-2'>
                    <DollarIcon size={24}/>
                    <Text className=" text-[#351904] font-semibold font-beVNSemibold">{place?.price || 0}</Text>
                </View>
                <View className='flex-row  items-center gap-2'>
                    <ClockIcon size={24}/>
                    <Text className=" text-gray-500 font-beVN">Giờ mở cửa: {place?.openTime}</Text>
                </View>
                <View className='flex-row  items-center justify-between gap-2'>
                    <View className='flex-row  items-center gap-2'>
                        <CheckInIcon size={24}/>
                        <Text className="text-sm text-gray-500 font-beVN">{place?.location}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push({ pathname: "/(app)/map", params: { query: place?.location } })}
                        className=""
                    >
                        <Text className="text-sm text-[#F99F04] underline">Xem bản đồ</Text>
                    </TouchableOpacity>

                </View>
                <View className="flex-row items-center gap-2 mb-4">
                    <View className="flex-row">
                        {[...Array(5)].map((_, index) => (
                            <Ionicons
                                key={index}
                                name={index < Math.round(4) ? 'star' : 'star-outline'}
                                size={16}
                                color="#FBBF24"
                                style={{marginRight: 2}}
                            />
                        ))}
                    </View>
                    <Text className="text-sm text-gray-800 font-beVN ">(1924 đánh giá)</Text>


                </View>


                <View className=" my-4 p-4 flex-1 gap-2 bg-[#FB9506] rounded-[20px]">
                    <Text className="text-xl font-beVN text-white font-semibold">Thông tin thú vị</Text>
                    <Text
                        className=" text-white font-semibold font-beVNSemibold">{place?.info || 'Thông tin đang được cập nhật'}</Text>
                </View>

                <View className="h-[1px] w-full bg-gray-300"/>

                <ExpandableSection2
                    title={place.overview?.title || 'Tổng quan'}
                    lines={place.overview?.description || []}
                />
                <View className="h-[1px] w-full bg-gray-300"/>

                <ExpandableSection1
                    title="Bao gồm"
                    lines={place.include?.description || []}
                />
                <View className="h-[1px] w-full bg-gray-300"/>

                <ExpandableSection2
                    title={place.include2?.title || 'Bao gồm'}
                    lines={place.include2?.description || []}
                />
                <View className="h-[1px] w-full bg-gray-300"/>

                <ItineraryDropdown />
                <View className="h-[1px] w-full bg-gray-300"/>
                <ExpandableSection1
                    title="Mẹo du lịch"
                    lines={place.travelTips?.description || []}
                />
                <View className="h-[1px] w-full bg-gray-300"/>
                <ImageDropdown
                    images={[
                        XT1,
                        XT2,
                        XT3,
                        XT4,
                        XT5,
                        XT5,
                    ]}
                />
                <View className="h-[1px] w-full bg-gray-300 my-4"/>
                <ReviewDropdown onOpen={() => setShowReviewModal(true)}/>
                <View className="h-[1px] w-full bg-gray-300 my-4"/>
                <ExpandableSection1
                    isChatBot={true}
                    title="Cần Giúp Đỡ?"
                    lines={place.needHelp || []}

                />

                <View className="flex flex-row mb-10 justify-between">
                    <TouchableOpacity className=" w-auto  p-5 rounded-full items-center border border-[#F99F04]">
                        <Text className="text-[#F99F04] text-xl font-semibold font-beVNSemibold">Thêm vào lịch trình</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push(`/booking/${place.id}`)}
                                      className=" w-[44%] bg-[#F99F04] p-5 rounded-full items-center">
                        <Text className="text-white text-xl font-semibold font-beVNSemibold">Đặt chỗ</Text>
                    </TouchableOpacity>
                </View>


            </View>


            <FavoriteListModal place={place} isVisible={showFavoriteModal} onClose={() => setShowFavoriteModal(false)}/>
            <WriteReviewModal isNoti={true} isVisible={showReviewModal} onClose={() => setShowReviewModal(false)}/>

        </ScrollView>
    );
}
