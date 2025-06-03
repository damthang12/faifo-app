import {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import CreatePlanModal from '@/components/modal/CreatePlanModal';
import logoStep from '@/assets/images/MascotKH.png';
import {useLocalSearchParams, useRouter} from "expo-router";
import {TRIPS} from "@/constants/MockData";
import {useTripStore} from "@/store/useTripStore";


export default function PlanScreen() {
    const {id} = useLocalSearchParams(); // Lấy id từ route param
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'planned' | 'completed'>('planned');
    const [showModal, setShowModal] = useState(false);
    const {itinerary} = useTripStore();


    return (
        <View className="flex-1 bg-white px-4 pt-20">
            {/* Back button */}
            {/*<TouchableOpacity className="mb-4">*/}
            {/*    <Image source={ArrLeft} className="h-6 w-6" />*/}
            {/*</TouchableOpacity>*/}

            <Text className="text-[#351904] text-[40px] font-semibold uppercase font-phudu mb-10">kế hoạch</Text>


            {/* Tabs */}
            <View className="flex-row mb-6">
                {['planned', 'completed'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab as 'planned' | 'completed')}
                        className={`flex-1  ${activeTab === tab ? 'border-b border-b-[#F99F04]' : ''}`}
                    >
                        <Text
                            className={`text-center text-[19px] p-1 font-beVNSemibold font-semibold ${activeTab === tab ? 'text-[#F99F04]' : 'text-gray-600'}`}>
                            {tab === 'planned' ? 'Đang lên kế hoạch' : 'Đã hoàn thành'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
                        className="flex-1  ">
                {activeTab === 'planned' ? (
                    itinerary.length === 0 ? (
                        <View className="items-center">
                            <Image source={logoStep} className="h-[290px] w-full mb-6 mt-20" resizeMode="contain"/>
                            <Text className="text-xl font-semibold text-black font-beVNSemibold mb-2">
                                Bạn chưa có kế hoạch nào.
                            </Text>
                            <Text className="text-base font-bold font-beVN text-center mb-6">
                                Thử tạo một kế hoạch du lịch hoàn hảo với sự hỗ trợ từ Faifan nhé.
                            </Text>
                            <TouchableOpacity
                                onPress={() => setShowModal(true)}
                                className="bg-[#F99F04] p-5 rounded-full"
                            >
                                <Text className="text-white font-bold font-beVNSemibold text-xl">Tạo chuyến đi mới</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        itinerary.map((trip) => (

                            <TouchableOpacity key={trip.id}
                                              onPress={() => router.push(`/plan-detail/${trip.id}`)}
                            >
                                <Image source={trip.image ? trip.image : logoStep}
                                       className="w-full h-[200px] rounded-xl mb-4"/>
                                <Text className="text-xl font-bold">{trip.place}</Text>
                                <Text className="text-gray-500">
                                    {trip.startDate} - {trip.endDate}
                                </Text>
                            </TouchableOpacity>

                        ))

                    )
                ) : (
                    <View className="items-center flex-1 mt-6">
                        {activeTab === "completed" && TRIPS.length > 0 ? (
                            TRIPS.map((trip) => (
                                <TouchableOpacity
                                    key={trip.id}
                                    onPress={() => router.push(`/planed-detail/${trip.id}`)}
                                >
                                    <View className="w-full mb-6">
                                        <Image
                                            source={trip.image}
                                            className=" max-w-full h-[200px] rounded-2xl mb-4"
                                        />

                                        <Text className="text-xl font-bold mb-1">{trip.name}</Text>
                                        <Text className="text-gray-500">
                                            {trip.startDate} - {trip.endDate}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <>
                                <Image
                                    source={logoStep}
                                    className="h-[290px] w-full mb-6 mt-20"
                                    resizeMode="contain"
                                />
                                <Text className="text-lg font-bold mb-2">Chưa có kế hoạch nào hoàn thành</Text>
                                <Text className="text-center text-gray-500 mb-4">
                                    Hãy lên kế hoạch cho chuyến đi tiếp theo và để Faifan giúp bạn lên lịch trình hoàn
                                    hảo nhất!
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setShowModal(true)}
                                    className="bg-[#F99F04] px-6 py-3 rounded-full"
                                >
                                    <Text className="text-white font-bold font-beVNSemibold text-xl">Tạo chuyến đi mới</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                )}
            </ScrollView>

            {/* Modal tạo kế hoạch */}
            <CreatePlanModal isVisible={showModal} onClose={() => setShowModal(false)}/>
        </View>
    );
}
