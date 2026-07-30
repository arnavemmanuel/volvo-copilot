import { aiClient } from "./client/aiClient.js";

interface GeminiRequest {
  systemPrompt: string;
  userPrompt: string;
}

export async function askGemini({
  systemPrompt,
  userPrompt,
}: GeminiRequest): Promise<string> {
  const result = await aiClient.generate({
    systemPrompt,
    userPrompt,
  });

  if (!result.success) {
    return result.error ?? "AI request failed.";
  }

  return result.text ?? "";
}