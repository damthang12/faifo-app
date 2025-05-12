// app/(tabs)/map.tsx
import { useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import VH from "@/assets/Icon/VH";
import AT from "@/assets/Icon/AT";
import BT from "@/assets/Icon/BT";
import QLN from "@/assets/Icon/QLN";
import LN from "@/assets/Icon/LN";
import CI from "@/assets/Icon/CI";


type TabKey = {
  title: string;
  image: (isActive: boolean) => any;
};
type Place = {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  openTime: string;
  image: string;
};

const CATEGORY_TABS: TabKey[] = [
  {
    title: 'Văn hoá',
    image: (isActive: boolean) => <VH color={isActive ? 'white' : '#414651'} />,
  },
  {
    title: 'Ẩm thực',
    image: (isActive: boolean) => <AT color={isActive ? 'white' : '#414651'} />,
  },
  {
    title: 'Checkin',
    image: (isActive: boolean) => <CI color={isActive ? 'white' : '#414651'} />,
  },
  {
    title: 'Quà lưu niệm',
    image: (isActive: boolean) => <QLN color={isActive ? 'white' : '#414651'} />,
  },
  {
    title: 'Bảo tàng',
    image: (isActive: boolean) => <BT color={isActive ? 'white' : '#414651'} />,
  },
  {
    title: 'Làng nghề',
    image: (isActive: boolean) => <LN color={isActive ? 'white' : '#414651'} />,
  },
];

const PLACE_DATA: Record<any, Place[]> = {
  'Văn hoá': [
    {
      id: '1',
      name: 'Nhà cổ Tấn Ký',
      rating: 4.6,
      reviewCount: 234,
      openTime: '07:00 - 18:00',
      image: 'https://picsum.photos/id/1011/400/300',
    },
    {
      id: '2',
      name: 'Chùa Cầu',
      rating: 4.8,
      reviewCount: 812,
      openTime: '06:30 - 20:00',
      image: 'https://picsum.photos/id/1012/400/300',
    },
  ],
  'Checkin': [
    {
      id: '3',
      name: 'Bờ sông Hoài',
      rating: 4.7,
      reviewCount: 123,
      openTime: 'Mọi lúc',
      image: 'https://picsum.photos/id/1013/400/300',
    },
  ],
  'Ẩm thực': [
    {
      id: '4',
      name: 'Cao lầu Bà Bé',
      rating: 4.5,
      reviewCount: 98,
      openTime: '08:00 - 21:00',
      image: 'https://picsum.photos/id/1014/400/300',
    },
  ],
};

export default function MapScreen() {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<TabKey | ''>('');
  const [search, setSearch] = useState('');

  const handleBack = () => {
    router.back();
  };

  return (
      <View style={{ flex: 1 }}>
        {/* MAP */}
        <MapView
            style={StyleSheet.absoluteFill}
            initialRegion={{
              latitude: 15.8801,
              longitude: 108.3380,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
        >
          <Marker
              coordinate={{ latitude: 15.8801, longitude: 108.3380 }}
              title="Hội An"
              description="Địa điểm du lịch"
          />
        </MapView>

        {/* Overlay Controls */}
        <View className="top-[60px] px-4 justify-between flex flex-col h-full">
          {/* Tabs */}
          <View className="">
            {/* Back + Search */}
            <View style={styles.topBar}>
              <TouchableOpacity onPress={handleBack} className="p-2 bg-white rounded-full mr-2">
                <Ionicons name="arrow-back" size={20} color="#000"/>
              </TouchableOpacity>
              <TextInput
                  className="flex-1 bg-white rounded-full px-4 py-2 text-sm"
                  placeholder="Tìm kiếm địa điểm..."
                  value={search}
                  onChangeText={setSearch}
              />
            </View>

            {/* Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}
                        contentContainerStyle={{ gap: 12 }}>
              {CATEGORY_TABS.map((tab) => {
                const isActive = selectedTab === tab;
                return (
                    <Pressable
                        key={tab.title}
                        onPress={() => setSelectedTab(prev => (prev === tab ? '' : tab))}
                        className={`px-4 py-2 rounded-full flex-row justify-center items-center gap-2 ${isActive ? 'bg-[#F99F04]' : 'bg-white'}`}
                    >
                      {tab.image(isActive) }
                      <Text className={isActive ? 'text-white font-semibold' : 'text-black'}>{tab.title}</Text>
                    </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {/* Suggestion List */}
          {selectedTab !== '' && (
              <View className="absolute w-full bottom-[100px] left-4 right-0">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 12, paddingRight: 16 }}
                >
                  {PLACE_DATA[selectedTab.title]?.map((place) => (
                      <View
                          key={place.id}
                          className="w-[320px] h-[130px] bg-white rounded-xl overflow-hidden flex-row"
                      >
                        <Image
                            source={{ uri: place.image }}
                            className="w-[130px] h-full"
                            resizeMode="cover"
                        />
                        <View className="p-2 flex-1 justify-center gap-2">
                          <Text className="text-base font-semibold">{place.name}</Text>
                          <Text className="text-sm text-gray-500">
                            ⭐ {place.rating} ({place.reviewCount} đánh giá)
                          </Text>
                          <Text className="text-xs text-gray-400">Giờ mở cửa: {place.openTime}</Text>
                        </View>
                      </View>
                  ))}
                </ScrollView>
              </View>
          )}

        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexGrow: 0,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
