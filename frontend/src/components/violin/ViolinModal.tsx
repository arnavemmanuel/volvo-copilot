import { X, FileText } from "lucide-react";
import type { ViolinNewsItem } from "../../hooks/useViolin";

interface ViolinModalProps {
  open: boolean;
  update: ViolinNewsItem | null;
  onClose: () => void;
}

const badgeStyles = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-amber-100 text-amber-700",
  Medium: "bg-blue-100 text-blue-700",
};

const headings = new Set([
  "Production Overview",
  "Key Findings",
  "Business Impact",
  "Recommended Actions",
]);

function renderContent(content: string) {
  const sections = content.split("\n\n");

  return sections.map((section, index) => {
    const trimmed = section.trim();

    if (!trimmed) return null;

    if (headings.has(trimmed)) {
      return (
        <div key={index} className="mt-12 first:mt-0">
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
            {trimmed}
          </h3>
          <div className="mt-3 mb-8 h-px bg-slate-200" />
        </div>
      );
    }

    if (trimmed.startsWith("•")) {
      const bullets = trimmed.split("\n");

      return (
        <ul
          key={index}
          className="mb-8 ml-6 list-disc space-y-3 text-[15px] leading-8 text-slate-700"
        >
          {bullets.map((bullet, i) => (
            <li key={i}>{bullet.replace("•", "").trim()}</li>
          ))}
        </ul>
      );
    }

    return (
      <p
        key={index}
        className="mb-8 text-[15px] leading-8 text-slate-700"
      >
        {trimmed}
      </p>
    );
  });
}

export default function ViolinModal({
  open,
  update,
  onClose,
}: ViolinModalProps) {
  if (!open || !update) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          {/* Header */}

          <div className="border-b border-slate-200 px-10 py-7">
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <div className="mb-3 flex items-center gap-4">
                  <FileText className="h-7 w-7 text-blue-600 shrink-0" />

                  <h2 className="text-4xl font-bold tracking-tight text-slate-900">
                    {update.title}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[update.priority]}`}
                  >
                    {update.priority}
                  </span>
                </div>

                <p className="text-sm text-slate-500">
                  {update.category} • {update.published} • {update.readTime}
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-2 transition hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Document */}

          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl px-12 py-10">
              <section className="mb-10">
                <h3 className="mb-4 text-xl font-semibold text-slate-900">
                  Summary
                </h3>

                <p className="text-[15px] leading-8 text-slate-700">
                  {update.summary}
                </p>
              </section>

              <hr className="mb-12 border-slate-200" />

              <article>{renderContent(update.content)}</article>
            </div>
          </div>

          {/* Footer */}

          <div className="border-t border-slate-200 bg-slate-50 px-10 py-3">
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <p className="mb-1 font-semibold text-slate-900">
                  Related Systems
                </p>

                <p className="text-slate-600">
                  {update.relatedSystems.join(" • ")}
                </p>
              </div>

              <div>
                <p className="mb-1 font-semibold text-slate-900">
                  Affected Plants
                </p>

                <p className="text-slate-600">
                  {update.affectedPlants.join(" • ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}