import { askGemini } from "../../services/ai/geminiService.js";

import type {
  IntentClassification,
} from "./intentTypes.js";

class IntentClassifier {

  async classify(
    userPrompt: string
  ): Promise<IntentClassification> {

    const reply = await askGemini({

      systemPrompt: `
You are an AI intent classifier.

Return ONLY valid JSON.

Example

{
  "intent":"scheduler",
  "confidence":97
}

Valid intents

scheduler
availability
meeting_edit
meeting_prep
meeting
calendar
email
brief
violin
general

Definitions

scheduler
User wants to CREATE or BOOK a meeting.

Examples

Schedule a meeting tomorrow
Book a review
Create a meeting
Arrange a meeting

availability
User wants to FIND free time.

Examples

Find a meeting slot
When am I free
Show available time tomorrow
Find availability next week
What is my next free slot

meeting_edit

Modify an existing meeting.

Examples

Move my meeting
Cancel the meeting
Reschedule
Change to Teams

Return JSON only.
`,

      userPrompt,

    });

    console.log("\n====== INTENT CLASSIFIER ======");
    console.log(reply);
    console.log("===============================\n");

    try {

      return JSON.parse(reply);

    } catch {

      return {
        intent: "general",
        confidence: 0,
      };

    }

  }

}

export const intentClassifier =
  new IntentClassifier();