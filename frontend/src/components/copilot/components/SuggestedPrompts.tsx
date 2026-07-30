import {
  CalendarDays,
  ClipboardList,
  Mail,
 Target,
  Users,
} from "lucide-react";

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const prompts = [
  {
    icon: CalendarDays,
    text: "Summarize today's brief",
  },
  {
    icon: Users,
    text: "Prepare me for my next meeting",
  },
  {
    icon: Mail,
    text: "Summarize my emails",
  },
  {
    icon: CalendarDays,
    text: "What's on my calendar today?",
  },
  {
    icon: Target,
    text: "What should I prioritize today?",
  },
  {
    icon: ClipboardList,
    text: "Help me plan my day",
  },
];

export default function SuggestedPrompts({
  onPromptClick,
}: SuggestedPromptsProps) {
  return (
    <div className="mx-auto mt-10 max-w-2xl">

      <h2 className="mb-2 text-center text-xl font-semibold text-slate-800">
        Welcome to Executive Copilot
      </h2>

      <p className="mb-8 text-center text-sm text-slate-500">
        Try one of the suggestions below or ask your own question.
      </p>

      <div className="grid gap-3">

        {prompts.map((prompt) => {
          const Icon = prompt.icon;

          return (
            <button
              key={prompt.text}
              onClick={() => onPromptClick(prompt.text)}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-blue-300 hover:bg-blue-50"
            >
              <Icon
                size={18}
                className="text-slate-500"
              />

              <span className="text-sm font-medium text-slate-700">
                {prompt.text}
              </span>

            </button>
          );
        })}

      </div>

    </div>
  );
}