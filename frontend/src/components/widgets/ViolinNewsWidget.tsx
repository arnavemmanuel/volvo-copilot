import { useState } from "react";
import {
  Newspaper,
  Sparkles,
  AlertTriangle,
  FileText,
} from "lucide-react";

import SectionHeader from "../ai/SectionHeader";
import AIActionButton from "../ai/AIActionButton";
import ViolinModal from "../violin/ViolinModal";
import {
  useViolin,
  type ViolinNewsItem,
} from "../../hooks/useViolin";

export default function ViolinNewsWidget() {
  const { data, loading, error } = useViolin();

  const [selectedUpdate, setSelectedUpdate] =
    useState<ViolinNewsItem | null>(null);

  const [modalOpen, setModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">
          Loading VIOLIN updates...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-6 text-red-600 shadow-sm">
        {error || "Unable to load VIOLIN updates"}
      </div>
    );
  }

  const criticalCount = data.news.filter(
    (item: ViolinNewsItem) =>
      item.priority === "Critical"
  ).length;

  const highCount = data.news.filter(
    (item: ViolinNewsItem) =>
      item.priority === "High"
  ).length;

  const updates = data.news.slice(0, 3);

  const badgeColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "High":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <SectionHeader
          icon={<Newspaper className="h-5 w-5 text-blue-600" />}
          title="VIOLIN Updates"
          subtitle={`${data.news.length} operational updates`}
        />

        {/* Status Overview */}

        <div className="mb-6 grid grid-cols-2 gap-4">

          <div className="rounded-2xl border border-red-100 bg-red-50 p-4">

            <div className="flex items-center gap-2 text-red-700">

              <AlertTriangle className="h-4 w-4" />

              <span className="text-sm font-semibold">
                Critical
              </span>

            </div>

            <p className="mt-3 text-3xl font-bold text-red-700">
              {criticalCount}
            </p>

          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">

            <div className="flex items-center gap-2 text-amber-700">

              <AlertTriangle className="h-4 w-4" />

              <span className="text-sm font-semibold">
                High
              </span>

            </div>

            <p className="mt-3 text-3xl font-bold text-amber-700">
              {highCount}
            </p>

          </div>

        </div>

        {/* Latest Updates */}

        <div className="space-y-4">

          {updates.map((item: ViolinNewsItem) => (

            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:border-blue-300 hover:shadow-md"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                  <h3 className="truncate text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.category}
                  </p>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${badgeColor(
                    item.priority
                  )}`}
                >
                  {item.priority}
                </span>

              </div>

              <div className="mt-5 flex flex-wrap gap-3">

                <button
                  onClick={() => {
                    setSelectedUpdate(item);
                    setModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <FileText className="h-4 w-4" />
                  Read Update
                </button>

                <AIActionButton
                  prompt={`Summarize this VIOLIN update for an executive.

Title:
${item.title}

Summary:
${item.summary}

Provide:

• Executive summary
• Business impact
• Production impact
• Risks
• Recommended actions
• Urgency`}
                >
                  Summarize with AI
                </AIActionButton>

              </div>

            </div>

          ))}

        </div>

        {/* AI Executive Insight */}

        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

          <div className="mb-2 flex items-center gap-2 font-semibold text-blue-700">

            <Sparkles className="h-4 w-4" />

            AI Executive Insight

          </div>

          <p className="text-sm leading-6 text-slate-700">
            {data.summary}
          </p>

        </div>

      </section>

      <ViolinModal
        open={modalOpen}
        update={selectedUpdate}
        onClose={() => {
          setModalOpen(false);
          setSelectedUpdate(null);
        }}
      />
    </>
  );
}