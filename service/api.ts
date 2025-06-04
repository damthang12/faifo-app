import axios from 'axios';

import Constants from 'expo-constants';

const apiOpenRouterKey = Constants.expoConfig?.extra?.openrouterKey;
const apiGeminiKey = Constants.expoConfig?.extra?.askgeminiKey;


export async function askChatGPT(message: string): Promise<string> {
    try {
        const res = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'openai/gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content:
                            'Bạn là trợ lý du lịch thông minh Faifan. Chỉ cung cấp thông tin liên quan đến Hội An, Việt Nam. Nếu người dùng hỏi về khu vực ngoài Hội An, vui lòng lịch sự từ chối và đề nghị đặt câu hỏi khác liên quan đến Hội An.',
                    },
                    {
                        role: 'user',
                        content: message,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${apiOpenRouterKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return res.data.choices[0].message.content.trim();
    } catch (err: any) {
        console.error('❌ OpenAI Error:', err.response?.data || err.message);
        return 'Đã xảy ra lỗi khi kết nối đến trợ lý ảo.';
    }
}


// src/utils/geocode.ts
export async function geocodeAddress(address: string) {
    try {
        const cleanAddress = address.replace(/Á Đông Silk/i, '').trim();
        const fullAddress = `${cleanAddress}, Hội An, Quảng Nam, Việt Nam`;
        console.log('📍 Full address:', fullAddress);

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`
        );
        const data = await response.json();

        console.log('📍 Kết quả trả về:', data);

        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
            };
        }
        return null;
    } catch (error) {
        console.error('❌ Geocode error:', error);
        return null;
    }
}


export async function askGeminiWithImage(imageBase64: string, prompt: string) {
    try {
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiGeminiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: prompt },
                                {
                                    inline_data: {
                                        mime_type: 'image/jpeg',
                                        data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
                                    },
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        const data = await res.json();

        return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi từ Gemini.';
    } catch (err) {
        console.error('❌ Gemini Error:', err);
        return 'Lỗi khi gửi ảnh đến Gemini.';
    }
}







