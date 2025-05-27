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
                <Text className="text-lg font-bold text-center mb-4">Số người tham gia</Text>
                <View className="flex-row flex-wrap justify-center gap-4 mb-6">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <TouchableOpacity
                            key={num}
                            onPress={() => setSelectedCount(num)}
                            className={`w-12 h-12 rounded-full items-center justify-center border ${
                                selectedCount === num ? 'bg-[#F99F04] border-[#F99F04]' : 'border-gray-300'
                            }`}
                        >
                            <Text className={selectedCount === num ? 'text-white font-bold' : 'text-gray-700'}>
                                {num}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    onPress={handleConfirm}
                    className="bg-[#F99F04] py-3 rounded-full items-center"
                >
                    <Text className="text-white text-base font-bold">Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
