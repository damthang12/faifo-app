import {Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import bgHeader from '@/assets/images/search-header-bg.png';
import bgHeader from '@/assets/images/bg-search.png';
import {useEffect, useMemo, useState} from "react";
import FilterModal from "@/components/modal/FilterModal";
import {PLACES_SECTIONS} from "@/constants/MockData";
import {useLocalSearchParams, useRouter} from "expo-router";
import Search from "@/assets/Icon/Search";
import ArrowLeftIcon from "@/assets/Icon/ArrowLeft";
import FT from "@/assets/Icon/FT";
import ClockIcon from "@/assets/Icon/Clock";
import DollarIcon from "@/assets/Icon/Dollar";


export default function SearchScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [isFilterVisible, setFilterVisible] = useState(false);
    const {query} = useLocalSearchParams();

    const [search, setSearch] = useState(query as string);
    const [items, setItems] = useState(0);
    const [filteredSections, setFilteredSections] = useState(PLACES_SECTIONS);

    const handleBack = () => {
        setTimeout(() => {
            router.push({
                pathname: '/(tabs)',
                params: {query: ''},
            });
        }, 300);
    };

    const handleSearch = (text: string) => {
        setSearch(text);
    };

    useEffect(() => {

        if (!search) {
            setFilteredSections(PLACES_SECTIONS);
            // Tính tổng số item gốc
            const total = PLACES_SECTIONS.reduce((acc, section) => acc + section.items.length, 0);
            setItems(total);
            return;
        }

        const newSections = PLACES_SECTIONS.map((section) => {
            const isSectionMatched = section.title.toLowerCase().includes(search.toLowerCase());

            const filteredItems = section.items.filter((item) =>
                item.place.toLowerCase().includes(search.toLowerCase())
            );

            if (isSectionMatched || filteredItems.length > 0) {
                return {
                    ...section,
                    items: isSectionMatched ? section.items : filteredItems,
                };
            }

            return null;
        }).filter(Boolean) as typeof PLACES_SECTIONS;

        // Tính tổng số item sau lọc
        const totalFiltered = newSections.reduce((acc, section) => acc + section.items.length, 0);
        setFilteredSections(newSections);
        setItems(totalFiltered);

    }, [search])


    const datas = useMemo(() => {
        if (!search) {
            return PLACES_SECTIONS;
        }
        return filteredSections

    }, [search, filteredSections]);


    return (
        <View className="flex-1 bg-[#F99F04]">
            <View className="absolute top-0 left-0 w-full z-10 bg-[#F99F04] pb-4 " style={{paddingTop: insets.top}}>
                <Image source={bgHeader} className="h-[189px] w-[220px] absolute z-0 right-0"/>
                    <View className="flex-row items-center space-x-3 mt-4 gap-4 px-4">
                        <View className="flex-1 gap-4 rounded-3xl flex-row items-center  h-12">
                            <TouchableOpacity onPress={handleBack}>
                                <ArrowLeftIcon size={24}/>
                            </TouchableOpacity>

                            <View className="flex-1 bg-white rounded-3xl flex-row items-center px-4 h-12">
                                <Search size={24} color="#717680" />
                                <TextInput
                                    placeholder="Tìm kiếm địa điểm..."
                                    className=" w-full ml-3"
                                    value={search}
                                    onChangeText={handleSearch}
                                />
                            </View>
                        </View>


                        <Pressable
                            className="bg-white items-center justify-center w-11 h-11 rounded-full"
                            onPress={() => setFilterVisible(true)}
                        >
                            <FT size={24}/>
                        </Pressable>
                    </View>
            </View>

            <View className="flex-1 mt-[160px] rounded-t-[32px] bg-white px-4">
                <View className="my-7">
                    <Text className='text-[#8B3A00] text-xl font-phudu font-semibold uppercase'>
                        {items} Kết quả
                    </Text>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom: 80}} className="">
                    {datas.map((section) => (
                        <View key={section.id} className="flex flex-col gap-4">
                            {section.items.map((item) => (
                                <Pressable key={item.id}
                                           onPress={() => router.push(`/places/${item.id}`)}
                                      className="w-full h-[200px] rounded-2xl items-start bg-gray-100 flex-row gap-4 mb-4">
                                    <Image
                                        source={item.image}
                                        className="w-full max-w-[164px] h-full rounded-l-2xl"
                                        resizeMode="cover"
                                    />
                                    <View className="flex-1 flex-col gap-3 py-5">
                                        <Text className="font-semibold text-base text-gray-900 font-beVNSemibold">

                                        {item.place}
                                        </Text>

                                        <View className="flex-row items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Ionicons
                                                    key={i}
                                                    name="star"
                                                    size={11}
                                                    color={i < item.rating ? '#FBBF24' : '#E5E7EB'}
                                                />
                                            ))}
                                            <Text className="text-xs text-gray-800 ml-1 font-beVN">({item.reviewCount} đánh
                                                giá)</Text>
                                        </View>

                                        <View className="flex-row items-center gap-2">
                                            <ClockIcon
                                                size={20}
                                                color="#252B37"
                                            />
                                            <Text className="text-sm text-gray-500 font-beVN">Giờ mở cửa: {item.openTime}</Text>
                                        </View>
                                        <View className="flex-row items-center gap-2">
                                            <DollarIcon
                                                size={20}
                                                color="#252B37"
                                            />
                                            <Text className="text-base text-[#351904] font-semibold font-beVNSemibold">{item.price}</Text>
                                        </View>

                                    </View>
                                </Pressable>


                            ))}
                        </View>
                    ))}
                </ScrollView>
            </View>

            <FilterModal isVisible={isFilterVisible} onClose={() => setFilterVisible(false)}/>
        </View>
    );
}
