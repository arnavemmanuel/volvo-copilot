export interface ConversationContext {
  lastIntent?: string;

  lastMeeting?: {
    id?: number;
    title?: string;
    durationMinutes?: number;
    attendees?: string[];
    preferredDate?: string;
    preferredTime?: string;
    locationType?: string;
  };

  lastMeetingTitle?: string;

  lastEmail?: {
    subject?: string;
    sender?: string;
    priority?: string;
  };

  lastTopic?: string;
}

const conversationContext: ConversationContext = {};

export function getConversationContext(): ConversationContext {
  return conversationContext;
}

export function updateConversationContext(
  updates: Partial<ConversationContext>
): void {
  Object.assign(conversationContext, updates);
}

export function clearConversationContext(): void {
  for (const key of Object.keys(conversationContext)) {
    delete (conversationContext as Record<string, unknown>)[key];
  }
}