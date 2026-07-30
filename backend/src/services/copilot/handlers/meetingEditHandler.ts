import {
  updateMeeting,
  cancelMeeting,
} from "../../calendarService.js";

import {
  getConversationContext,
  updateConversationContext,
} from "../context/conversationContext.js";

import type { CopilotResponse } from "../../copilotService.js";


export async function meetingEditHandler(
  userPrompt: string
): Promise<CopilotResponse> {

  const context = getConversationContext();
  console.log("\n========== MEETING EDIT ==========");
console.log("Prompt:", userPrompt);
console.log("Context:", JSON.stringify(context, null, 2));
console.log("==================================\n");

  if (!context.lastMeeting) {
    return {
      message:
        "I couldn't determine which meeting you're referring to.",
    };
  }

  const meeting = context.lastMeeting;

  const updates: any = {};

  const query = userPrompt.toLowerCase();

  // Move meeting

  const dayMatch = query.match(
    /(monday|tuesday|wednesday|thursday|friday|saturday|sunday|today|tomorrow)/i
  );

  if (dayMatch) {
    updates.preferredDate = dayMatch[0];
  }

  // Change time

  const timeMatch = query.match(/\d{1,2}:\d{2}/);

  if (timeMatch) {
    updates.preferredTime = timeMatch[0];
  }

  // Teams / Room

  if (query.includes("teams")) {
    updates.locationType = "Teams";
  }

  if (
    query.includes("conference") ||
    query.includes("room")
  ) {
    updates.locationType = "Conference Room";
  }

  // Duration

  const durationMatch = query.match(/(\d+)\s*(minute|min)/);

  if (durationMatch) {
    updates.durationMinutes = Number(durationMatch[1]);
  }

  // Cancel

  if (query.includes("cancel")) {

    cancelMeeting(meeting.id!);

    return {
      message: `✅ "${meeting.title}" has been cancelled.`,
    };

  }

  const updated = updateMeeting(meeting.id!, updates);

  if (!updated) {
    return {
      message: "Unable to update meeting.",
    };
  }

  updateConversationContext({
    lastMeeting: updated,
  });

  return {
    message: `# ✅ Meeting Updated

**Title:** ${updated.title}

**Date:** ${updated.preferredDate}

**Time:** ${updated.preferredTime}

**Duration:** ${updated.durationMinutes} min

**Location:** ${updated.locationType}
`,
  };

}