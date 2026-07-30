export function getConversationTitle(prompt: string): string {
  const text = prompt.toLowerCase();

  if (text.includes("meeting")) {
    return "Meeting Preparation";
  }

  if (text.includes("email")) {
    return "Priority Emails";
  }

  if (text.includes("calendar")) {
    return "Calendar Review";
  }

  if (
    text.includes("production") ||
    text.includes("violin") ||
    text.includes("operations")
  ) {
    return "Operations Summary";
  }

  if (
    text.includes("executive") ||
    text.includes("brief")
  ) {
    return "Executive Brief";
  }

  return prompt.length > 35
    ? prompt.substring(0, 35) + "..."
    : prompt;
}