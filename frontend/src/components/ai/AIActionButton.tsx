import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { useCopilot } from "../../hooks/useCopilot";

type AIActionButtonProps = {
  prompt: string;
  children: ReactNode;
  className?: string;
};

export default function AIActionButton({
  prompt,
  children,
  className = "",
}: AIActionButtonProps) {
  const { sendPrompt } = useCopilot();

  return (
    <button
      onClick={() => sendPrompt(prompt)}
      className={`inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 active:scale-95 ${className}`}
    >
      <Sparkles className="h-4 w-4" />
      {children}
    </button>
  );
}