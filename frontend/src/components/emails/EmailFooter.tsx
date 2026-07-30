import {
  Bot,
  FilePenLine,
  ExternalLink,
} from "lucide-react";

interface EmailFooterProps {
  onSummary: () => void;
  onDraft: () => void;
}

export default function EmailFooter({
  onSummary,
  onDraft,
}: EmailFooterProps) {
  return (
    <footer className="flex items-center justify-between border-t border-slate-200 bg-white px-8 py-4">

      {/* Left Actions */}

      <div className="flex items-center gap-3">

        <button
          onClick={onSummary}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Bot size={18} />
          AI Summary
        </button>

        <button
          onClick={onDraft}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <FilePenLine size={18} />
          Draft Reply
        </button>

      </div>

      {/* Right Action */}

      <button
        onClick={() =>
          window.open(
            "https://outlook.office.com/mail/",
            "_blank",
            "noopener,noreferrer"
          )
        }
        className="flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-900"
      >
        <ExternalLink size={18} />
        Open Outlook
      </button>

    </footer>
  );
}