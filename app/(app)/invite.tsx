import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ArrLeft from '@/assets/images/arrow-left.png';

export default function InviteFriendScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleSendInvite = () => {
        // TODO: logic gửi lời mời
        console.log('Send invite to:', email);
    };

    return (
        <View className="flex-1 bg-white px-4 pt-20">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={ArrLeft} className="h-6 w-6" />
                </TouchableOpacity>
                <Text className="text-xl font-semibold">Mời bạn bè</Text>
                <View className="w-6 h-6" />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100, flexDirection: 'column', alignItems: 'center', height: '100%' }}>
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
