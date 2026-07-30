import type { ChatMessage } from "../../../context/CopilotContext";

import {
  Bot,
  User,
  Sparkles,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github.css";

import ActionCard from "./ActionCard";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({
  message,
}: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 shadow-md">
          <Bot className="h-5 w-5 text-white" />
        </div>
      )}

      <div
        className={`max-w-[88%] overflow-hidden rounded-2xl border shadow-sm ${
          isUser
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-slate-200 bg-white"
        }`}
      >
        {!isUser && (
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-slate-900">
                Copilot
              </span>
            </div>

            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700">
              AI
            </span>
          </div>
        )}

        <div
          className={`px-5 py-5 ${
            isUser ? "text-white" : "text-slate-800"
          }`}
        >
          {isUser ? (
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
                <User className="h-4 w-4" />
              </div>

              <p className="whitespace-pre-wrap leading-7">
                {message.content}
              </p>
            </div>
          ) : (
            <>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="mb-5 mt-2 border-b border-slate-200 pb-2 text-3xl font-bold text-slate-900">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="mb-4 mt-8 border-b border-slate-200 pb-2 text-2xl font-bold text-slate-900">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="mb-3 mt-6 text-xl font-semibold text-slate-900">
                      {children}
                    </h3>
                  ),

                  p: ({ children }) => (
                    <p className="mb-4 leading-8 text-slate-700">
                      {children}
                    </p>
                  ),

                  ul: ({ children }) => (
                    <ul className="mb-5 ml-6 list-disc space-y-2">
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="mb-5 ml-6 list-decimal space-y-2">
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
                    <li className="leading-7">
                      {children}
                    </li>
                  ),

                  strong: ({ children }) => (
                    <strong className="font-bold text-slate-900">
                      {children}
                    </strong>
                  ),

                  blockquote: ({ children }) => (
                    <blockquote className="my-5 border-l-4 border-blue-500 bg-blue-50 px-4 py-3 italic">
                      {children}
                    </blockquote>
                  ),

                  hr: () => (
                    <hr className="my-8 border-slate-200" />
                  ),

                  code({ children, ...props }) {
                    return (
                      <code
                        className="rounded bg-slate-100 px-1 py-0.5 text-sm"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>

              {message.actions &&
                message.actions.length > 0 && (
                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Related Items
                    </h3>

                    <div className="space-y-3">
                      {message.actions.map((action) => (
                        <ActionCard
                          key={action.id}
                          action={action}
                        />
                      ))}
                    </div>
                  </div>
                )}
            </>
          )}
        </div>
      </div>

      {isUser && (
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 shadow-md">
          <User className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
}