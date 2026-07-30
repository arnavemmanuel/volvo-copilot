import { meetingHandler } from "./handlers/meetingHandler.js";
import { meetingEditHandler } from "./handlers/meetingEditHandler.js";
import { emailHandler } from "./handlers/emailHandler.js";
import { calendarHandler } from "./handlers/calendarHandler.js";
import { violinHandler } from "./handlers/violinHandler.js";
import { briefHandler } from "./handlers/briefHandler.js";
import { generalHandler } from "./handlers/generalHandler.js";
import { meetingPrepHandler } from "./handlers/meetingPrepHandler.js";
import { schedulerHandler } from "./handlers/schedulerHandler.js";

import { intentClassifier } from "../../ai/intent/intentClassifier.js";
import { orchestrator } from "../orchestrator/orchestrator.js";

import type { CopilotResponse } from "../copilotService.js";

export async function intentRouter(
  question: string
): Promise<CopilotResponse> {

  const q = question.toLowerCase();

  // =====================================================
  // STEP 1 - Conversation Orchestrator
  // =====================================================

  const orchestration = orchestrator.decide(question);

  if (orchestration.useContext) {

    console.log(
      `Using conversation context (${orchestration.lastIntent})`
    );

    switch (orchestration.lastIntent) {

      case "scheduler":
        return await schedulerHandler(question);

      case "availability":
        return await calendarHandler(question);

      case "calendar":
        return await calendarHandler(question);

      case "email":
        return await emailHandler(question);

      case "meeting_prep":
        return await meetingPrepHandler(question);

      case "meeting":
        return await meetingHandler(question);

      case "meeting_edit":
        return await meetingEditHandler(question);

      case "brief":
        return await briefHandler();

      case "violin":
        return await violinHandler(question);

    }

  }

  // =====================================================
  // STEP 2 - AI Intent Classification
  // =====================================================

  try {

    const aiIntent =
      await intentClassifier.classify(question);

    console.log("AI Intent:", aiIntent);

    if (aiIntent?.intent) {

      switch (aiIntent.intent) {

        case "scheduler":
          return await schedulerHandler(question);

        case "availability":
          return await calendarHandler(question);

        case "meeting_prep":
          return await meetingPrepHandler(question);

        case "meeting":
          return await meetingHandler(question);

        case "meeting_edit":
          return await meetingEditHandler(question);

        case "calendar":
          return await calendarHandler(question);

        case "email":
          return await emailHandler(question);

        case "brief":
          return await briefHandler();

        case "violin":
          return await violinHandler(question);

      }

    }

  } catch (error) {

    console.log(
      "AI intent classification unavailable. Falling back to rule router."
    );

  }

 // =====================================================
// STEP 3 - Rule-Based Fallback
// =====================================================

// NEW meeting requests FIRST

if (
  q.includes("availability") ||
  q.includes("available") ||
  q.includes("free slot") ||
  q.includes("find slot") ||
  q.includes("find a slot") ||
  q.includes("when am i free") ||
  q.includes("open slot") ||
  q.includes("show availability")
) {
  return await calendarHandler(question);
}

if (
  q.includes("schedule") ||
  q.includes("book") ||
  q.includes("set up") ||
  q.includes("setup") ||
  q.includes("arrange") ||
  q.includes("create")
) {
  return await schedulerHandler(question);
}

// Meeting edits SECOND

if (
  q.includes("move") ||
  q.includes("reschedule") ||
  q.includes("postpone") ||
  q.includes("cancel") ||
  q.includes("change") ||
  q.includes("teams") ||
  q.includes("conference room")
) {
  return await meetingEditHandler(question);
}
if (
  q.startsWith("schedule") ||
  q.startsWith("book") ||
  q.startsWith("create") ||
  q.startsWith("arrange") ||
  q.startsWith("set up") ||
  q.startsWith("setup")
) {
  return await schedulerHandler(question);
}
return await generalHandler();
}