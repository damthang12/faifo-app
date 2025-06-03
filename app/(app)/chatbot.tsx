import {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard, TouchableOpacity, Image,
} from 'react-native';
import {askChatGPT} from "@/service/api";
import ArrLeft from "@/assets/images/arrow-left.png";
import {useLocalSearchParams, useRouter} from "expo-router";
import SendIcon from "@/assets/Icon/Send";
import Avatar from "@/assets/images/Avatar.png";


export default function ChatBotScreen() {
    const router = useRouter();
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAddPlan, setShowAddPlan] = useState(false);
    const {query} = useLocalSearchParams();



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
        if (query && typeof query === 'string' && query.trim()) {
            const newMsg = { role: 'user', content: query.trim() };
            setMessages([newMsg]);
            setInput('');
            setLoading(true);

            // Kiểm tra từ khóa lên kế hoạch
            const keywords = ['lịch trình', 'thời gian tham quan', 'plan', 'schedule'];
            const isPlanningQuestion = keywords.some((kw) =>
                query.toLowerCase().includes(kw.toLowerCase())
            );
            if (isPlanningQuestion) {
                setShowAddPlan(true);
            }

            askChatGPT(query).then((reply) => {
                setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
                setLoading(false);
            });
        } else {
            setMessages([]);
        }
    }, [query]);


    const handleBack = () => {
        setTimeout(() => {
            router.push('/(tabs)/chat');
        }, 300);
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 "
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1 bg-white px-4">
                    <View className="w-full flex flex-row items-center justify-between top-[59px] z-10">
                        {/* Back button */}
                        <TouchableOpacity onPress={handleBack} className="">
                            <Image source={ArrLeft} className="h-6 w-6"/>
                        </TouchableOpacity>
                        <Text className="  text-xl font-semibold font-beVNSemibold"> Trò chuyện với Faifan</Text>
                        <View className="h-6 w-6"/>
                    </View>


                    {/* Scrollable message area */}
                    <ScrollView
                        className="flex-1 mb-4 mt-20 z-50"
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{paddingBottom: 80, paddingTop: 40}}
                    >
                        <View className="flex flex-col items-center justify-center gap-4 px-4">
                            <Image source={Avatar} className="w-[120px] h-[120px] rounded-full"/>
                            <Text className="text-2xl font-semibold font-beVNSemibold">Chào Bạn!</Text>
                            <Text className="text-center text-gray-600">Mình là Faifan, trợ thủ du lịch của riêng
                                bạn</Text>
                        </View>

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


    );
}
