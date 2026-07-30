import Layout from "../components/Layout";
import { FileText, ExternalLink, Database } from "lucide-react";

const documents = [
  {
    title: "MTM NG Template v5",
    description:
      "Latest approved MTM NG template used for Digital Production automation.",
    status: "Current",
  },
  {
    title: "Digital Production Governance Framework",
    description:
      "Executive governance model, ownership structure, and decision-making guidelines.",
    status: "Approved",
  },
  {
    title: "SAP Production Deployment Guide",
    description:
      "Deployment procedures, SAP integration workflow, and production rollout guidance.",
    status: "Current",
  },
  {
    title: "Production Readiness Checklist",
    description:
      "Standard checklist used before manufacturing plant deployment.",
    status: "Current",
  },
  {
    title: "Automation Standards",
    description:
      "Corporate standards and best practices for automation development.",
    status: "Current",
  },
];

export default function Documents() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Executive Documents
          </h1>

          <p className="mt-2 text-slate-600 max-w-3xl">
            Browse key Digital Production documentation. In the production
            version, these documents will be retrieved directly from SharePoint
            (VIOLIN) using Microsoft Graph and made searchable through the
            Executive Copilot.
          </p>
        </div>

        <div className="grid gap-5">
          {documents.map((doc) => (
            <div
              key={doc.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="rounded-xl bg-blue-100 p-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {doc.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-600">
                      {doc.description}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {doc.status}
                </span>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  onClick={() =>
                    alert(
                      "Future Feature\n\nThis document will open directly from SharePoint using Microsoft Graph integration."
                    )
                  }
                >
                  <ExternalLink className="h-4 w-4" />
                  View Document
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-center gap-3">
            <Database className="h-6 w-6 text-blue-600" />

            <h2 className="text-lg font-semibold text-slate-900">
              Future Integration
            </h2>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-700">
            The production version of Executive Copilot will retrieve approved
            documents directly from Volvo SharePoint (VIOLIN) using Microsoft
            Graph. Retrieved content will be indexed for Retrieval-Augmented
            Generation (RAG), enabling executives to ask natural language
            questions and receive answers grounded in the latest approved
            documentation.
          </p>
        </div>
      </div>
    </Layout>
  );
}