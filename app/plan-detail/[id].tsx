// app/(tabs)/plan-detail/[id].tsx
import {useLocalSearchParams, useRouter} from 'expo-router';
import React, {useRef, useState} from 'react';
import {Animated, Image, Modal, Pressable, ScrollView, Text, TouchableOpacity, View,} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {ACTIVITIES_DATA} from "@/constants/MockData";
import {BlurView} from "expo-blur";
import VH from "@/assets/Icon/VH";
import AT from "@/assets/Icon/AT";
import CI from "@/assets/Icon/CI";
import QLN from "@/assets/Icon/QLN";
import BT from "@/assets/Icon/BT";
import LN from "@/assets/Icon/LN";
import Invite from "@/components/ui/Invite";
import PlanningList from "@/components/ui/AddOnPlan";
import {AddToItineraryButton} from "@/components/ui/AddToItineraryButton";
import {useTripStore} from "@/store/useTripStore";
import UpdatePlanModal from "@/components/modal/UpdatePlanModal";
import Profile from "@/assets/Icon/Profile";
import CalendarIcon from "@/assets/Icon/Calendar";
import EditIcon from "@/assets/Icon/EditIcon";
import RemoveIcon from "@/assets/Icon/RemoveIcon";
import UpdateIcon from "@/assets/Icon/UpdateIcon";

const TABS = ['Lịch trình', 'Gợi ý hoạt động', 'Mời bạn bè'];

type TabKey = {
    title: string;
    image: (isActive: boolean) => any;
};

const CATEGORY_TABS: TabKey[] = [
    {
        title: 'Văn hoá',
        image: (isActive: boolean) => <VH color={isActive ? 'white' : '#414651'}/>,
    },
    {
        title: 'Ẩm thực',
        image: (isActive: boolean) => <AT color={isActive ? 'white' : '#414651'}/>,
    },
    {
        title: 'Checkin',
        image: (isActive: boolean) => <CI color={isActive ? 'white' : '#414651'}/>,
    },
    {
        title: 'Quà lưu niệm',
        image: (isActive: boolean) => <QLN color={isActive ? 'white' : '#414651'}/>,
    },
    {
        title: 'Bảo tàng',
        image: (isActive: boolean) => <BT color={isActive ? 'white' : '#414651'}/>,
    },
    {
        title: 'Làng nghề',
        image: (isActive: boolean) => <LN color={isActive ? 'white' : '#414651'}/>,
    },
];


