import { meetingHandler } from "./handlers/meetingHandler.js";
import { emailHandler } from "./handlers/emailHandler.js";
import { calendarHandler } from "./handlers/calendarHandler.js";
import { violinHandler } from "./handlers/violinHandler.js";
import { briefHandler } from "./handlers/briefHandler.js";
import { generalHandler } from "./handlers/generalHandler.js";
import { meetingPrepHandler } from "./handlers/meetingPrepHandler.js";
import { schedulerHandler } from "./handlers/schedulerHandler.js";


import type { CopilotResponse } from "../copilotService.js";

export async function intentRouter(
  question: string
): Promise<CopilotResponse> {
  const q = question.toLowerCase();

  if (
  q.includes("prepare") ||
  q.includes("meeting prep") ||
  q.includes("brief me") ||
  q.includes("next meeting") ||
  q.includes("meeting preparation")
) {
    return await meetingPrepHandler(question);
  }
  if (
  q.includes("schedule") ||
  q.includes("book") ||
  q.includes("create meeting") ||
  q.includes("find slot")
) {
  return await schedulerHandler(question);
}

  if (q.includes("meeting")) {
    return meetingHandler();
  }

  if (q.includes("email")) {
    return await emailHandler(question);
  }

  if (q.includes("calendar")) {
    return calendarHandler();
  }

  if (q.includes("violin")) {
    return violinHandler();
  }

  if (
  q.includes("executive brief") ||
  q.includes("morning brief") ||
  q.includes("daily brief") ||
  q === "brief" ||
  q.includes("priority")
) {
  return await briefHandler();
}

  return generalHandler();
}