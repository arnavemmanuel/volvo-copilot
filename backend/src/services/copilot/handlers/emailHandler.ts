import { askGemini } from "../../ai/geminiService.js";
import { shouldUseAI } from "../../ai/decision/shouldUseAI.js";
import { getEmails } from "../../emailService.js";
import type { CopilotResponse } from "../../copilotService.js";

export async function emailHandler(
  userPrompt: string = ""
): Promise<CopilotResponse> {
  const emails = getEmails();
  const query = userPrompt.toLowerCase();

  let relevantEmails = emails;

  // ----------------------------------
  // Priority Filters
  // ----------------------------------

  if (query.includes("critical")) {
    relevantEmails = emails.filter(
      (email) => email.priority === "Critical"
    );
  } else if (query.includes("high")) {
    relevantEmails = emails.filter(
      (email) =>
        email.priority === "Critical" ||
        email.priority === "High"
    );
  }

  // ----------------------------------
  // Find Matching Email
  // ----------------------------------

  const matchedEmail = emails.find(
    (email) =>
      query.includes(email.subject.toLowerCase()) ||
      query.includes(email.sender.toLowerCase()) ||
      query.includes(email.category.toLowerCase())
  );

  // ----------------------------------
  // Draft Reply
  // ----------------------------------

  if (
    (query.includes("draft") ||
      query.includes("reply")) &&
    matchedEmail
  ) {
    return {
      message: `# 📧 Draft Reply

**Subject:** Re: ${matchedEmail.subject}

${matchedEmail.draftReply}
`,
      actions: [
        {
          id: matchedEmail.id ?? "email-draft",
          entity: "email",
          title: matchedEmail.subject,
          subtitle: `Reply to ${matchedEmail.sender}`,
          route: "/emails",
        },
      ],
    };
  }

  // ----------------------------------
  // Email Summary
  // ----------------------------------

  if (
    (query.includes("summarize") ||
      query.includes("summary")) &&
    matchedEmail
  ) {
    return {
      message: `# 📧 Email Summary

## ${matchedEmail.subject}

**From:** ${matchedEmail.sender}

**Priority:** ${matchedEmail.priority}

**Received:** ${matchedEmail.received}

${matchedEmail.summary}
`,
      actions: [
        {
          id: matchedEmail.id ?? "email-summary",
          entity: "email",
          title: matchedEmail.subject,
          subtitle: `${matchedEmail.priority} • ${matchedEmail.sender}`,
          route: "/emails",
        },
      ],
    };
  }

  // ----------------------------------
  // Inbox Retrieval (No AI Needed)
  // ----------------------------------

  if (
    query.includes("critical") ||
    query.includes("high") ||
    query.includes("show emails") ||
    query.includes("list emails") ||
    query.includes("show inbox") ||
    query.includes("inbox") ||
    query.includes("emails")
  ) {
    return {
      message: `# 📧 Inbox

${relevantEmails
  .map(
    (email) => `
## ${email.subject}

**From:** ${email.sender}

**Priority:** ${email.priority}

**Received:** ${email.received}

${email.summary}

---
`
  )
  .join("\n")}
`,
      actions: relevantEmails.slice(0, 4).map((email, index) => ({
        id: email.id ?? `email-${index}`,
        entity: "email",
        title: email.subject,
        subtitle: `${email.priority} • ${email.sender}`,
        route: "/emails",
      })),
    };
  }

  // ----------------------------------
  // AI Decision
  // ----------------------------------

  const decision = shouldUseAI(userPrompt);

  if (!decision.useAI) {
    return {
      message: `# 📧 Inbox

${relevantEmails
  .map(
    (email) => `
## ${email.subject}

**From:** ${email.sender}

**Priority:** ${email.priority}

**Received:** ${email.received}

${email.summary}

---
`
  )
  .join("\n")}
`,
      actions: relevantEmails.slice(0, 4).map((email, index) => ({
        id: email.id ?? `email-${index}`,
        entity: "email",
        title: email.subject,
        subtitle: `${email.priority} • ${email.sender}`,
        route: "/emails",
      })),
    };
  }

  // ----------------------------------
  // AI Executive Brief
  // ----------------------------------

  const prompt = `
User Request

${userPrompt}

Emails

${JSON.stringify(relevantEmails, null, 2)}
`;

  const reply = await askGemini({
    systemPrompt: `
You are the Executive AI Assistant for the Head of Digital Production.

Your responsibilities:

- Prioritize emails
- Identify executive risks
- Recommend actions
- Summarize executive communications
- Keep responses concise

Return GitHub Markdown.

Sections:

# 📧 Executive Email Brief

## 🔴 Critical

## 🟠 High Priority

## 🟢 Other Emails

## ✅ Recommended Actions
`,
    userPrompt: prompt,
  });

  return {
    message: reply,
    actions: relevantEmails.slice(0, 4).map((email, index) => ({
      id: email.id ?? `email-${index}`,
      entity: "email",
      title: email.subject,
      subtitle: `${email.priority} • ${email.sender}`,
      route: "/emails",
    })),
  };
}