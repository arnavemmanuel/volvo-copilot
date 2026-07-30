import { createContext } from "react";

export type WorkspaceView =
  | "brief"
  | "meeting"
  | "emails"
  | "operations"
  | "chat"
  | "loading";

export interface CopilotAction {
  id: string;

  entity:
    | "email"
    | "meeting"
    | "document"
    | "violin";

  title: string;

  subtitle: string;

  route: string;
}

export interface ChatMessage {
  id: string;

  role: "user" | "assistant";

  content: string;

  timestamp: Date;

  actions?: CopilotAction[];
}

export interface CopilotContextType {
  isOpen: boolean;

  loading: boolean;

  messages: ChatMessage[];

  workspaceView: WorkspaceView;

  setWorkspaceView: (
    view: WorkspaceView
  ) => void;

  openCopilot: () => void;

  closeCopilot: () => void;

  toggleCopilot: () => void;

  sendPrompt: (
    prompt: string
  ) => Promise<void>;
}

export const CopilotContext =
  createContext<
    CopilotContextType | undefined
  >(undefined);