import axios from 'axios';

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
                            'Bạn là trợ lý du lịch thông minh. Chỉ cung cấp thông tin liên quan đến Hội An, Việt Nam. Nếu người dùng hỏi về khu vực ngoài Hội An, vui lòng lịch sự từ chối và đề nghị đặt câu hỏi khác liên quan đến Hội An.',
                    },
                    {
                        role: 'user',
                        content: message,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer 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`,
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
//
// const OCR_API_KEY = 'K88174659988957';
//
// export async function extractTextFromImage(base64Image: string) {
//     try {
//         const formData = new FormData();
//         formData.append('apikey', OCR_API_KEY);
//         formData.append('language', 'vietnamese');
//         formData.append('language', 'chinese_tra');
//         formData.append('language', 'chinese_simplified');
//         formData.append('language', 'eng');
//         formData.append('base64Image', `data:image/jpg;base64,${base64Image}`);
//
//         const res = await fetch('https://api.ocr.space/parse/image', {
//             method: 'POST',
//             body: formData,
//         });
//
//         const data = await res.json();
//         console.log('📸 OCR Result:', data);
//
//         if (data?.ParsedResults?.[0]?.ParsedText) {
//             return data.ParsedResults[0].ParsedText;
//         }
//
//         throw new Error(data?.ErrorMessage || 'Không nhận dạng được văn bản.');
//     } catch (error) {
//         console.error('❌ OCR Error:', error);
//         return '';
//     }
// }
//
//
// export async function translateText(text: string, fromLang = 'vi', toLang = 'en') {
//     try {
//         const res = await fetch('https://libretranslate.de/translate', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 q: text,
//                 source: fromLang,
//                 target: toLang,
//                 format: 'text',
//             }),
//         });
//
//         const data = await res.json();
//         console.log('🌐 Translated result:', data);
//         return data.translatedText;
//     } catch (error) {
//         console.error('❌ Translate error:', error);
//         return 'Không thể dịch.';
//     }
// }
//
//
// export async function handleOCRandTranslate(base64Image: string) {
//     const extracted = await extractTextFromImage(base64Image);
//     console.log('OCR:', extracted);
//
//     if (extracted.trim()) {
//         const translated = await translateText(extracted);
//         console.log('Translated:', translated);
//         return translated;
//     }
//
//     return 'Không nhận dạng được chữ.';
// }


export async function askImageToGPT(imageBase64: string, userPrompt: string) {
    try {
        const res = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'openai/gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content:
                            'Bạn là hướng dẫn viên du lịch thông minh. Chỉ tập trung nhận diện các địa danh, biển hiệu, hoặc thông tin văn hoá tại Hội An, Việt Nam.',
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: userPrompt,
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: imageBase64,
                                },
                            },
                        ],
                    },
                ],
            },
            {
                headers: {
                    Authorization: 'Bearer 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',
                    'Content-Type': 'application/json',
                },
            }
        );

        return res.data.choices[0].message.content.trim();
    } catch (error: any) {
        console.error('❌ GPT Image Error:', error?.response?.data || error.message);
        return 'Lỗi khi gửi ảnh lên GPT.';
    }
}


export async function askGeminiWithImage(imageBase64: string, prompt: string) {
    try {
        const res = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCa4wN2x49Q1xsjyAeWHdeDCOJ5yY5gBPQ',
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







