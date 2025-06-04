// components/modal/CalendarModal.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from "react-native-modal";

export default function CalendarModal({
                                          isVisible,
                                          onClose,
                                          onSelectDate,
                                      }: {
    isVisible: boolean;
    onClose: () => void;
    onSelectDate: (date: string) => void;
}) {
    const [selectedDate, setSelectedDate] = useState('');

    return (
        <Modal  isVisible={isVisible}
                onBackdropPress={onClose}
                onBackButtonPress={onClose}
                backdropOpacity={0.5}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
        >
            <View className="flex-1 justify-end ">
                <View className="bg-white p-5 rounded-t-3xl max-h-[80%]">
                    <View className="w-[90px] h-1 bg-gray-300 rounded-full self-center mb-2" />

                    <Calendar

                        onDayPress={(day) => setSelectedDate(day.dateString)}
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: '#F99F04' },
                        }}
                        theme={{
                            todayTextColor: '#F99F04',
                            selectedDayBackgroundColor: '#F99F04',
                            arrowColor: '#F99F04',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#b6c1cd',
                            selectedDayTextColor: '#ffffff',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            monthTextColor: '#351904',
                            indicatorColor: 'blue',
                            textDayFontFamily: 'font-beVN',
                            textMonthFontFamily: 'font-beVN',
                            textDayHeaderFontFamily: 'font-beVN',
                            textDayFontWeight: '400',
                            textMonthFontWeight: '700',
                            textDayHeaderFontWeight: '500',
                            textDayFontSize: 16,
                            textMonthFontSize: 20,
                            textDayHeaderFontSize: 14,
                        }}
                    />

                    <View className="flex-row justify-between mt-4 mb-5">
                        <TouchableOpacity onPress={onClose} className="p-4   w-[45%] items-center">
                            <Text className="text-xl font-semibold font-beVNSemibold text-gray-700 underline">Xoá bộ lọc</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (selectedDate) onSelectDate(selectedDate);
                                onClose();
                            }}
                            className="p-4 rounded-full bg-[#F99F04] w-[45%] items-center"
                        >
                            <Text className="text-white text-xl font-semibold font-beVNSemibold">Áp dụng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
