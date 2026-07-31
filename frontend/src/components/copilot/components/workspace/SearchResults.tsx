import {
  Search,
  Mail,
  Calendar,
  FileText,
  Factory,
  ArrowRight,
} from "lucide-react";

export default function SearchResults() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Header */}

      <div>
        <div className="flex items-center gap-3">
          <Search className="h-8 w-8 text-blue-600" />

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Search Results
            </h1>

            <p className="text-slate-500">
              Results for <span className="font-semibold">"SAP"</span>
            </p>
          </div>
        </div>
      </div>

      {/* Emails */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <Mail className="text-blue-600" />
          <h2 className="text-xl font-semibold">Emails</h2>
        </div>

        <div className="space-y-3">

          <button className="flex w-full items-center justify-between rounded-xl border p-4 hover:bg-slate-50">
            <div className="text-left">
              <p className="font-semibold">
                SAP Escalation
              </p>

              <p className="text-sm text-slate-500">
                Today • High Priority
              </p>
            </div>

            <ArrowRight />
          </button>

          <button className="flex w-full items-center justify-between rounded-xl border p-4 hover:bg-slate-50">
            <div className="text-left">
              <p className="font-semibold">
                SAP Migration Update
              </p>

              <p className="text-sm text-slate-500">
                Yesterday
              </p>
            </div>

            <ArrowRight />
          </button>

        </div>
      </section>

      {/* Meetings */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <Calendar className="text-blue-600" />
          <h2 className="text-xl font-semibold">Meetings</h2>
        </div>

        <button className="flex w-full items-center justify-between rounded-xl border p-4 hover:bg-slate-50">
          <div className="text-left">
            <p className="font-semibold">
              SAP Integration Review
            </p>

            <p className="text-sm text-slate-500">
              Today • 2:00 PM
            </p>
          </div>

          <ArrowRight />
        </button>
      </section>

      {/* Documents */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <FileText className="text-blue-600" />
          <h2 className="text-xl font-semibold">Documents</h2>
        </div>

        <button className="flex w-full items-center justify-between rounded-xl border p-4 hover:bg-slate-50">
          <div className="text-left">
            <p className="font-semibold">
              SAP Architecture.pdf
            </p>
          </div>

          <ArrowRight />
        </button>
      </section>

      {/* VIOLIN */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <Factory className="text-blue-600" />
          <h2 className="text-xl font-semibold">VIOLIN Updates</h2>
        </div>

        <button className="flex w-full items-center justify-between rounded-xl border p-4 hover:bg-slate-50">
          <div className="text-left">
            <p className="font-semibold">
              SAP Connector Deployment
            </p>
          </div>

          <ArrowRight />
        </button>
      </section>

    </div>
  );
}