
import { GoogleGenAI, Type } from "@google/genai";
import { FortuneResult } from "./types.ts";

export const generateDailyFortune = async (): Promise<FortuneResult> => {
  // 遵循 SDK 规范：直接从 process.env 获取 API 密钥
  // 注意：在浏览器环境中，这依赖于 index.html 中定义的全局 window.process 垫片
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: '请帮我生成今日运势。要求：1.从[财运, 事业运, 爱情运, 健康运, 学业运]中随机选择2-3个维度。2.包含整体运势等级、总结、幸运色/数字、温暖建议。3.指定一个吉祥物反应(happy, excited, wink, love)。',
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          luckLevel: { type: Type.STRING, description: '如：大吉、超旺' },
          summary: { type: Type.STRING },
          luckyColor: { type: Type.STRING },
          luckyNumber: { type: Type.STRING },
          categories: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING, description: '如：财运' },
                detail: { type: Type.STRING, description: '一小段具体的预测' },
                icon: { type: Type.STRING, description: '一个对应的Emoji' }
              },
              required: ["category", "detail", "icon"]
            }
          },
          advice: { type: Type.STRING },
          emoji: { type: Type.STRING },
          mascotReaction: { type: Type.STRING, enum: ['happy', 'excited', 'wink', 'love'] }
        },
        required: ["luckLevel", "summary", "luckyColor", "luckyNumber", "categories", "advice", "emoji", "mascotReaction"]
      },
      systemInstruction: "你是一个超级可爱、正能量的占卜精灵。你的语言风格软萌，充满鼓励。你生成的预测必须包含2-3个具体的维度细分。",
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text);
};
