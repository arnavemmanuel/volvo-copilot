export type CopilotIntent =
  | "scheduler"
  | "availability"
  | "meeting_edit"
  | "meeting_prep"
  | "meeting"
  | "calendar"
  | "email"
  | "brief"
  | "violin"
  | "general";

export interface IntentClassification {
  intent: CopilotIntent;
  confidence: number;
}