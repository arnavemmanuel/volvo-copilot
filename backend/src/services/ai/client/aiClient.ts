import { generateWithGemini } from "../providers/geminiProvider.js";

export interface AIRequest {
  systemPrompt: string;
  userPrompt: string;
}

export interface AIResponse {
  success: boolean;
  text?: string;
  error?: string;
  provider: "gemini";
}

class AIClient {
  async generate({
    systemPrompt,
    userPrompt,
  }: AIRequest): Promise<AIResponse> {
    try {
      const text = await generateWithGemini({
        systemPrompt,
        userPrompt,
      });

      return {
        success: true,
        text,
        provider: "gemini",
      };
    } catch (error) {
      return {
        success: false,
        provider: "gemini",
        error:
          error instanceof Error
            ? error.message
            : "Unknown AI error.",
      };
    }
  }
}

export const aiClient = new AIClient();