import {
  FileText,
  CalendarDays,
  Mail,
  Factory,
  Clock3,
} from "lucide-react";

import { useCopilot } from "../../../hooks/useCopilot";

import ChatInput from "./ChatInput";
import WorkspaceContent from "./workspace/WorkspaceContent";

export default function CopilotWorkspace() {
  const {
    messages,
    workspaceView,
    setWorkspaceView,
  } = useCopilot();

  const tools = [
    {
      id: "brief",
      title: "Executive Brief",
      icon: <FileText size={18} />,
    },
    {
      id: "meeting",
      title: "Meeting Prep",
      icon: <CalendarDays size={18} />,
    },
    {
      id: "emails",
      title: "Priority Emails",
      icon: <Mail size={18} />,
    },
    {
      id: "operations",
      title: "Operations",
      icon: <Factory size={18} />,
    },
  ] as const;

  return (
    <div className="flex h-full">
      {/* Sidebar */}

      <aside className="flex w-[170px] shrink-0 flex-col border-r border-slate-200 bg-slate-50">
        {/* Copilot */}

        <div className="border-b border-slate-200 px-4 py-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Copilot
          </h3>
        </div>

        <nav className="space-y-1 p-2">
          {tools.map((tool) => {
            const active = workspaceView === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => setWorkspaceView(tool.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                }`}
              >
                {tool.icon}

                <span className="text-sm font-medium">
                  {tool.title}
                </span>
              </button>
            );
          })}
        </nav>

        {/* History */}

        <div className="mt-4 border-t border-slate-200">
          <div className="px-4 py-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              History
            </h3>
          </div>

          <div className="px-2 pb-3">
            {messages.length === 0 ? (
              <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-400">
                <Clock3 size={14} />
                No conversations yet
              </div>
            ) : (
              <button
                onClick={() => setWorkspaceView("chat")}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-white"
              >
                <Clock3 size={15} />
                Latest Conversation
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}

      <main className="flex min-w-0 flex-1 flex-col bg-white">
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <WorkspaceContent
            view={workspaceView}
            hasMessages={messages.length > 0}
          />
        </div>

        <ChatInput />
      </main>
    </div>
  );
}