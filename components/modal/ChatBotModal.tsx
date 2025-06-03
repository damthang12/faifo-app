import React, {useEffect, useState} from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Modal from 'react-native-modal';
import ArrLeft from "@/assets/images/arrow-left.png";
import Avatar from "@/assets/images/Avatar.png";
import SendIcon from "@/assets/Icon/Send";
import {useRouter} from "expo-router";
import {askChatGPT} from "@/service/api";
import {Ionicons} from "@expo/vector-icons";

export default function ChatBotModal({
                                             isVisible,
                                             onClose,
    searchText
                                         }: {
    isVisible: boolean;
    onClose: () => void;
    searchText: string;
}) {
    const router = useRouter();
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAddPlan, setShowAddPlan] = useState(false);



    const handleSend = async () => {
        if (!input.trim()) return;
        const newMsg = {role: 'user', content: input};
        setMessages([...messages, newMsg]);
        setInput('');
        setLoading(true);

        // Kiểm tra từ khóa liên quan đến lịch trình
        const keywords = ['lịch trình', 'thời gian tham quan', 'plan', 'schedule'];
        const isPlanningQuestion = keywords.some((kw) =>
            input.toLowerCase().includes(kw.toLowerCase())
        );
        if (isPlanningQuestion) {
            setShowAddPlan(true);
        }

        const reply = await askChatGPT(input);
        setMessages((prev) => [...prev, {role: 'assistant', content: reply}]);
        setLoading(false);
    };

    useEffect(() => {
        if (searchText && searchText.trim()) {
            const newMsg = { role: 'user', content: searchText.trim() };
            setMessages([newMsg]);
            setInput('');
            setLoading(true);

            // Kiểm tra từ khóa lên kế hoạch
            const keywords = ['lịch trình', 'thời gian tham quan', 'plan', 'schedule'];
            const isPlanningQuestion = keywords.some((kw) =>
                searchText.toLowerCase().includes(kw.toLowerCase())
            );
            if (isPlanningQuestion) {
                setShowAddPlan(true);
            }

            askChatGPT(searchText).then((reply) => {
                setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
                setLoading(false);
            });
        } else {
            setMessages([]);
        }
    }, [searchText]);


    const handleBack = () => {
        onClose()
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={{justifyContent: 'flex-end', margin: 0}}
            avoidKeyboard
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className=" flex-col ỉtem-end justify-end h-full "
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className=" bg-white px-4 rounded-t-3xl h-[769px]">
                        <View className="w-full flex flex-row items-center gap-5 top-10 z-10">
                            {/* Back button */}
                            <TouchableOpacity onPress={() => handleBack()} className="border border-gray-900 rounded-full">
                                <Ionicons name="close" size={20} color="#000"/>
                            </TouchableOpacity>
                            <Text className="  text-xl font-semibold font-beVNSemibold"> Trợ lý ảo Faifan</Text>
                            <View className="h-6 w-6"/>
                        </View>
                        <View className='mt-14'>
                            <Text className="text-gray-600 font-beVN"> Bạn đã bắt đầu cuộc trò chuyện với Faifan</Text>

                        </View>


                        {/* Scrollable message area */}
                        <ScrollView
                            className="flex-1 mb-4 z-50"
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{paddingBottom: 80, paddingTop: 40}}
                        >


                            {messages.map((msg, i) => (
                                <View
                                    key={i}
                                    className={`mt-5 flex-row items-start gap-4  ${
                                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    {msg.role === 'assistant' && (
                                        <Image source={Avatar} className="w-8 h-8 rounded-full"/>
                                    )}

                                    <View className="max-w-[80%]">
                                        <Text
                                            className={`p-4 text-lg rounded-2xl ${
                                                msg.role === 'user' ? 'bg-[#F99F04]' : 'border border-gray-300'
                                            }`}
                                        >
                                            {msg.content}
                                        </Text>

                                        {showAddPlan && msg.role !== 'user' && (
                                            <TouchableOpacity
                                                onPress={() => alert('Thêm lịch trình')}
                                                className="bg-[#F99F04] py-3 px-4 rounded-2xl mt-3"
                                            >
                                                <Text className="text-white text-center font-semibold font-beVNSemibold">Thêm lịch
                                                    trình</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>

                                    {msg.role === 'user' && (
                                        <Image source={Avatar} className="w-8 h-8 rounded-full"/>
                                    )}
                                </View>
                            ))}
                        </ScrollView>

                        {/* Input */}
                        <View className="flex-row items-center gap-2 mb-6 border rounded-3xl h-[52px] px-4 mt-3">
                            <TextInput
                                className="flex-1"
                                value={input}
                                onChangeText={setInput}
                                placeholder="Hỏi Faifan bất kỳ điều gì về Hội An..."
                                returnKeyType="send"
                                onSubmitEditing={handleSend}
                            />
                            <Pressable onPress={handleSend} className="py-2 rounded-lg justify-center">
                                <SendIcon size={24}/>
                            </Pressable>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
}
