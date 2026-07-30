import type { Email } from "../../hooks/useEmails";
import { AlertCircle } from "lucide-react";

interface Props {
  email: Email;
  onClick: () => void;
}

export default function PriorityEmailCard({
  email,
  onClick,
}: Props) {
  const badgeStyle =
    email.priority === "Critical"
      ? "bg-red-100 text-red-700"
      : email.priority === "High"
      ? "bg-orange-100 text-orange-700"
      : "bg-green-100 text-green-700";

  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border border-slate-200 bg-white px-6 py-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0 flex-1">

          <h3 className="truncate text-lg font-semibold text-slate-900">
            {email.subject}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {email.sender}
            <span className="mx-2">•</span>
            {email.category}
            <span className="mx-2">•</span>
            {email.received}
          </p>

          <p className="mt-3 line-clamp-2 text-sm text-slate-600">
            {email.summary}
          </p>

        </div>

        <div className="flex flex-col items-end gap-3">

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle}`}
          >
            {email.priority}
          </span>

          {email.draftReply && (
            <div className="flex items-center gap-1 text-xs font-medium text-blue-600">
              <AlertCircle className="h-3.5 w-3.5" />
              AI Draft Ready
            </div>
          )}

        </div>

      </div>
    </button>
  );
}