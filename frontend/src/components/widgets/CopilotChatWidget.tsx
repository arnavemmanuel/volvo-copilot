import { useState } from "react";
import {
  Sparkles,
  Send,
 ArrowRight,
  CalendarDays,
  Mail,
  Newspaper,
  Users,
} from "lucide-react";
import { askCopilot } from "../../services/api";

const SUGGESTED_PROMPTS = [
  {
    icon: CalendarDays,
    text: "Summarize my day",
  },
  {
    icon: Users,
    text: "Prepare my next meeting",
  },
  {
    icon: Mail,
    text: "Priority inbox",
  },
  {
    icon: Newspaper,
    text: "Operational updates",
  },
];

export default function CopilotChatWidget() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Good afternoon. You have 3 meetings today, 2 high-priority emails awaiting review, and one critical operational update requiring executive attention."
  );

  const [loading, setLoading] = useState(false);

  async function handleSend(customPrompt?: string) {
    const prompt = customPrompt ?? question;

    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const response = await askCopilot(prompt);
      setAnswer(response.answer);
    } catch {
      setAnswer(
        "Unable to retrieve information right now. Please try again."
      );
    }

    setQuestion("");
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-5">

        <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-violet-600" />
        </div>

        <div>

          <h2 className="text-lg font-semibold text-slate-900">
            Executive Copilot
          </h2>

          <p className="text-sm text-slate-500">
            AI-powered executive assistant
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="flex gap-3 mb-5">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Ask Executive Copilot..."
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
        />

        <button
          onClick={() => handleSend()}
          className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white px-4 transition"
        >
          <Send size={18} />
        </button>

      </div>

      {/* Suggested Prompts */}

      <div className="grid grid-cols-2 gap-3 mb-5">

        {SUGGESTED_PROMPTS.map((prompt) => {
          const Icon = prompt.icon;

          return (
            <button
              key={prompt.text}
              onClick={() => handleSend(prompt.text)}
              className="rounded-xl border border-slate-200 hover:bg-slate-50 p-3 text-left transition"
            >

              <div className="flex items-center gap-2 mb-1">

                <Icon className="w-4 h-4 text-violet-600" />

                <span className="text-sm font-medium">
                  {prompt.text}
                </span>

              </div>

            </button>
          );
        })}

      </div>

      {/* AI Insight */}

      <div className="rounded-xl border border-violet-100 bg-violet-50 p-4">

        <div className="flex items-center gap-2 mb-3 text-violet-700 font-semibold">

          <Sparkles className="w-4 h-4" />

          Latest AI Insight

        </div>

        <p className="text-sm text-slate-700 leading-6 min-h-[72px]">

          {loading
            ? "Executive Copilot is analyzing your request..."
            : answer}

        </p>

      </div>

      {/* Footer */}

      <div className="mt-5 flex justify-end">

        <button className="flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700">

          Open Full Copilot

          <ArrowRight className="w-4 h-4" />

        </button>

      </div>

    </div>
  );
}