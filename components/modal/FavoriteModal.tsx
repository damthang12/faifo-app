import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import React, { useState } from 'react';
import {useFavoriteStore} from "@/store/useFavoriteStore";
import * as ImagePicker from 'expo-image-picker';

import DS1 from "@/assets/images/detail/DS1.png";
import DS2 from "@/assets/images/detail/DS2.png";
import DS3 from "@/assets/images/detail/DS3.png";
import DS4 from "@/assets/images/detail/DS4.png";

interface Props {
    isVisible: boolean;
    onClose: () => void;
}

export default function FavoriteModal({ isVisible, onClose }: Props) {
    const DEFAULT_IMAGES = [DS1, DS2, DS3, DS4];

    const [newListName, setNewListName] = useState('');
    const {createFavoriteList} = useFavoriteStore()
    const [selectedImages, setSelectedImages] = useState<any[]>([]);

    const handleCreateList = () => {
        const randomId = (Math.floor(Math.random() * 1000)).toString();

        if (!newListName.trim()) {
            alert('Vui lòng nhập tên danh sách.');
            return;
        }

        const imagesToSave =
            selectedImages.length >= 4
                ? selectedImages
                : selectedImages.length === 0
                    ? DEFAULT_IMAGES
                    : null;

        if (!imagesToSave || imagesToSave.length < 4) {
            alert('Bạn cần chọn ít nhất 4 ảnh cho danh sách.');
            return;
        }

        createFavoriteList(newListName.trim(), randomId, imagesToSave);
        setNewListName('');
        setSelectedImages([]);
        onClose();
    };

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setSelectedImages((prev) => [...prev, ...result.assets.map((a) => a.uri)]);
        }
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection="down"
            style={{ justifyContent: 'flex-end', margin: 0 }}
        >
            <View className="flex-1 justify-end bg-black/50">
                <View className="bg-white p-6 rounded-t-3xl space-y-4">
                    <View className="w-[90px] h-1 bg-gray-300 rounded-full self-center mb-3" />
                    <Text className=" text-gray-900 font-semibold font-beVN text-2xl mb-10">Tạo danh sách yêu thích mới</Text>

                    <Text className="font-medium text-sm text-gray-600 mb-1">Tên danh sách</Text>
                    <TextInput
                        placeholder="Đặt tên danh sách yêu thích của bạn"
                        value={newListName}
                        onChangeText={setNewListName}
                        className="border border-gray-300 rounded-xl px-4 py-3"
                    />

                    <View className="border border-gray-500 rounded-xl p-2 mt-4">
                        {selectedImages.length > 0 && (

                            <View className="flex-row gap-2 mt-4">
                                {selectedImages.map((uri, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri }}
                                        className="w-[80px] h-[80px] rounded-xl"
                                    />
                                ))}
                            </View>
                        )
                        }

                        <TouchableOpacity
                            onPress={handlePickImage}
                            className="bg-gray-100 py-3 px-4 rounded-xl items-center mt-2"
                        >
                            <Text className="text-black font-medium font-beVN">+ Chọn ảnh cho danh sách</Text>
                        </TouchableOpacity>
                    </View>




                    <View className="flex-row justify-between gap-3 mt-7">
                        {/*<TouchableOpacity*/}
                        {/*    onPress={onClose}*/}
                        {/*    className="flex-1 border border-[#F99F04] py-3 rounded-full items-center"*/}
                        {/*>*/}
                        {/*    <Text className="text-[#F99F04] text-xl font-beVN font-semibold">Huỷ</Text>*/}
                        {/*</TouchableOpacity>*/}

                        <TouchableOpacity
                            onPress={handleCreateList}

                            className="flex-1 bg-[#F99F04] py-3 rounded-full items-center"
                        >
                            <Text className="text-white text-xl font-beVN font-semibold">Tạo danh sách yêu thích</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
