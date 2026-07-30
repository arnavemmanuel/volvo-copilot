import type { Email } from "../../hooks/useEmails";

interface InboxSidebarProps {
  emails: Email[];
  selectedEmail: Email;
  onSelectEmail: (email: Email) => void;
}

export default function InboxSidebar({
  emails,
  selectedEmail,
  onSelectEmail,
}: InboxSidebarProps) {
  return (
    <aside className="flex w-[220px] flex-col border-r border-slate-200 bg-slate-50">

      {/* Header */}

      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-900">
          Inbox
        </h2>
      </div>

      {/* Email List */}

      <div className="flex-1 overflow-y-auto">

        {emails.map((email) => {
          const active = selectedEmail.id === email.id;

          const dotColour =
            email.priority === "Critical"
              ? "bg-red-500"
              : email.priority === "High"
              ? "bg-orange-500"
              : "bg-green-500";

          return (
            <button
              key={email.id}
              onClick={() => onSelectEmail(email)}
              className={`group w-full border-b border-slate-100 px-4 py-3 text-left transition-all duration-200 ${
                active
                  ? "border-l-4 border-l-blue-600 bg-white"
                  : "hover:bg-white"
              }`}
            >
              <div className="flex items-start gap-3">

                <span
                  className={`mt-[7px] h-2.5 w-2.5 rounded-full ${dotColour}`}
                />

                <div className="min-w-0 flex-1">

                  <p
                    className={`truncate text-sm ${
                      active
                        ? "font-semibold text-slate-900"
                        : "font-medium text-slate-800"
                    }`}
                  >
                    {email.subject}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {email.sender}
                  </p>

                </div>

              </div>
            </button>
          );
        })}

      </div>
    </aside>
  );
}