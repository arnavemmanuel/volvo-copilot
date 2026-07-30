import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  CopilotContext,
  type ChatMessage,
  type WorkspaceView,
} from "../context/CopilotContext";

import { sendCopilotMessage } from "../services/copilotService";

interface CopilotProviderProps {
  children: ReactNode;
}

export default function CopilotProvider({
  children,
}: CopilotProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [workspaceView, setWorkspaceView] =
    useState<WorkspaceView>("brief");

  const openCopilot = () => setIsOpen(true);

  const closeCopilot = () => setIsOpen(false);

  const toggleCopilot = () =>
    setIsOpen((prev) => !prev);

  const sendPrompt = async (prompt: string) => {
    if (!prompt.trim()) return;

    setIsOpen(true);

    // Automatically switch to chat whenever a prompt is sent
    setWorkspaceView("chat");

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const response = await sendCopilotMessage(prompt);

      const assistantMessage: ChatMessage = {
  id: crypto.randomUUID(),
  role: "assistant",
  content: response.message,
  timestamp: new Date(),
  actions: response.actions,
};

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I'm having trouble connecting to the Executive Copilot service. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      isOpen,
      loading,
      messages,

      workspaceView,
      setWorkspaceView,

      openCopilot,
      closeCopilot,
      toggleCopilot,
      sendPrompt,
    }),
    [
      isOpen,
      loading,
      messages,
      workspaceView,
    ]
  );

  return (
    <CopilotContext.Provider value={value}>
      {children}
    </CopilotContext.Provider>
  );
}