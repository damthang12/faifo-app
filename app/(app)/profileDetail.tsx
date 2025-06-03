import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, {useState} from 'react';
import ArrLeft from "@/assets/images/arrow-left.png";
import {useRouter} from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Ionicons} from '@expo/vector-icons';
import ModalEditAvatar from '@/components/modal/EditAvatar';


export default function ProfileEditScreen() {
    const router = useRouter();
    const [avatar, setAvatar] = useState<string | null>(null);
    const [name, setName] = useState('Thanh Thương');
    const [email, setEmail] = useState('thanhthuong@faifo.com');
    const [country, setCountry] = useState('Việt Nam');
    const [phone, setPhone] = useState('(+84) 965 600 858');
    const [dob, setDob] = useState('');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => setDatePickerVisible(true);
    const hideDatePicker = () => setDatePickerVisible(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleConfirm = (date: Date) => {
        const formatted = date.toLocaleDateString('vi-VN'); // Format theo kiểu Việt Nam
        setDob(formatted);
        hideDatePicker();
    };

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setAvatar(result.assets[0].uri);
            setShowEditModal(false);
        }
    };

    const handleTakePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.status !== 'granted') {
            alert('Bạn cần cấp quyền truy cập camera để sử dụng tính năng này.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setAvatar(result.assets[0].uri);
        }
    }


    const handleRemoveAvatar = () => {
        setAvatar(null);
        setShowEditModal(false);
    };


    const handleBack = () => {
            router.back();
    };

    return (
        <View className="flex-1 bg-white px-4 pt-20">
            <View className="w-full flex flex-row items-center justify-between  mb-[50px]">
                {/* Back button */}
                <TouchableOpacity onPress={handleBack} className="">
                    <Image source={ArrLeft} className="h-6 w-6"/>
                </TouchableOpacity>
                <Text className="  text-xl font-semibold font-beVNSemibold"> Thông tin tài khoản</Text>
                <View className="h-6 w-6"/>
            </View>

            {/* Ảnh đại diện */}
            <TouchableOpacity onPress={() => setShowEditModal(true)} className="items-center mb-6">
                <Image
                    source={
                        avatar
                            ? {uri: avatar}
                            : require('@/assets/images/Avatar.png') // Ảnh fallback
                    }
                    className="w-[120px] h-[120px] rounded-full mb-4"
                />
                <Text className=" text-gray-900 font-semibold font-beVNSemibold text-sm">Chỉnh sửa ảnh đại diện</Text>
            </TouchableOpacity>

            {/* Trường thông tin */}
            <View className="space-y-4 flex-col gap-4">
                <View>
                    <Text className="font-semibold font-beVNSemibold text-sm text-gray-600 mb-1">Tên người dùng</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        className="border border-gray-300 rounded-xl p-3"
                    />
                </View>

                <View>
                    <Text className="font-semibold font-beVNSemibold text-sm text-gray-600 mb-1">Email</Text>
                    <TextInput
                        value={email}
                        editable={false}
                        className="border border-gray-300 rounded-xl p-3 bg-gray-100 text-gray-400"
                    />
                </View>

                <View>
                    <Text className="font-semibold font-beVNSemibold text-sm text-gray-600 mb-1">Quốc gia</Text>
                    <TextInput
                        value={country}
                        onChangeText={setCountry}
                        className="border border-gray-300 rounded-xl p-3"
                    />
                </View>

                <View>
                    <Text className="font-semibold font-beVNSemibold text-sm text-gray-600 mb-1">Số điện thoại</Text>
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        className="border border-gray-300 rounded-xl p-3"
                    />
                </View>

                <View>
                    <Text className="font-semibold font-beVNSemibold text-sm text-gray-600 mb-1">Sinh nhật</Text>
                    <TouchableOpacity onPress={showDatePicker}>
                        <View className="flex-row items-center border border-gray-300 rounded-xl px-3 py-3">
                            <View className="flex-1">
                                <TextInput
                                    placeholder="Chưa có thông tin"
                                    value={dob}
                                    editable={false}
                                    pointerEvents="none"
                                    className="text-black"
                                />
                            </View>
                            <Ionicons name="calendar-outline" size={20} color="#9CA3AF"/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity className="bg-[#F99F04] mt-6 p-4 rounded-full items-center">
                <Text className="text-white font-bold text-lg">Lưu thông tin</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                locale="vi"
                maximumDate={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                confirmTextIOS="Xác nhận"
                cancelTextIOS="Huỷ"
            />

            <ModalEditAvatar
                visible={showEditModal}
                onClose={() => setShowEditModal(false)}
                onPickFromGallery={handlePickImage}
                onTakePhoto={handleTakePhoto}
                onRemoveAvatar={handleRemoveAvatar}
            />
        </View>
    );
}
