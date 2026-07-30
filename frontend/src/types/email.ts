export interface Email {
  id: string;

  sender: string;

  senderEmail: string;

  subject: string;

  preview: string;

  receivedAt: string;

  importance: "low" | "normal" | "high";

  isRead: boolean;

  requiresAction: boolean;
}