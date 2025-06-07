import React, {useState} from 'react';
import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import ArrowLeftIcon from "@/assets/Icon/ArrowLeft";
import {useToast} from "@/components/Toast";

export default function InviteFriendScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const {showToast} = useToast()
    const handleSendInvite = () => {
        // TODO: logic gửi lời mời
        console.log('Send invite to:', email);
        showToast('Mời bạn bè thành công! Họ sẽ nhận được thông tin và có thể tham gia vào hành trình cùng bạn. Cùng Faifan tạo ra một chuyến đi tuyệt vời nhé!', 'success')

    };

    return (
        <View className="flex-1 bg-white px-4 pt-20">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeftIcon size={24} color='#000'/>
                </TouchableOpacity>
                <Text className="text-xl font-semibold font-beVNSemibold">Mời bạn bè</Text>
                <View className="w-6 h-6"/>
            </View>

            <ScrollView contentContainerStyle={{
                paddingBottom: 100,
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%'
            }}>
                <Text className="text-[#8B3A00] text-center max-w-[300px] text-2xl font-semibold font-phudu mt-[80px]">
                    Mời bạn bè tham gia Faifo để nhận nhiều đặc quyền
                </Text>

                <Image
                    source={require('@/assets/images/Mascot1.png')}
                    className="w-[283px] h-[257px] rounded-full my-10"
                />
                <Text className="text-gray-700 font-beVN text-center text-base mb-8">
                    Chuyến đi của bạn sẽ thêm phần thú vị nếu có bạn bè cùng tham gia!
                </Text>


                {/* Input email */}
                <TextInput
                    placeholder="example@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    className="border border-gray-300 rounded-xl w-full px-4 py-3 mb-6"
                />

                <TouchableOpacity
                    onPress={handleSendInvite}
                    className="bg-[#F99F04] py-4 rounded-full items-center w-full absolute bottom-10"
                >
                    <Text className="text-white text-lg font-bold font-beVN">Gửi lời mời</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
