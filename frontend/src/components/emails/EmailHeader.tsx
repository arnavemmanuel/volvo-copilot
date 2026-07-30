import { X, User, Users, Clock3 } from "lucide-react";
import type { Email } from "../../hooks/useEmails";

interface EmailHeaderProps {
  email: Email;
  onClose: () => void;
}

export default function EmailHeader({
  email,
  onClose,
}: EmailHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">

      {/* Subject */}

      <div className="flex items-center justify-between px-8 pt-5 pb-3">

        <h1 className="truncate pr-6 text-xl font-bold text-slate-900">
          {email.subject}
        </h1>

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={18} />
        </button>

      </div>

      {/* Metadata */}

      <div className="flex items-center gap-10 border-t border-slate-100 px-5 py-3 text-sm">

        <div className="flex items-center gap-3">

          <User
            size={18}
            className="text-slate-400"
          />

          <span className="text-slate-500">
            From
          </span>

          <span className="font-medium text-slate-800">
            {email.sender}
          </span>

        </div>

        <div className="h-5 w-px bg-slate-200" />

        <div className="flex items-center gap-3">

          <Users
            size={18}
            className="text-slate-400"
          />

          <span className="text-slate-500">
            To
          </span>

          <span className="truncate font-medium text-slate-800">
            {email.recipients}
          </span>

        </div>

        <div className="h-5 w-px bg-slate-200" />

        <div className="flex items-center gap-3">

          <Clock3
            size={18}
            className="text-slate-400"
          />

          <span className="text-slate-500">
            Date
          </span>

          <span className="font-medium text-slate-800">
            {email.received}
          </span>

        </div>

      </div>

    </header>
  );
}