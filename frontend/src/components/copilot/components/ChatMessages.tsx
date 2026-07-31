import { useEffect, useRef } from "react";
import {
  Bot,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { useCopilot } from "../../../hooks/useCopilot";
import MessageBubble from "./MessageBubble";
import SuggestedPrompts from "./SuggestedPrompts";

export default function ChatMessages() {
  const { messages, loading, sendPrompt } = useCopilot();
  console.log("MESSAGES:", messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center px-8 py-8">

        <div className="w-full max-w-2xl">

          <div className="text-center">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 shadow-xl shadow-blue-500/20">

              <Bot className="h-10 w-10 text-white" />

            </div>

            <h2 className="text-2xl font-semibold text-slate-900">
              Welcome to Copilot
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              I can prepare executive briefs, summarize Outlook emails,
              review VIOLIN operational updates, optimize your calendar,
              prepare meetings and answer Digital Production questions.
            </p>

            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500">

              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                AI Powered
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Enterprise Ready
              </div>

            </div>

          </div>

          <SuggestedPrompts
            onPromptClick={(prompt) => sendPrompt(prompt)}
          />

        </div>

      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-6">

      <div className="mx-auto max-w-3xl space-y-6">

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

        {loading && (
          <div className="flex gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">

              <Bot className="h-5 w-5 text-white" />

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

              <div className="mb-3 flex items-center gap-2">

                <Sparkles className="h-4 w-4 animate-pulse text-blue-600" />

                <span className="text-sm font-semibold text-slate-700">
                 Copilot is thinking...
                </span>

              </div>

              <div className="flex gap-2">

                <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600" />

                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
                  style={{ animationDelay: "0.15s" }}
                />

                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
                  style={{ animationDelay: "0.3s" }}
                />

              </div>

            </div>

          </div>
        )}

        <div ref={bottomRef} />

      </div>

    </div>
  );
}