import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {Ionicons} from '@expo/vector-icons';

export default function WriteReviewModal({
                                             isVisible,
                                             onClose,
                                             isNoti
                                         }: {
    isVisible: boolean;
    onClose: () => void;
    isNoti: boolean;
}) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleSubmit = () => {
    };
    if (isNoti) {
        return (
            <Modal
                isVisible={isVisible}
                onBackdropPress={onClose}
                style={{justifyContent: 'center', margin: 0}}
                className="px-4"
                avoidKeyboard
            >
                <View className="bg-white p-4 rounded-2xl max-h-[100%]">

                    <Text className="text-2xl font-semibold font-beVNSemibold my-4">Viết đánh giá</Text>
                    <View className="flex-col gap-1">
                        <Text className="font-medium text-gray-800 mb-2 font-beVN">Bạn chỉ có thể gửi đánh giá hoặc xếp
                            hạng địa điểm này nếu bạn đã đặt chỗ/trải nghiệm thông qua ứng dụng Faifo. Trước khi được
                            đăng tải, bài đánh giá sẽ được kiểm tra tự động để hợp lệ với quy định của Faifo.</Text>
                    </View>


                    <TouchableOpacity
                        onPress={onClose}
                        className="p-4 bg-[#F99F04] rounded-3xl w-full mt-5"
                    >
                        <Text className="text-center text-white font-semibold">Trở về</Text>
                    </TouchableOpacity>

                </View>

            </Modal>
        )
    }


    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={{justifyContent: 'flex-end', margin: 0}}
            avoidKeyboard
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="w-full"
            >
                <View className="bg-white p-4 rounded-t-2xl max-h-[100%]">
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 14}}
                    >
                        <View className="w-[90px] h-1 bg-gray-300 rounded-full self-center mb-3"/>
                        <Text className="text-2xl font-semibold font-beVNSemibold">Viết đánh giá</Text>
                        <View className="h-[1px] w-full bg-gray-300 my-10"/>

                        <View className="flex-col gap-1">
                            <Text className="font-medium text-gray-500 mb-2 font-beVN">Xếp hạng địa điểm này</Text>
                            <View className="flex-row gap-2 mb-5">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <TouchableOpacity key={i} onPress={() => setRating(i)}>
                                        <Ionicons
                                            name={i <= rating ? 'star' : 'star-outline'}
                                            size={28}
                                            color="#FBBF24"
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <TextInput
                            placeholder="Chia sẻ trải nghiệm của bạn..."
                            multiline
                            value={review}
                            onChangeText={setReview}
                            className="border rounded-[12px] border-gray-400 p-4 min-h-[120px] text-sm mb-4 text-gray-800"
                            textAlignVertical="top"
                        />

                        <View className="flex-row justify-between ">
                            <TouchableOpacity
                                onPress={onClose}
                                className="p-4 border border-[#F99F04] rounded-3xl w-[48%]"
                            >
                                <Text className="text-center text-[#F99F04] font-beVNSemibold font-semibold">Huỷ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSubmit}
                                className="bg-[#F99F04] p-4 rounded-3xl w-[48%]"
                            >
                                <Text className="text-center text-white font-semibold font-beVNSemibold">Gửi đánh giá</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}
