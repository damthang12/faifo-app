import {View, Text, Pressable, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {useState} from 'react';
import {Ionicons} from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import {router} from 'expo-router';

const ACTIVITIES = [
    'Ẩm thực', 'Văn hoá', 'Làng nghề', 'Mua sắm', 'Tham quan thiên nhiên', 'Bảo tàng',
];
const TIME_SLOTS = [
    {label: 'Buổi sáng', start: '0h'},
    {label: 'Buổi chiều', start: '12:00'},
    {label: 'Buổi tối', start: '17:00'},
    {label: 'Mở cửa 24/7', start: ''},
];
const FOR_WHOM = ['Gia đình', 'Nhóm bạn bè', 'Cá nhân', 'Cặp đôi'];

export default function FilterModal({isVisible, onClose}: { isVisible: boolean; onClose: () => void }) {
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const [price, setPrice] = useState(0);
    const [isScrollAtBottom, setIsScrollAtBottom] = useState(false);
    
    const toggle = (value: string, list: string[], setList: (val: string[]) => void) => {
        setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    };
    
    const handleFilter = () => {
        onClose();
        router.push('/(noti)/Error');
    };
    
    const clearFilter = () => {
        setSelectedActivities([]);
        setSelectedTimes([]);
        setSelectedGroups([]);
        setPrice(0);
    };
    
    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        onSwipeComplete={onClose}
        swipeDirection={isScrollAtBottom ? 'down' : undefined}
        backdropTransitionOutTiming={0}
        useNativeDriverForBackdrop
        style={{justifyContent: 'flex-end', margin: 0}}
      >
          <View className="bg-white rounded-t-3xl px-4 py-6 tablet:px-8 tablet:py-7 max-h-[80%]">
              {/* drag handle */}
              <View className="w-[90px] tablet:w-[100px] h-1 tablet:h-[5px] bg-gray-300 rounded-full self-center mb-3 tablet:mb-4" />
              
              <ScrollView
                keyboardShouldPersistTaps="handled"
                onScroll={(e) => {
                    const {layoutMeasurement, contentOffset, contentSize} = e.nativeEvent;
                    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
                    setIsScrollAtBottom(isBottom);
                }}
                scrollEventThrottle={16}
                className="pb-6 tablet:pb-8"
              >
                  <Text className="text-2xl tablet:text-3xl font-beVNSemibold mb-5 tablet:mb-6">Bộ Lọc</Text>
                  
                  {/* Section 1: Activities */}
                  <Text className="text-xl tablet:text-2xl font-beVNSemibold mb-2 tablet:mb-3">Hoạt động</Text>
                  <View className="flex flex-col gap-1.5 tablet:gap-2 mb-4 tablet:mb-5">
                      {ACTIVITIES.map((item) => {
                          const isSelected = selectedActivities.includes(item);
                          return (
                            <Pressable
                              key={item}
                              onPress={() => toggle(item, selectedActivities, setSelectedActivities)}
                              className="w-full flex-row items-center justify-between px-4 py-2 tablet:px-5 tablet:py-3 rounded-xl bg-white"
                            >
                                <Text className="text-gray-900 font-beVNMedium text-base tablet:text-xl">{item}</Text>
                                <View className="mt-0.5">
                                    <Ionicons
                                      name={isSelected ? 'checkbox' : 'square-outline'}
                                      size={20}
                                      color={isSelected ? '#FBBF24' : '#9CA3AF'}
                                    />
                                </View>
                            </Pressable>
                          );
                      })}
                  </View>
                  
                  <View className="w-full h-px bg-gray-300 my-8 tablet:my-10" />
                  
                  {/* Section 2: Price */}
                  <Text className="text-xl tablet:text-2xl font-beVNSemibold mb-2 tablet:mb-3">Giá cả</Text>
                  <View className="mt-1 flex-col gap-1 tablet:gap-2 tablet:mt-2">
                      <Slider
                        minimumValue={0}
                        maximumValue={10000000}
                        step={100000}
                        value={price}
                        onValueChange={setPrice}
                        minimumTrackTintColor="#F99F04"
                        maximumTrackTintColor="#ccc"
                      />
                    <View className="w-full flex-row justify-between">
                        
                        <Text className="text-center mt-2 tablet:mt-3 text-base tablet:text-xl">
                            0đ
                        </Text>
                        <Text className="text-center mt-2 tablet:mt-3 text-base tablet:text-xl">
                            {/*{price.toLocaleString()}đ*/} 5.000.000đ
                        </Text>
                        <Text className="text-center mt-2 tablet:mt-3 text-base tablet:text-xl">
                            10.000.000đ
                        </Text>
                        
                    </View>
                  </View>
                  
                  <View className="w-full h-px bg-gray-300 my-8 tablet:my-10" />
                  
                  {/* Section 3: Time of Day */}
                  <Text className="text-xl tablet:text-2xl font-beVNSemibold mb-2 tablet:mb-3">Thời gian trong ngày</Text>
                  <View className="flex flex-col gap-1.5 tablet:gap-2">
                      {TIME_SLOTS.map((slot) => {
                          const isSelected = selectedTimes.includes(slot.label);
                          return (
                            <Pressable
                              key={slot.label}
                              onPress={() => toggle(slot.label, selectedTimes, setSelectedTimes)}
                              className="flex-row items-start px-4 py-2 tablet:px-5 tablet:py-3 rounded-xl gap-3 tablet:gap-4"
                            >
                                <View className="flex-1">
                                    <Text className="text-gray-900 font-beVNMedium text-base tablet:text-xl">{slot.label}</Text>
                                    {slot.start !== '' && (
                                      <Text className="text-gray-500 font-beVN text-sm tablet:text-base">
                                          Bắt đầu từ {slot.start}
                                      </Text>
                                    )}
                                </View>
                                
                                <View className="mt-0.5">
                                    <Ionicons
                                      name={isSelected ? 'checkbox' : 'square-outline'}
                                      size={20}
                                      color={isSelected ? '#FBBF24' : '#9CA3AF'}
                                    />
                                </View>
                            </Pressable>
                          );
                      })}
                  </View>
                  
                  <View className="w-full h-px bg-gray-300 my-8 tablet:my-10" />
                  
                  {/* Section 4: For Whom */}
                  <Text className="text-xl tablet:text-2xl font-beVNSemibold mb-2 tablet:mb-3">Dành cho</Text>
                  <View className="flex flex-col gap-1.5 tablet:gap-2">
                      {FOR_WHOM.map((item) => {
                          const isSelected = selectedGroups.includes(item);
                          return (
                            <Pressable
                              key={item}
                              onPress={() => toggle(item, selectedGroups, setSelectedGroups)}
                              className="w-full flex-row items-center justify-between px-4 py-2 tablet:px-5 tablet:py-3 rounded-xl"
                            >
                                <Text className="text-gray-900 font-beVNMedium text-base tablet:text-xl">{item}</Text>
                                <Ionicons
                                  name={isSelected ? 'checkbox' : 'square-outline'}
                                  size={18}
                                  color={isSelected ? '#FBBF24' : '#9CA3AF'}
                                />
                            </Pressable>
                          );
                      })}
                  </View>
                  
                  <View className="w-full h-px bg-gray-300 my-8 tablet:my-10" />
              </ScrollView>
              
              {/* Actions */}
              <View className="w-full h-px bg-gray-300 my-6 tablet:my-5" />
              
              <View className="flex-row items-center w-full gap-3 mb-4 tablet:mb-3 tablet:mt-3">
                  <Pressable onPress={clearFilter} className="flex-1 h-[52px] tablet:h-[60px] items-start tablet:items-center justify-center px-3 rounded-[32px]">
                      <Text className="underline  font-beVNSemibold text-lg tablet:text-xl text-gray-700">
                          Xoá bộ lọc
                      </Text>
                  </Pressable>
                  
                  <Pressable onPress={handleFilter} className="flex-1 h-[52px] tablet:h-[60px] items-center justify-center bg-[#F99F04] rounded-[32px] px-8 tablet:px-10">
                      <Text className="text-white font-beVNSemibold text-lg tablet:text-xl">
                          Áp dụng
                      </Text>
                  </Pressable>
              </View>
          </View>
      </Modal>
    );
}
