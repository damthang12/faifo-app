import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import bgHeader from '@/assets/images/home/header-bg.png';
import vh from '@/assets/images/home/vh.png';
import lh from '@/assets/images/home/lễ-hội.png';
import at from '@/assets/images/home/ẩm-thực.png';
import ci from '@/assets/images/home/check-in.png';
import qln from '@/assets/images/home/lưu-niệm.png';
import bt from '@/assets/images/home/bảo-tàng.png';
import ln from '@/assets/images/home/làng-nghề.png';
import { PlaceCard } from "@/components/PlaceCard";


export const TABS = [
  { id: 'tab-1', title: 'Văn hoá', img: vh },
  { id: 'tab-2', title: 'Lễ hội', img: lh },
  { id: 'tab-3', title: 'Ẩm thực', img: at },
  { id: 'tab-4', title: 'Checkin', img: ci },
  { id: 'tab-5', title: 'Quà lưu niệm', img: qln },
  { id: 'tab-6', title: 'Bảo tàng', img: bt },
  { id: 'tab-7', title: 'Làng nghề', img: ln },
];

export const PLACES_SECTIONS = [
  {
    id: 'section-1',
    title: 'Điều nên làm ở Hội An',
    items: [
      {
        id: '1',
        title: 'May đồ lấy ngay',
        rating: 4.5,
        reviewCount: 1924,
        price: 'Từ 800.000đ',
        openTime: '09:00 - 19:00',
        image: 'https://picsum.photos/id/1015/400/300',
      },
      {
        id: '2',
        title: 'Dạo phố cổ ban đêm',
        rating: 4.8,
        reviewCount: 1582,
        price: 'Miễn phí',
        openTime: '18:00 - 22:00',
        image: 'https://picsum.photos/id/1018/400/300',
      },
    ],
  },
  {
    id: 'section-2',
    title: 'Dành cho bạn',
    items: [
      {
        id: '3',
        title: 'Thưởng thức Cao lầu',
        rating: 4.9,
        reviewCount: 2033,
        price: 'Từ 100.000đ',
        openTime: '08:00 - 21:00',
        image: 'https://picsum.photos/id/1020/400/300',
      },
      {
        id: '4',
        title: 'Check-in chùa Cầu',
        rating: 5.0,
        reviewCount: 3244,
        price: 'Từ 10.000đ',
        openTime: '07:00 - 18:00',
        image: 'https://picsum.photos/id/1025/400/300',
      },
    ],
  },
  {
    id: 'section-3',
    title: 'Mẹo vặt du lịch',
    items: [
      {
        id: '5',
        title: 'Đặt tour sớm tiết kiệm',
        rating: 4.7,
        reviewCount: 843,
        price: 'Từ 500.000đ',
        openTime: 'Cả ngày',
        image: 'https://picsum.photos/id/1035/400/300',
      },
      {
        id: '6',
        title: 'Lên lịch trình hợp lý',
        rating: 4.6,
        reviewCount: 1120,
        price: 'Miễn phí',
        openTime: 'Cả ngày',
        image: 'https://picsum.photos/id/1041/400/300',
      },
    ],
  },
  {
    id: 'section-4',
    title: 'Xu hướng',
    items: [
      {
        id: '7',
        title: 'Đặt tour sớm tiết kiệm',
        rating: 4.7,
        reviewCount: 843,
        price: 'Từ 500.000đ',
        openTime: 'Cả ngày',
        image: 'https://picsum.photos/id/1035/400/300',
      },
      {
        id: '8',
        title: 'Lên lịch trình hợp lý',
        rating: 4.6,
        reviewCount: 1120,
        price: 'Miễn phí',
        openTime: 'Cả ngày',
        image: 'https://picsum.photos/id/1041/400/300',
      },
    ],
  },
];




export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
      <View className="flex-1 bg-[#F99F04]">
        <View className="absolute top-0 left-0 w-full z-10 bg-[#F99F04] pb-4 h-[351px]" style={{ paddingTop: insets.top }}>
          <Image source={bgHeader} className="h-[351px] w-[340px] absolute z-0 right-0" />
          <View className="pt-10 px-4">
            <Text className="text-base font-beVN text-[#8B3A00] font-medium">Chào mừng đến với</Text>
            <Text className="text-[40px] text-[#8B3A00] font-semibold uppercase font-phudu">Hội An</Text>
            <View className="flex-row items-center space-x-3 mt-4 gap-4">
              <View className="flex-1 bg-white rounded-3xl px-4 py-2 h-11">
                <TextInput placeholder="Tìm kiếm địa điểm..." className="text-base" />
              </View>
              <Pressable className="bg-white flex items-center justify-center w-11 h-11 rounded-full">
                <Ionicons name="filter" size={24} color="#000" />
              </Pressable>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4" contentContainerStyle={{ gap: 8 }}>
              {TABS.map((tab) => (
                  <Pressable key={tab.id} className="px-4 py-2 flex flex-col items-center justify-center gap-4">
                    <Image source={tab.img} className="h-12 w-12" />
                    <Text className="text-white font-medium text-sm">{tab.title}</Text>
                  </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>

        <View className="flex-1 mt-[351px] rounded-t-[32px] bg-white pl-4">
          <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="mt-5">
            {PLACES_SECTIONS.map((section) => (
                <View key={section.id} className="mt-8">
                  <View className="flex-row items-center justify-between mb-3">
                    <Text className="text-2xl font-semibold text-[#351904] uppercase font-phudu">
                      {section.title}
                    </Text>
                    <Pressable className="flex-row items-center space-x-1">
                      <Text className="text-sm text-[#8B3A00] font-medium">Xem thêm</Text>
                      <Ionicons name="chevron-forward" size={16} color="#8B3A00" />
                    </Pressable>
                  </View>
                  <SwiperFlatList
                      showPagination={false}
                      data={section.items}
                      renderItem={({ item }) => (
                          <PlaceCard item={item} />
                      )}
                      keyExtractor={(item) => item.id}
                  />
                </View>
            ))}
          </ScrollView>
        </View>
      </View>
  );
}
