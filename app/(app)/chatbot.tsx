import { useState } from 'react';
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
import { askChatGPT } from "@/service/api";
import ArrLeft from "@/assets/images/arrow-left.png";
import { useRouter } from "expo-router";


export default function ChatBotScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);



  const handleSend = async () => {
    if (!input.trim()) return;
    const newMsg = { role: 'user', content: input };
    setMessages([...messages, newMsg]);
    setInput('');
    setLoading(true);

    const reply = await askChatGPT(input);
    setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  const handleBack = () => {
    setTimeout(() => {
      router.push('/(tabs)/chat');
    }, 300);
  };

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
      >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 bg-white px-4">
            <TouchableOpacity onPress={handleBack}
                              className="top-[59px] w-full flex justify-center z-10">
              <Image source={ArrLeft} className="h-6 w-6 "/>
            </TouchableOpacity>
            <ScrollView
                className="flex-1 mb-4 pt-20"
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 100 }}
            >
              {messages.map((msg, i) => (
                  <View
                      key={i}
                      className={`mb-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <Text
                        className={`p-2 rounded-lg ${
                            msg.role === 'user' ? 'bg-yellow-100' : 'bg-gray-200'
                        }`}
                    >
                      {msg.content}
                    </Text>
                  </View>
              ))}
            </ScrollView>

            <View className="flex-row gap-2 pb-4">
              <TextInput
                  className="flex-1 border px-4 py-2 rounded-lg"
                  value={input}
                  onChangeText={setInput}
                  placeholder="Nhập câu hỏi..."
                  returnKeyType="send"
                  onSubmitEditing={handleSend}
              />
              <Pressable
                  onPress={handleSend}
                  className="bg-[#F99F04] px-4 py-2 rounded-lg justify-center"
              >
                <Text className="text-white font-bold">{loading ? '...' : 'Gửi'}</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}
