import { getCalendarSummary } from "../../calendarService.js";
import { getMeetings } from "../../meetingService.js";
import { getEmails } from "../../emailService.js";
import { getViolinNews } from "../../violinService.js";

import { buildExecutiveContext } from "./executiveContextBuilder.js";

export function buildMorningBriefContext(): string {
  const calendar = getCalendarSummary();
  const meetings = getMeetings();
  const emails = getEmails();
  const violin = getViolinNews();

  const todaysMeetings = meetings.slice(0, 3);

  const criticalEmails = emails
    .filter(
      (email) =>
        email.priority === "Critical" ||
        email.priority === "High"
    )
    .slice(0, 3);

  const criticalViolin = violin.news
    .filter(
      (item) =>
        item.priority === "Critical" ||
        item.priority === "High"
    )
    .slice(0, 3);

  const executiveContext = buildExecutiveContext({
    dashboard: calendar,
    emails: criticalEmails,
    violin: criticalViolin,
  });

  return `
========== EXECUTIVE MORNING BRIEF CONTEXT ==========

TODAY'S MEETINGS

${todaysMeetings
  .map(
    (meeting) => `
Title: ${meeting.title}
Time: ${meeting.time}
Duration: ${meeting.duration}
Location: ${meeting.location}
Priority: ${meeting.priority}
Status: ${meeting.status}
`
  )
  .join("\n")}

${executiveContext}

====================================================

Use ONLY the information above when generating the executive morning brief.
`;
}