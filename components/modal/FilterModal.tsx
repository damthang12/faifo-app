import { View, Text, Pressable, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const ACTIVITIES = [
    'Ẩm thực', 'Văn hoá', 'Làng nghề', 'Mua sắm', 'Tham quan thiên nhiên', 'Bảo tàng',
];
const TIME_SLOTS = [
    { label: 'Buổi sáng', start: '0h' },
    { label: 'Buổi chiều', start: '12:00' },
    { label: 'Buổi tối', start: '17:00' },
    { label: 'Mở cửa 24/7', start: '' },
];
const FOR_WHOM = ['Gia đình', 'Nhóm bạn bè', 'Cá nhân', 'Cặp đôi'];

export default function FilterModal({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const [price, setPrice] = useState(0);
    const [isScrollAtBottom, setIsScrollAtBottom] = useState(false);

    const toggle = (value: string, list: string[], setList: (val: string[]) => void) => {
        setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection={isScrollAtBottom ? 'down' : undefined}
            backdropTransitionOutTiming={0}
            useNativeDriverForBackdrop
            style={{ justifyContent: 'flex-end', margin: 0 }}
        >
            <View className="bg-white rounded-t-3xl px-4 py-6 max-h-[80%]">
                <View className="w-[90px] h-1 bg-gray-300 rounded-full self-center mb-3" />

                <ScrollView
                    // showsVerticalScrollIndicator={false}bb
                            onScroll={(e) => {
                                const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
                                const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
                                setIsScrollAtBottom(isBottom);
                            }}
                            scrollEventThrottle={16}
                >

                    <Text className="text-2xl font-semibold mb-5">Bộ Lọc</Text>

                    {/* Section 1: Activities */}
                    <Text className="text-base font-bold mb-2">Hoạt động</Text>
                    <View className="flex flex-wrap flex-row gap-2 mb-4">
                        {ACTIVITIES.map((item) => {
                            const isSelected = selectedActivities.includes(item);

                            return (
                                <Pressable
                                    key={item}
                                    onPress={() => toggle(item, selectedActivities, setSelectedActivities)}
                                    className="flex-row justify-between w-full items-center space-x-2 px-4 py-2  bg-white"
                                >
                                    {/* Label */}
                                    <Text className=" font-medium">{item}</Text>

                                    {/* Checkbox icon */}
                                    <Ionicons
                                        name={isSelected ? 'checkbox' : 'square-outline'}
                                        size={20}
                                        color={isSelected ? '#FBBF24' : '#9CA3AF'}
                                    />


                                </Pressable>
                            );
                        })}
                    </View>
                    <View className="w-full h-[1px] bg-gray-300 my-10" />


                    {/* Section 2: Price */}
                    <Text className="text-base font-bold mb-2">Giá cả</Text>
                    <View className="">
                        <Slider
                            minimumValue={0}
                            maximumValue={10000000}
                            step={100000}
                            value={price}
                            onValueChange={setPrice}
                            minimumTrackTintColor="#F99F04"
                            maximumTrackTintColor="#ccc"
                        />
                        <Text className="text-center mt-2">Tối đa: {price.toLocaleString()}đ</Text>
                    </View>

                    <View className="w-full h-[1px] bg-gray-300 my-10" />


                    {/* Section 3: Time of Day */}
                    <Text className="text-base font-bold mb-2">Thời gian trong ngày</Text>
                    <View className="flex flex-col gap-2 ">
                        {TIME_SLOTS.map((slot) => {
                            const isSelected = selectedTimes.includes(slot.label);

                            return (
                                <Pressable
                                    key={slot.label}
                                    onPress={() => toggle(slot.label, selectedTimes, setSelectedTimes)}
                                    className={`flex-row items-start px-4 py-2 rounded-xl gap-3`}
                                >


                                    {/* Text info */}
                                    <View className="flex-1">
                                        <Text className=" font-medium">{slot.label}</Text>
                                        {slot.start !== '' &&  <Text className=" font-medium text-gray-500">Bắt đầu từ {slot.start}</Text> }

                                    </View>

                                    {/* Checkbox icon */}
                                    <Ionicons
                                        name={isSelected ? 'checkbox' : 'square-outline'}
                                        size={20}
                                        color={isSelected ? '#FBBF24' : '#9CA3AF'}
                                        style={{ marginTop: 2 }}
                                    />
                                </Pressable>
                            );
                        })}
                    </View>
                    <View className="w-full h-[1px] bg-gray-300 my-10" />


                    {/* Section 4: For Whom */}
                    <Text className="text-base font-bold mb-2">Dành cho</Text><View className="flex flex-wrap flex-row gap-2">
                    {FOR_WHOM.map((item) => {
                        const isSelected = selectedGroups.includes(item);
                        return (
                            <Pressable
                                key={item}
                                onPress={() => toggle(item, selectedGroups, setSelectedGroups)}
                                className={`flex-row w-full items-center px-4 py-2 justify-between gap-2`}
                            >

                                <Text className='font-medium'>{item}</Text>
                                <Ionicons
                                    name={isSelected ? 'checkbox' : 'square-outline'}
                                    size={18}
                                    color={isSelected ? '#FBBF24' : '#9CA3AF'}
                                />
                            </Pressable>
                        );
                    })}
                </View>

                    <View className="w-full h-[1px] bg-gray-300 my-10" />


                    {/* Actions */}
                    <View className="flex-row justify-between mb-6">
                        <Pressable onPress={onClose} className="px-4 py-3 ">
                            <Text className='underline font-semibold text-[20px]'>Xoá bộ lọc</Text>
                        </Pressable>
                        <Pressable onPress={onClose} className="px-10 py-4 bg-[#F99F04] rounded-[32px]">
                            <Text className="font-bold text-white">Áp dụng</Text>
                        </Pressable>
                    </View>

                </ScrollView>
            </View>
        </Modal>
    );
}
