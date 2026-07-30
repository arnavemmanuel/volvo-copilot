import {
  Mail,
  Clock,
  Reply,
  FileText,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


import { useEmails } from "../../hooks/useEmails";

import SectionHeader from "../ai/SectionHeader";
import AIActionButton from "../ai/AIActionButton";

export default function PriorityEmails() {
  const navigate = useNavigate();

  const { emails, loading, error } = useEmails();

  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">Loading emails...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-red-200 bg-white p-6 text-red-600 shadow-sm">
        {error}
      </section>
    );
  }

  const priorityCount = emails.filter(
    (email) =>
      email.priority === "Critical" ||
      email.priority === "High"
  ).length;

  const unreadCount = emails.length;

  const priorityEmails = emails.slice(0, 3);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <SectionHeader
        icon={<Mail className="h-5 w-5 text-green-600" />}
        title="Priority Inbox"
        subtitle={`${emails.length} emails pending`}
        onAction={() => navigate("/emails")}
      />

      <div className="mb-6 grid grid-cols-2 gap-4">

        <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">
            High Priority
          </p>

          <p className="mt-2 text-3xl font-bold text-red-700">
            {priorityCount}
          </p>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-700">
            Total Emails
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-700">
            {unreadCount}
          </p>
        </div>

      </div>

      <div className="space-y-4">

        {priorityEmails.map((email) => (

          <div
            key={email.id}
            className="rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:border-blue-300 hover:shadow-md"
          >

            <div className="flex items-start justify-between gap-4">

              <div className="min-w-0 flex-1">

                <div className="mb-2 flex items-center gap-2 flex-wrap">

                  <h3 className="truncate font-semibold text-slate-900">
                    {email.subject}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      email.priority === "Critical"
                        ? "bg-red-100 text-red-700"
                        : email.priority === "High"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {email.priority}
                  </span>

                </div>

                <p className="text-sm font-medium text-slate-600">
                  {email.sender}
                </p>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                  {email.summary}
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">

                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {email.received}
                  </div>

                </div>

              </div>

            </div>

            <div className="mt-5 flex flex-wrap gap-3">

              <AIActionButton
                prompt={`Summarize this executive email.

Subject:
${email.subject}

From:
${email.sender}

Body:
${email.body}

Provide:
• Executive summary
• Required actions
• Risks
• Follow-up`}
              >
                Summarize
              </AIActionButton>

              <AIActionButton
                prompt={`Write a professional reply to this email.

Subject:
${email.subject}

From:
${email.sender}

Body:
${email.body}`}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Draft Reply
              </AIActionButton>

              <button
                onClick={() =>
                  navigate("/emails", {
                    state: {
                      openEmailId: email.id,
                    },
                  })
                }
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <FileText className="h-4 w-4" />
                Open Email
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

        <div className="mb-2 flex items-center gap-2 font-semibold text-blue-700">
          <Reply className="h-4 w-4" />
          AI Inbox Insight
        </div>

        <p className="text-sm leading-6 text-slate-700">
          You have <strong>{priorityCount}</strong> high-priority emails
          awaiting attention. Consider reviewing them before your next
          executive meeting. AI can summarize long email threads or
          generate professional replies instantly.
        </p>

      </div>

      <div className="mt-5 flex items-center justify-between">
      </div>

    </section>
  );
}