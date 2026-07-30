import { ExternalLink, RefreshCw } from "lucide-react";

interface Props {
  onRefresh?: () => void;
}

export default function EmailToolbar({ onRefresh }: Props) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Executive Copilot
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Emails
        </h1>

        <p className="mt-3 max-w-3xl text-slate-500">
          AI prioritizes executive communications, highlights important
          conversations, and prepares draft responses so executives can focus on
          decisions instead of inbox management.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>

        <button
          onClick={() =>
            window.open("https://outlook.office.com/mail/", "_blank")
          }
          className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
        >
          <ExternalLink className="h-4 w-4" />
          Outlook
        </button>
      </div>
    </div>
  );
}