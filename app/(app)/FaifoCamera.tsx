import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Image, Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {CameraView, useCameraPermissions} from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import {askGeminiWithImage} from '@/service/api';
import CameraIcon from "@/assets/Icon/Camera";

import OK from '@/assets/images/camera/OK.png';
import ArrLeft from "@/assets/images/arrow-left.png";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import ArrowLeftIcon from "@/assets/Icon/ArrowLeft";
import ChatBotModal from "@/components/modal/ChatBotModal";


const TEXTS = [{description: 'Bạn có muốn nghe về truyền thuyết con Cù nằm dưới cầu không?'}, {description: 'Bạn có biết vì sao người Nhật dựng cầu mà lại thờ thần Bắc Đế của người Hoa?'}];

export default function FaifoScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [resultModal, setResultModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const cameraRef = useRef<any>(null);
    const router = useRouter();

    useEffect(() => {
        if (!permission) requestPermission();
    }, [permission]);


    const takePhoto = async () => {
        if (!cameraRef.current) return;

        try {
            setLoading(true);
            const photo = await cameraRef.current.takePictureAsync({base64: true});
            setImageUri(photo.uri);

            const result = await askGeminiWithImage(
                `data:image/jpeg;base64,${photo.base64}`,
                `Đây là địa danh nào ở Hội An, và có thông tin lịch sử nào không? chỉ trả lời tiếng việt`
            );

            if (result && result !== 'Không có phản hồi.') {
                setAiResponse(result);
                setResultModal(true);
            } else {
                setErrorModal(true);
            }
        } catch (err) {
            console.error('❌ Lỗi chụp hoặc xử lý ảnh:', err);
            setErrorModal(true);
        } finally {
            setLoading(false);
        }
    };

    if (!permission?.granted) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Bạn cần cấp quyền camera để tiếp tục.</Text>
                <TouchableOpacity onPress={requestPermission} className="mt-4 px-4 py-2 bg-blue-500 rounded">
                    <Text className="text-white">Cấp quyền</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleSearch = (text: string) => {
        setShowChatbot(true);
        setSearchText(text)
    }

    const handleClose = () => {
        setImageUri('')
    }


    const renderView = () => {
        if (imageUri) {

            return (

                <ScrollView scrollEnabled={false}>

                    <View className="flex-1 justify-center bg-black/60 w-full h-full">
                        <View className="bg-white  rounded-xl pb-10">
                            <View className="flex-col">
                                <View
                                    className="flex-row justify-between items-center absolute px-4 mt-[60px] z-10 w-full ">
                                    <TouchableOpacity onPress={() => handleClose()}
                                                      className="border border-gray-900 rounded-full">
                                        <Ionicons name="close" size={20} color="#000"/>
                                    </TouchableOpacity>
                                    <Text className="text-xl text-black font-beVNSemibold font-semibold">Ống kính
                                        Faifo</Text>
                                    <View className="w-6 h-6"/>
                                </View>
                                {imageUri && (
                                    <Image
                                        source={{uri: imageUri}}
                                        style={{width: '100%', height: 400}}
                                        resizeMode="cover"
                                    />
                                )}
                            </View>

                            {/* Kết quả AI */}
                            <View className="px-4 mt-4 ">
                                <Text className="text-xl font-semibold font-phudu text-[#8B3A00] mb-3">Kết quả
                                    từ Faifo AI:</Text>
                                <View className="bg-[#F7E9CE80]/50 p-4 rounded-xl" style={{height: 350}}>
                                    <ScrollView>
                                        <Text className="text-base font-beVNSemibold text-gray-900">
                                            {aiResponse}
                                        </Text>
                                    </ScrollView>
                                </View>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false}
                                        horizontal className="flex-row  w-full px-4 my-5 ">
                                {TEXTS.map((text, i) => (
                                    <View key={i} className="pr-4">
                                        <TouchableOpacity
                                            onPress={() => handleSearch(text?.description)}
                                            className="  p-3 rounded-2xl items-center border border-gray-300 w-[330px]">
                                            <Text
                                                className="text-black font-semibold font-beVNSemibold">{text.description}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>

            )
        }

        return (
            <CameraView
                ref={cameraRef}
                facing="back"
                style={{flex: 1}}
                className="px-4"
            >
                {/* Bọc toàn bộ UI overlay lại */}
                <View pointerEvents="box-none" className="absolute inset-0 z-50">

                    {/* Header */}
                    <View className="flex-row justify-between items-center mt-[60px] px-4">
                        <TouchableOpacity onPress={() => router.back()}>
                            <ArrowLeftIcon size={24}/>
                        </TouchableOpacity>
                        <Text className="text-xl text-white font-beVNSemibold font-semibold">Ống kính Faifo</Text>
                        <View className="w-6 h-6"/>
                    </View>

                    {/* Overlay center frame */}
                    <View className="absolute inset-0 justify-center items-center">
                        <Image source={OK} className="w-[369px] h-[327px]"/>
                    </View>

                    {/* Footer */}
                    <View className="absolute bottom-10 w-full items-center gap-4 px-4">
                        <Text className="text-white text-xl font-beVN">Nhấn chụp để khám phá</Text>
                        <TouchableOpacity
                            onPress={takePhoto}
                            className="w-[80px] h-[80px] items-center justify-center bg-[#FFFFFFB2]/70 rounded-full"
                        >
                            <CameraIcon size={42}/>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Loading overlay */}
                {loading && (
                    <View className="absolute inset-0 bg-black/50 items-center justify-center z-50">
                        <ActivityIndicator size="large" color="#fff"/>
                        <Text className="text-white mt-2">Đang xử lý...</Text>
                    </View>
                )}
            </CameraView>

        )
    }

    return (
        <View className="flex-1">
            {renderView()}
            {/* Modal: Không nhận diện được */}
            <Modal visible={errorModal} animationType="fade" transparent>
                <View className="flex-1 justify-center items-center bg-black/50 p-6">
                    <View className="bg-white p-6 rounded-xl items-center">
                        <Text className="text-xl font-bold mb-2">Ôi, Faifo chưa nhận ra được rồi...</Text>
                        <Text className="text-gray-600 mb-4 text-center">
                            Bạn thử chụp lại từ khoảng cách gần hơn, hoặc chọn một góc khác xem sao nhé!
                        </Text>
                        <TouchableOpacity onPress={() => setErrorModal(false)}
                                          className="bg-[#F99F04] px-6 py-3 rounded-full">
                            <Text className="text-white font-semibold">Thử lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <ChatBotModal searchText={searchText} isVisible={showChatbot} onClose={() => setShowChatbot(false)}/>
        </View>
    );
}
