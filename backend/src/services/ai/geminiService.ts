import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing.");
}

const ai = new GoogleGenAI({
  apiKey,
});

interface GeminiRequest {
  systemPrompt: string;
  userPrompt: string;
}

export async function askGemini({
  systemPrompt,
  userPrompt,
}: GeminiRequest): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3,
      },
      contents: userPrompt,
    });

    return response.text ?? "No response generated.";
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return error.message;
    }

    return "Failed to connect to Gemini.";
  }
}