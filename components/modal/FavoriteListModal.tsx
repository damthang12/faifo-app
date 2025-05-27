import React, {useState} from 'react';
import {Image, ScrollView, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import Modal from 'react-native-modal';
import {Ionicons} from '@expo/vector-icons';
import {useFavoriteStore} from "@/store/useFavoriteStore";
import {Item} from "@/constants/MockData";
import DS1 from "@/assets/images/detail/DS1.png";
import DS2 from "@/assets/images/detail/DS2.png";
import DS3 from "@/assets/images/detail/DS3.png";
import DS4 from "@/assets/images/detail/DS4.png";
import * as ImagePicker from "expo-image-picker";

export default function FavoriteListModal({
                                              isVisible,
                                              onClose,
                                              place
                                          }: {
    isVisible: boolean;
    onClose: () => void;
    place: Item,

}) {
    const DEFAULT_IMAGES = [DS1, DS2, DS3, DS4];

    const [step, setStep] = useState(1);
    const [newListName, setNewListName] = useState('');
    const [selectedImages, setSelectedImages] = useState<any[]>([]);

    const {lists, addItemToList} = useFavoriteStore();
    const {createFavoriteList} = useFavoriteStore()


    const handleAdd = (listId: string) => {
        const newListName = {
            id: place.id,
            name: place.place,
            rating: place.rating,
            reviewCount: place.reviewCount,
            openTime: place.openTime,
            image: place.image,
            location: place.location,
            category: "Văn hoá",
        };
        addItemToList(listId, newListName);
        onClose();
    };


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
        setStep(1);
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
    const handleAddNew = () => {
        setStep(2)
    }


    const renderStepContent = () => {
        if (step === 1) {
            return (
                <View className="bg-white p-4 rounded-t-2xl max-h-[100%]">
                    <ScrollView
                        showsVerticalScrollIndicator={false}

                        contentContainerStyle={{paddingBottom: 14}}
                    >
                        <View className="w-[90px] h-[6px] bg-gray-300 rounded-full self-center mb-5"/>
                        <Text className="text-2xl font-semibold font-beVN">Thêm vào danh sách yêu thích</Text>
                        <View className="h-[1px] w-full bg-gray-300 my-7"/>
                        <View className="flex-col gap-1">
                            <Text className="font-medium text-gray-500 mb-2 font-beVN">
                                Chọn danh sách yêu thích có sẵn hoặc tạo mới
                            </Text>
                            <View className="flex-row flex-wrap gap-2">
                                {/* Grid image picker */}

                                <View className="flex-row gap-2 ">

                                    {lists.map((item, index) => (
                                        <TouchableOpacity
                                            onPress={() => handleAdd(item.id as string)}
                                            key={item.id}
                                            className="  rounded-xl overflow-hidden gap-3"
                                        >
                                            <View
                                                className="w-[120px] h-[120px] flex-row flex-wrap gap-x-1 gap-y-1 items-center justify-center rounded-2xl border border-[#F99F04] p-2">
                                                {item.images?.map((image, imgIndex) => (
                                                    <View
                                                        key={imgIndex}
                                                        className="w-[50px] h-[50px] bg-gray-100 rounded-xl overflow-hidden"
                                                    >
                                                        <Image
                                                            source={image}
                                                            className="w-full h-full"
                                                            resizeMode="cover"
                                                        />
                                                    </View>
                                                ))}
                                            </View>
                                            <Text className="font-semibold text-[#8B3A00] text-sm font-beVN mb-10 ">
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <TouchableOpacity
                                    onPress={handleAddNew}
                                    className="w-[120px] h-[120px] bg-gray-100 rounded-2xl items-center justify-center"
                                >
                                    <View
                                        className="w-10 h-10 border border-gray-800 rounded-full items-center justify-center">
                                        <Ionicons name="add" size={24} color="#4B5563"/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        }

        if (step === 2) {
            return (
                <View className="bg-white p-4 rounded-t-2xl max-h-[100%]">

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 14}}
                    >
                        <View className="w-[90px] h-1 bg-gray-300 rounded-full self-center mb-3"/>
                        <Text className=" text-gray-900 font-semibold font-beVN text-2xl mb-10">Tạo danh sách yêu thích
                            mới</Text>

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
                                            source={{uri}}
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
                                <Text className="text-white text-xl font-beVN font-semibold">Tạo danh sách yêu
                                    thích</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </View>
            );
        }
    }

    return (
        <>
            <Modal
                isVisible={isVisible}
                onBackdropPress={onClose}
                style={{justifyContent: 'flex-end', margin: 0}}
                avoidKeyboard
            >
                {renderStepContent()}
            </Modal>
        </>

    );
}