import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
    visible: boolean;
    onClose: () => void;
    onLogout: () => void;
}

export default function LogoutModal({ visible, onClose, onLogout }: Props) {
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection="down"
            style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 16, paddingLeft: 16, margin: 0 }}
        >
            <View className="bg-white rounded-3xl p-6 flex-col gap-4 space-y-4">
                <Text className="text-2xl font-semibold font-beVN text-center">Đăng xuất tài khoản</Text>
                <Text className="text-gray-500 text-center font-beVN">
                    Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?
                </Text>

                <View className="flex-row justify-between gap-3">
                    <TouchableOpacity
                        onPress={onClose}
                        className="flex-1 border border-[#F99F04] py-3 rounded-full items-center"
                    >
                        <Text className="text-[#F99F04] text-xl font-beVN font-semibold">Huỷ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onLogout}
                        className="flex-1 bg-[#F99F04] py-3 rounded-full items-center"
                    >
                        <Text className="text-white text-xl font-beVN font-semibold">Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
