import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing.");
}

const ai = new GoogleGenAI({
  apiKey,
});

export interface GeminiRequest {
  systemPrompt: string;
  userPrompt: string;
}

export async function generateWithGemini({
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

    return response.text ?? "";
  } catch (error) {
    console.error("Gemini Error:", error);

    const message =
      error instanceof Error ? error.message : String(error);

    if (
      message.includes("RESOURCE_EXHAUSTED") ||
      message.includes("429")
    ) {
      return `# 🤖 AI Temporarily Unavailable

The daily Gemini API quota has been reached.

The following features continue to work normally:

- Executive Dashboard
- Calendar
- Meeting Scheduler
- Meeting Editing
- Email Viewer
- VIOLIN Updates

Please try AI-powered features again later.`;
    }

    if (
      message.includes("API_KEY") ||
      message.includes("PERMISSION_DENIED") ||
      message.includes("401")
    ) {
      return `# 🔑 AI Configuration Error

The AI service is currently unavailable because of an API configuration issue.`;
    }

    if (
      message.includes("timeout") ||
      message.includes("ETIMEDOUT")
    ) {
      return `# ⏱ AI Request Timed Out

The AI service took too long to respond.

Please try again in a moment.`;
    }

    return `# ⚠ AI Service Unavailable

An unexpected error occurred while contacting the AI service.

Please try again later.`;
  }
}
