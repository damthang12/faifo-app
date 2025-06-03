import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'; // ✅ đúng
import { Ionicons } from '@expo/vector-icons';

interface Props {
    visible: boolean;
    onClose: () => void;
    onPickFromGallery: () => void;
    onTakePhoto: () => void;
    onRemoveAvatar: () => void;
}

export default function ModalEditAvatar({
                                            visible,
                                            onClose,
                                            onPickFromGallery,
                                            onTakePhoto,
                                            onRemoveAvatar
                                        }: Props) {

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection="down"
            style={{ justifyContent: 'flex-end', margin: 0 }}
        >
            <View className="flex-1 justify-end ">

                <View className="bg-white p-4 rounded-t-3xl space-y-4 ">
                    <View className="w-[100px] h-[6px] bg-gray-300 rounded-full self-center mb-5" />

                    <Text className=" text-gray-900 font-semibold font-beVNSemibold text-2xl mb-10">Chỉnh sửa ảnh đại diện</Text>

                    <TouchableOpacity onPress={onPickFromGallery} className="flex-row items-center gap-3">
                        <Ionicons name="images-outline" size={20} color="#000" />
                        <Text className="text-base font-beVN text-black">Chọn từ thư viện</Text>
                    </TouchableOpacity>

                    <View className='h-[1px] bg-gray-200 my-4' />

                    <TouchableOpacity onPress={onTakePhoto} className="flex-row items-center gap-3">
                        <Ionicons name="camera-outline" size={20} color="#000" />
                        <Text className="text-base font-beVN text-black ">Chụp ảnh</Text>
                    </TouchableOpacity>
                    <View className='h-[1px] bg-gray-200 my-4' />

                    <TouchableOpacity onPress={onRemoveAvatar} className="flex-row items-center gap-3">
                        <Ionicons name="trash-outline" size={20} color="#EF4444" />
                        <Text className="text-base font-beVN text-[#EF4444] ">Gỡ ảnh hiện tại</Text>
                    </TouchableOpacity>
                    <View className='h-[1px] bg-gray-200 my-4' />
                    <Text className="text-sm font-beVN text-gray-500 mt-2 mb-7">
                        Ảnh đại diện của bạn hiển thị với mọi người ở trên Faifo và ở các đánh giá.
                    </Text>

                    {/*<TouchableOpacity*/}
                    {/*    onPress={onClose}*/}
                    {/*    className="mt-4 p-3 bg-gray-200 rounded-full items-center"*/}
                    {/*>*/}
                    {/*    <Text className="text-gray-700 font-semibold font-beVN">Đóng</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </View>
        </Modal>
    );
}
