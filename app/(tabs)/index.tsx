import {Dimensions, Image, Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import bgHeader from '@/assets/images/home/header-bg.png';
import vh from '@/assets/images/home/vh.png';
import lh from '@/assets/images/home/le-hoi.png';
import at from '@/assets/images/home/am-thuc.png';
import ci from '@/assets/images/home/check-in.png';
import qln from '@/assets/images/home/lưu-niệm.png';
import bt from '@/assets/images/home/bao-tang.png';
import ln from '@/assets/images/home/làng-nghề.png';
import {PlaceCard} from "@/components/PlaceCard";
import {useEffect, useState} from "react";
import FilterModal from "@/components/modal/FilterModal";
import {PLACES_SECTIONS} from "@/constants/MockData";
import {useRouter} from "expo-router";
import FT from "@/assets/Icon/FT";
import Search from "@/assets/Icon/Search";
import {useTranslation} from "react-i18next";



export default function HomeScreen() {
  const router = useRouter();
  const {t} = useTranslation()

  const insets = useSafeAreaInsets();
  const [isFilterVisible, setFilterVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth ;

  const [search, setSearch] = useState('');



  const TABS = [
    { id: 'tab-1', title: t('home.tab_1'), img: vh },
    { id: 'tab-2', title: t('home.tab_2'), img: lh },
    { id: 'tab-3', title: t('home.tab_3'), img: at },
    { id: 'tab-4', title: t('home.tab_4'), img: ci },
    { id: 'tab-5', title: t('home.tab_5'), img: qln },
    { id: 'tab-6', title: t('home.tab_6'), img: bt },
    { id: 'tab-7', title: t('home.tab_7'), img: ln },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = search.trim();
      if (trimmed) {
        router.push({
          pathname: '/(app)/search',
          params: { query: trimmed },
        });
      } else {
        router.replace('/(tabs)');
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);



  return (
      <View className="flex-1 bg-[#F99F04]">
        <View className="absolute top-0 left-0 w-full z-10 bg-[#F99F04] pb-4 h-[351px]" style={{ paddingTop: insets.top }}>
          <Image source={bgHeader} className="h-[351px] w-[340px] absolute z-0 right-0" />
          <View className="pt-10 px-4">
            <Text className="text-base font-beVN text-[#8B3A00] font-medium">{t('home.welcome')}</Text>
            <Text className="text-[40px] text-[#8B3A00] font-semibold uppercase font-phudu">{t('home.to')}</Text>
            <View className="flex-row items-center w-full gap-4 mt-4">
              {/* Search box */}
              <View className="flex-row bg-white rounded-3xl px-4 py-2 h-11 items-center gap-2 flex-1">
                <Search size={24} color="#717680" />
                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Tìm kiếm địa điểm..."
                    className="text-base flex-1"
                    placeholderTextColor="#888"
                />
              </View>

              {/* Filter button */}
              <Pressable
                  className="bg-white items-center justify-center w-11 h-11 rounded-full"
                  onPress={() => setFilterVisible(true)}
              >
                <FT size={24} color="#000" />
              </Pressable>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-10" contentContainerStyle={{ gap: 32 }}>
              {TABS.map((tab) => (
                  <Pressable
                      key={tab.id}
                      className="flex flex-col items-center justify-center gap-4 "
                        onPress={() => setSearch(tab.title)}
                  >
                    <Image source={tab.img} className="h-[53px] w-[48px] object-fill" />
                    <Text className="text-white font-bold text-base font-beVNBold">{tab.title}</Text>
                  </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>

        <View className="flex-1 mt-[351px] rounded-t-[32px] bg-white pl-4">
          <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="mt-10">
            {PLACES_SECTIONS.filter((section) => ["section-1", "section-2", "section-3", "section-4"].includes(section.id)).map((section) => (
                <View key={section.id} className=" mb-10">
                  <View className="flex-row items-center justify-between mb-5">
                    <Text className="text-2xl font-semibold text-[#351904] uppercase font-phudu">
                      {t(`home.section_titles.${section.id}`)}
                    </Text>
                    <Pressable
                        onPress={() => setSearch(section.title)}
                        className="flex-row items-center gap-1 pr-4">
                      <Text className="text-sm text-[#8B3A00] font-medium">{t('see_more')}</Text>
                      <Ionicons name="chevron-forward" size={16} color="#8B3A00" />
                    </Pressable>
                  </View>
                  <SwiperFlatList
                      showPagination={false}
                      data={section.items}
                      renderItem={({ item }) => (
                          <PlaceCard section={section.id} item={item} />
                      )}
                      keyExtractor={(item) => item.id}
                      snapToAlignment="start"
                      snapToInterval={280 + 14}
                      decelerationRate="fast"
                      horizontal
                  />
                </View>
            ))}
          </ScrollView>
        </View>

        <FilterModal isVisible={isFilterVisible} onClose={() => setFilterVisible(false)} />
      </View>
  );
}
