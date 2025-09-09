import ImgBGMobile from "@/assets/images/mvdl-mobile.png";
import ImgBGDesktop from "@/assets/images/mvdl-tablet.png";

import VH from "@/assets/images/home/vh.png";
import { Item, PLACES_SECTIONS } from "@/constants/MockData";
import { useTripStore } from "@/store/useTripStore";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";

import {
  Animated,
  Dimensions,
  Image,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

export default function TravelGuideDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const isTablet = Dimensions.get("window").width >= 768;

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const place = PLACES_SECTIONS.flatMap((section) => section.items).find(
    (item) => item.id === id
  ) as Item;
  const scrollY = useRef(new Animated.Value(0)).current;
  const { hasItineraryItem, itinerary } = useTripStore();

  // Tạo một opacity dựa trên scroll position
  const blurOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const placeInfo = {
    // id: Date.now().toString(),
    id: place.id,
    time: place.openTime,
    title: place.place,
    location: place.location || "",
  };

  const alreadyAdded = hasItineraryItem(place.id);
  const isAdd = useMemo(() => {
    return hasItineraryItem(place.id);
  }, [hasItineraryItem, place.id, itinerary]);

  return (
    <View className="flex-1 bg-white">
      {/* Header Blur */}
      <Animated.View
        style={{
          position: "absolute",
          top: -40,
          left: 0,
          right: 0,
          height: 90,
          paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight,
          zIndex: 10,
          opacity: blurOpacity,
        }}
      >
        <BlurView intensity={50} tint="light" style={{ flex: 1 }} />
      </Animated.View>

      {/* Scroll Content */}
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View className="flex-1">
          {/* Swiper for images */}
          <SwiperFlatList
            data={place?.images?.user}
            showPagination
            autoplay
            autoplayDelay={5}
            autoplayLoop
            autoplayLoopKeepAnimation
            index={0}
            renderItem={({ item }) => (
              <Image
                source={item}
                className="w-[430px] h-[332px] tablet:h-[678px] tablet:w-[1024px]"
              />
            )}
            keyExtractor={(item, index) => `${place.id}-img-${index}`}
            paginationStyle={{
              position: "absolute",
              bottom: 0,
              alignSelf: "center",
            }}
            paginationStyleItem={{
              width: 32,
              height: 4,
              marginHorizontal: 4,
              borderRadius: 4,
              opacity: 0.8,
            }}
            paginationStyleItemActive={{
              backgroundColor: "#fff",
              opacity: 1,
            }}
          />

          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-12 left-4 bg-white/80 p-2 rounded-full"
          >
            <Ionicons name="arrow-back" size={20} color="#000" />
          </TouchableOpacity>

          <View className="absolute bottom-8 left-4 w-full">
            <Text className="tablet:text-[80px] text-[40px] font-semibold uppercase font-phudu text-white w-full max-w-[308px] tablet:max-w-[508px] tablet:h-[230px] h-[120px] ">
              {place?.place}
            </Text>
            <Pressable onPress={() => router.back()} className="">
              <Text className="rounded-full tablet:text-xl text-base w-full max-w-[175px] tablet:max-w-[228px] bg-[#FFF1CB] text-[#8B3A00] tablet:px-5 px-3 tablet:py-3 py-2">
                Trò chuyện cùng Faifan
              </Text>
            </Pressable>
          </View>
        </View>

        <View className=" flex-1 mb-8">
          <View className="flex-col px-4 tablet:px-8 gap-6 mb-4">
            {place.travelGuidelines?.map((item, idx) => (
              <View key={idx}>
                <View className="flex-row items-center gap-4 my-6">
                  <View className="w-8 h-8 bg-[#F19900] items-center justify-center flex rounded-full">
                    <Image source={VH} className="w-7 h-7" />
                  </View>
                  <Text className="text-2xl uppercase font-semibold text-[#8B3A00] font-phudu my-5">
                    {item.title}
                  </Text>
                </View>
                {item.image && (
                  <View>
                    <Image
                      source={item.image}
                      className="w-full h-[260px] tablet:h-[600px] rounded-xl mb-4"
                    />
                  </View>
                )}
                <View className=" flex flex-col gap-10 space-y-2 ">
                  {item.description?.map((description, index) => (
                    <View key={index} className="flex-row gap-1 text-gray-700 ">
                      <Text
                        className={`font-beVN w-full ${
                          item.image ? "text-center" : "text-left"
                        }`}
                      >
                        {description}
                      </Text>
                    </View>
                  ))}
                </View>

                {item.note && (
                  <Text className="text-[#8B3A00] font-beVN mt-6">
                    {item.note}
                  </Text>
                )}
                {item.address && (
                  <Text
                    className={`font-beVN mt-4 ${
                      item.image
                        ? "text-center text-[#F19900] underline"
                        : "text-left text-gray-700 "
                    }`}
                  >
                    {item.address}
                  </Text>
                )}
              </View>
            ))}
            <Pressable onPress={() => router.back()} className="">
              <Text className="rounded-full tablet:text-xl text-base w-full max-w-[175px] tablet:max-w-[228px] bg-[#FFF1CB] text-[#8B3A00] tablet:px-5 px-3 tablet:py-3 py-2">
                Trò chuyện cùng Faifan
              </Text>
            </Pressable>
          </View>
        </View>
      </Animated.ScrollView>

      <View className="h-[160px]  tablet:h-[180px] w-full z-0">
        <Image
          source={isTablet ? ImgBGDesktop : ImgBGMobile}
          className="w-full h-full bg-transparent"
        />
      </View>
    </View>
  );
}
