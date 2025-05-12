import axios from 'axios';

export async function askChatGPT(message: string): Promise<string> {
  try {
    const res = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        },
        {
          headers: {
            Authorization: `Bear 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`,
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

