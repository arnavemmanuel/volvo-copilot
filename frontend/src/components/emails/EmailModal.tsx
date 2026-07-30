import InboxSidebar from "./InboxSidebar";
import EmailHeader from "./EmailHeader";
import EmailBody from "./EmailBody";
import EmailFooter from "./EmailFooter";

import type { Email } from "../../hooks/useEmails";

interface EmailModalProps {
  open: boolean;
  email: Email | null;
  emails: Email[];

  onClose: () => void;
  onSelectEmail: (email: Email) => void;

  onSummary: () => void;
  onDraft: () => void;
}

export default function EmailModal({
  open,
  email,
  emails,
  onClose,
  onSelectEmail,
  onSummary,
  onDraft,
}: EmailModalProps) {
  if (!open || !email) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}

      <div className="fixed inset-0 z-50 flex items-center justify-center p-8">

        <div
          className="
            flex
            h-[90vh]
            w-[86vw]
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-2xl
          "
        >

          {/* Inbox */}

          <InboxSidebar
            emails={emails}
            selectedEmail={email}
            onSelectEmail={onSelectEmail}
          />

          {/* Reader */}

          <div className="flex flex-1 flex-col">

            <EmailHeader
              email={email}
              onClose={onClose}
            />

            <EmailBody
              email={email}
            />

            <EmailFooter
              onSummary={onSummary}
              onDraft={onDraft}
            />

          </div>

        </div>

      </div>
    </>
  );
}