import { askGemini } from "../../ai/geminiService.js";
import { getEmails } from "../../emailService.js";
import type { CopilotResponse } from "../../copilotService.js";

export async function emailHandler(
  userPrompt: string = ""
): Promise<CopilotResponse> {
  const emails = getEmails();
  const query = userPrompt.toLowerCase();

  let relevantEmails = emails;

  // Filter by priority
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

  // Find specific email
  const matchedEmail = emails.find(
    (email) =>
      query.includes(email.subject.toLowerCase()) ||
      query.includes(email.sender.toLowerCase()) ||
      query.includes(email.category.toLowerCase())
  );

  // Draft reply request
  if (
    (query.includes("draft") || query.includes("reply")) &&
    matchedEmail
  ) {
    return {
      message: `# 📧 Draft Reply

**Subject:** Re: ${matchedEmail.subject}

${matchedEmail.draftReply}
`,
    };
  }

  const prompt = `
User Request:
${userPrompt || "Summarize my inbox"}

Emails:

${JSON.stringify(relevantEmails, null, 2)}
`;

  const reply = await askGemini({
    systemPrompt: `
You are an Executive AI Assistant for the Head of Digital Production at Volvo.

Your responsibilities are to:

- Prioritize emails by business impact.
- Highlight anything requiring executive attention.
- Explain why each important email matters.
- Recommend the next action.
- Ignore unnecessary detail.

If the user asks for:
- critical emails → show only critical emails
- high priority emails → show critical and high
- summary → summarize the inbox
- supplier escalation → focus only on that email

Return the response in GitHub Markdown.

Use this format:

# 📧 Executive Email Brief

## 🔴 Critical

...

## 🟠 High Priority

...

## 🟢 Other Emails

...

## ✅ Recommended Actions
`,
    userPrompt: prompt,
  });

  return {
    message: reply,
  };
}