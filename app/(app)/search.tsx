import {Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import bgHeader from '@/assets/images/search-header-bg.png';
import bgHeader from '@/assets/images/bg-search.png';
import {useEffect, useMemo, useState} from "react";
import FilterModal from "@/components/modal/FilterModal";
import {PLACES_SECTIONS} from "@/constants/MockData";
import ArrLeft from "@/assets/images/arrow-left.png";
import {useLocalSearchParams, useRouter} from "expo-router";


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
                        <View className="flex-1 bg-white rounded-3xl flex-row items-center px-4 h-12">
                            <TouchableOpacity onPress={handleBack}>
                                <Image source={ArrLeft} className="h-5 w-5" />
                            </TouchableOpacity>
                            <TextInput
                                placeholder="Tìm kiếm địa điểm..."
                                className=" w-full ml-3"
                                value={search}
                                onChangeText={handleSearch}
                            />
                        </View>

                        <Pressable
                            className="bg-white items-center justify-center w-11 h-11 rounded-full"
                            onPress={() => setFilterVisible(true)}
                        >
                            <Ionicons name="filter" size={24} color="#000" />
                        </Pressable>
                    </View>
            </View>

            <View className="flex-1 mt-[160px] rounded-t-[32px] bg-white px-4">
                <View className="my-7">
                    <Text className='text-[#8B3A00] text-xl font-semibold uppercase'>
                        {items} Kết quả
                    </Text>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom: 80}} className="">
                    {datas.map((section) => (
                        <View key={section.id} className="flex flex-col gap-4">
                            {section.items.map((item) => (
                                <Pressable key={item.id}
                                           onPress={() => router.push(`/places/${item.id}`)}
                                      className="w-full h-[200px] rounded-2xl bg-gray-100 flex-row gap-4 items-center mb-4">
                                    <Image
                                        source={item.image}
                                        className="w-full max-w-[164px] h-full rounded-l-2xl"
                                        resizeMode="cover"
                                    />
                                    <View className="flex-1 flex-col gap-3">
                                        <Text className="font-semibold text-base text-[#351904]">

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
                                            <Text className="text-xs text-gray-500 ml-1">({item.reviewCount} đánh
                                                giá)</Text>
                                        </View>

                                        <View className="flex-row items-center gap-2">
                                            <Ionicons
                                                name="time"
                                                size={20}
                                                color="#252B37"
                                            />
                                            <Text className="text-sm text-gray-500">Giờ mở cửa: {item.openTime}</Text>
                                        </View>
                                        <View className="flex-row items-center gap-2">
                                            <Ionicons
                                                name="logo-usd"
                                                size={20}
                                                color="#252B37"
                                            />
                                            <Text className="text-base text-[#D97706] font-semibold">{item.price}</Text>
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
