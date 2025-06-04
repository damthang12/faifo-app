import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
    isVisible: boolean;
    onClose: () => void;
    onSelect: (count: number) => void;
    selected: number;
}

export default function PeopleCountModal({ isVisible, onClose, onSelect, selected }: Props) {
    const [selectedCount, setSelectedCount] = useState(selected || 1);

    const handleConfirm = () => {
        onSelect(selectedCount);
        onClose();
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection="down"
            style={{ justifyContent: 'flex-end', margin: 0 }}
        >
            <View className="bg-white rounded-t-3xl p-6">
                <Text className="text-2xl text-gray-900 font-beVNSemibold font-semibold  text-left mb-4">Số người tham gia</Text>
                <View className="flex-col items-center justify-center gap-4 mb-6">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <TouchableOpacity
                            key={num}
                            onPress={() => setSelectedCount(num)}
                            className={`w-12 h-12 items-center justify-center  `}
                        >
                            <Text className={`font-beVNSemibold ${selectedCount === num ? 'text-[#F99F04] text-3xl' : 'text-gray-700'}`}>
                                {num}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    onPress={handleConfirm}
                    className="bg-[#F99F04] py-4 rounded-full items-center"
                >
                    <Text className="text-white text-xl font-beVNSemibold ">Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
