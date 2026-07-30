import { useState } from "react";
import {
  ArrowUp,
  Paperclip,
  Mic,
  Sparkles,
} from "lucide-react";

import { useCopilot } from "../../../hooks/useCopilot";

interface ChatInputProps {
  initialPrompt?: string;
}

export default function ChatInput({
  initialPrompt = "",
}: ChatInputProps) {
  const { sendPrompt, loading } = useCopilot();

  const [prompt, setPrompt] = useState(initialPrompt);

  const handleSubmit = async () => {
    const value = prompt.trim();

    if (!value || loading) return;

    try {
      await sendPrompt(value);
      setPrompt("");
    } catch (error) {
      console.error("Failed to send prompt:", error);
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-3">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all duration-200 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-md">

        <Sparkles className="h-5 w-5 shrink-0 text-blue-600" />

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={1}
          placeholder="Ask Executive Copilot..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="
            max-h-24
            flex-1
            resize-none
            overflow-y-auto
            bg-transparent
            text-[15px]
            leading-6
            text-slate-800
            outline-none
            placeholder:text-slate-400
          "
        />

        <button
          type="button"
          onClick={() => alert("File attachments coming soon.")}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-200"
          title="Attach file (Coming Soon)"
        >
          <Paperclip className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => alert("Voice input coming soon.")}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-200"
          title="Voice input (Coming Soon)"
        >
          <Mic className="h-4 w-4" />
        </button>

        <button
          onClick={handleSubmit}
          disabled={!prompt.trim() || loading}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-blue-600
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:bg-slate-300
          "
        >
          <ArrowUp className="h-4 w-4" />
        </button>

      </div>
    </footer>
  );
}