export default function PlanDetailScreen() {
    const {id} = useLocalSearchParams();

    const router = useRouter();
    const {itinerary, removeItineraryItem} = useTripStore();

    const [activeTab, setActiveTab] = useState('Lịch trình');
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [isRemove, setRemove] = useState(false);
    const [updateVisible, setUpdateVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState<TabKey | ''>({
        title: 'Văn hoá',
        image: (isActive: boolean) => <VH color={isActive ? 'white' : '#414651'}/>,
    });
    const [search, setSearch] = useState('');
    const trip = itinerary.find(item => item.id === id);


    console.log(itinerary)
    const animation = useRef(new Animated.Value(0)).current;


    const handleSearch = (location: string) => {
        setSearch(location)
    }

    const updateTrip = () => {
        setSettingsVisible(false)
        setUpdateVisible(true)
    }

    const handleRemove = () => {
        removeItineraryItem(trip?.id as string)
        setRemove(false)
        setSettingsVisible(false)
        router.push('/(tabs)/plan')
    }

    const handleCf = () => {
        setRemove(true)
        setSettingsVisible(false)
    }


    return (

        <View className="flex-1 bg-[#F99F04]">
            <View className="absolute top-0 left-0 w-full z-10 bg-[#F99F04] pb-4 h-[400px]">
                <Image source={trip?.image} className="w-[430px] h-[400px] absolute z-0 right-0"/>

                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute top-12 left-4 bg-white/80 rounded-full p-2"
                >
                    <Ionicons name="arrow-back" size={24} color="#000"/>
                </TouchableOpacity>

                {/* Settings Button */}
                <TouchableOpacity
                    onPress={() => setSettingsVisible(true)}
                    className="absolute top-12 right-4 bg-white/80 rounded-full p-2"
                >
                    <Ionicons name="ellipsis-vertical" size={24} color="#000"/>
                </TouchableOpacity>

                {/* Trip Info Overlay */}
                <View className="absolute bottom-14 left-4 right-4 h-[166px] rounded-3xl overflow-hidden"
                      style={{
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 4},
                          shadowOpacity: 0.1,
                          shadowRadius: 10,
                          elevation: 5,
                      }}
                >
                    <BlurView
                        intensity={30}
                        tint="dark"
                        style={{
                            flex: 1,
                            padding: 16,
                            gap: 8
                        }}
                    >
                        <Text className="text-2xl font-semibold text-white font-beVNSemibold mb-4">
                            {trip?.place}
                        </Text>
                        <View className="flex-row gap-2 items-center">
                            <CalendarIcon size={24}/>
                            <Text className="text-white font-beVN ">
                                {trip?.startDate} - {trip?.endDate}
                            </Text>

                        </View>

                        <View className="flex-row gap-2 items-center">
                            <Profile size={24} color="#fff"/>
                            <Text className="text-white font-beVN">
                                {trip?.participants} người tham gia
                            </Text>

                        </View>

                        <View className="flex-row gap-2 items-center">
                            <EditIcon size={24}/>
                            <Text className="text-white font-beVN ">
                                _
                            </Text>

                        </View>


                    </BlurView>
                </View>
            </View>

            <View className="flex-1 mt-[366px] rounded-t-[32px] bg-white  z-50">


                {/* Tabs */}
                <View className="flex-row  mb-2 my-7 px-4 justify-between ">
                    {TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            className={` py-1 ${activeTab === tab ? ' border-b border-b-[#F99F04]' : ''}`}
                        >
                            <Text
                                className={`${activeTab === tab ? 'text-[#F99F04] ' : 'text-gray-600'} font-semibold text-[20px] font-beVNSemibold`}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {activeTab === 'Gợi ý hoạt động' && selectedTab && (
                    <View className="px-4 my-3 ">
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{gap: 12}}>
                            {CATEGORY_TABS.map((tab) => {
                                const isActive = selectedTab?.title === tab.title;
                                return (
                                    <Pressable
                                        key={tab.title}
                                        onPress={() => setSelectedTab(prev => (prev === tab ? '' : tab))}
                                        className={`px-4 py-2 rounded-full flex-row justify-center items-center gap-2 ${isActive ? 'bg-[#F99F04]' : 'bg-white'}`}
                                    >
                                        {tab.image(isActive)}
                                        <Text
                                            className={isActive ? 'text-white font-semibold font-beVNSemibold' : 'text-black'}>{tab.title}</Text>
                                    </Pressable>
                                );
                            })}
                        </ScrollView>
                    </View>

                )}

                {/*/!* Body content *!/*/}
                <View className=" h-full ">
                    {activeTab === 'Lịch trình' && (
                        <PlanningList/>
                    )}
                    {activeTab === 'Gợi ý hoạt động' && selectedTab && (

                        <View className=" flex-col  h-full w-full px-4">
                            <ScrollView
                                contentContainerStyle={{gap: 12, flexDirection: 'column', paddingBottom: 180}}
                                className="flex flex-col w-full  "
                            >
                                {ACTIVITIES_DATA[selectedTab.title]?.map((place) => (
                                    <View
                                        key={place.id}
                                        className="w-full h-[130px] bg-white border border-gray-300 rounded-xl overflow-hidden flex-row"
                                    >
                                        <Image
                                            source={place.image}
                                            className="w-[130px] h-full"
                                            resizeMode="cover"
                                        />
                                        <View className="p-4 flex gap-2">
                                            <Text
                                                className="text-base font-semibold font-beVNSemibold">{place.name}</Text>
                                            <Text className="text-base font-medium text-gray-600">Thời gian dự kiến: 1.5
                                                - 2 giờ</Text>
                                            <AddToItineraryButton className="p-3" place={place}
                                                                  tripId={trip?.id || ''}/>

                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                    {activeTab === 'Mời bạn bè' && (
                        <Invite
                            currentMembers={[
                                {
                                    name: 'Thanh Thương',
                                    email: 'thanhthuong1599@gmail.com'
                                }
                            ]}
                            onInvite={(email) => {
                                // Handle invitation logic here
                                console.log('Inviting:', email);
                            }}
                        />
                    )}
                </View>


                <Modal visible={settingsVisible} transparent animationType="fade">
                    <Pressable
                        className="flex-1 bg-black/30 justify-end"
                        onPress={() => setSettingsVisible(false)}
                    >
                        <View className="bg-white flex-col items-center p-5 rounded-t-2xl pb-10">

                            <View className="h-[6px] w-[100px] bg-gray-300 rounded-2xl"/>
                            <View className="w-full flex flex-col ">
                                <Text className="text-left font-beVNBold text-2xl  text-gray-900 mb-4">Cài đặt</Text>
                                <TouchableOpacity
                                    onPress={updateTrip}
                                    className="flex-row items-center gap-2">
                                    <UpdateIcon size={24}/>

                                    <Text
                                        className=" p-4 text-base text-gray-700  font-beVN">
                                        Cập nhật thông tin chuyến đi
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleCf}
                                    className="flex-row items-center gap-2">
                                    <RemoveIcon size={24}/>
                                    <Text
                                        className=" text-base p-4 text-gray-700  font-beVN">
                                        Xoá kế hoạch du lịch</Text>
                                </TouchableOpacity>


                            </View>

                        </View>
                    </Pressable>
                </Modal>



                <Modal visible={isRemove} transparent animationType="fade">
                    <Pressable
                        className="flex-1 bg-black/30 justify-center p-4"
                        onPress={() => setRemove(false)}
                    >
                        <View className="bg-white flex-col items-center gap-5 p-5 rounded-2xl pb-10">
                            <Text className=" font-beVNBold text-2xl  text-gray-900 mb-4">Xoá kế hoạch du lịch này</Text>
                            <Text className=" font-beVN  text-center text-gray-900 mb-4">Bạn có chắc chắn muốn xóa kế hoạch du lịch này không? Sau khi xóa, thông tin sẽ không thể khôi phục.</Text>

                            <View className=" flex flex-row w-full justify-between ">
                                <TouchableOpacity
                                    onPress={() => setRemove(false)}
                                    className=" w-[47%]   px-4 py-3 rounded-full items-center border border-[#F99F04]">
                                    <Text className="text-[#F99F04] text-xl font-semibold font-beVNSemibold">Huỷ</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleRemove}
                                    className=" w-[47%]  bg-[#F99F04] px-4 py-3  rounded-full items-center">
                                    <Text className="text-white text-xl font-semibold font-beVNSemibold">Xoá</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </Pressable>
                </Modal>


                {/* Modal tạo kế hoạch */}
                <UpdatePlanModal tripId={trip?.id} isVisible={updateVisible} onClose={() => setUpdateVisible(false)}/>
            </View>
        </View>

    );
}
