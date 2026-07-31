import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  Mail,
  Calendar,
  FileText,
  ArrowRight,
} from "lucide-react";

import Layout from "../components/Layout";
import { searchEverything } from "../services/searchService";

function highlight(text: string, query: string) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");

  return text.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={index}
        className="rounded bg-yellow-200 px-0.5 text-inherit"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function SearchPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<
  "all" | "emails" | "meetings" | "dashboard"
>("all");

  const query = params.get("q") ?? "";
  const results = searchEverything(query);
  const totalResults =
  results.emails.length +
  results.meetings.length +
  results.dashboard.length;

  return (
    <Layout>

        {/*Header*/}
        
      <div className="mx-auto max-w-7xl space-y-8">

        <div className="rounded-3xl border bg-white p-8 shadow-sm">

  <div className="flex items-center gap-4">

    <div className="rounded-2xl bg-blue-100 p-4">
      <Search className="h-8 w-8 text-blue-600" />
    </div>

    <div>

      <h1 className="text-3xl font-bold">
        Search
      </h1>

      <p className="mt-1 text-slate-500">
        Showing results for
      </p>

      <div className="mt-3 inline-flex rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
        "{query}"
      </div>

    </div>

    <div className="ml-auto rounded-2xl bg-slate-100 px-5 py-4">

      <p className="text-xs uppercase text-slate-500">
        Results
      </p>

      <p className="text-2xl font-bold">
        {totalResults}
      </p>

    </div>

  </div>

</div>

<div className="flex flex-wrap gap-3">

  {[
    {
      id: "all",
      label: `All (${totalResults})`,
    },
    {
      id: "emails",
      label: `Emails (${results.emails.length})`,
    },
    {
      id: "meetings",
      label: `Meetings (${results.meetings.length})`,
    },
    {
      id: "dashboard",
      label: `Dashboard (${results.dashboard.length})`,
    },
  ].map((item) => (

    <button
      key={item.id}
      onClick={() => setFilter(item.id as typeof filter)}
      className={`rounded-full px-5 py-2 text-sm font-medium transition ${
        filter === item.id
          ? "bg-blue-600 text-white"
          : "bg-white border border-slate-200 hover:bg-slate-50"
      }`}
    >
      {item.label}
    </button>

  ))}

</div>

        {/* No Results */}

        {results.emails.length === 0 &&
          results.meetings.length === 0 &&
          results.dashboard.length === 0 && (
            <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
              <Search className="mx-auto mb-4 h-10 w-10 text-slate-400" />

              <h2 className="text-xl font-semibold">
                No results found
              </h2>

              <p className="mt-2 text-slate-500">
                No matches found for "{query}"
              </p>
            </div>
          )}

        {/* Emails */}

        {(filter === "all" || filter === "emails") &&
  results.emails.length > 0 && (
          <section className="rounded-3xl border bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">
              <Mail className="text-blue-600" />
              <h2 className="text-xl font-semibold">
                Emails
              </h2>
            </div>

            <div className="space-y-3">

              {results.emails.map(email => (

                <button
  key={email.id}
  onClick={() => navigate("/emails")}
  className="group flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-blue-300 hover:shadow-md"
>
  <div className="flex-1">

    <div className="mb-2 flex items-center gap-2">

      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
        EMAIL
      </span>

      <span
        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
          email.priority === "high"
            ? "bg-red-100 text-red-700"
            : email.priority === "medium"
            ? "bg-amber-100 text-amber-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {email.priority.toUpperCase()}
      </span>

    </div>

    <h3 className="text-base font-semibold text-slate-900">
      {highlight(email.subject, query)}
    </h3>

    <p className="mt-1 text-sm text-slate-500">
      <>
  {highlight(email.sender, query)} • {email.received}
</>
    </p>

    <p className="mt-2 text-xs leading-5 text-slate-600">
      {highlight(email.summary, query)}
    </p>

  </div>

  <ArrowRight className="ml-6 h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600" />
</button>

              ))}

            </div>

          </section>
        )}

        {/* Meetings */}

        {(filter === "all" || filter === "meetings") &&
  results.meetings.length > 0 && (

          <section className="rounded-3xl border bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">
              <Calendar className="text-blue-600" />
              <h2 className="text-xl font-semibold">
                Meetings
              </h2>
            </div>

            <div className="space-y-3">

              {results.meetings.map(meeting => (

                <button
  key={meeting.id}
  onClick={() => navigate("/meetings")}
  className="group flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-blue-300 hover:shadow-md"
>
  <div className="flex-1">

    <div className="mb-2 flex items-center gap-2">

      <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
        MEETING
      </span>

      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
        {meeting.attendees} attendees
      </span>

    </div>

    <h3 className="text-base font-semibold text-slate-900">
      {highlight(meeting.title, query)}
    </h3>

    <p className="mt-1 text-sm text-slate-500">
      <>
  {meeting.time} • {highlight(meeting.location, query)}
</>
    </p>

    <p className="mt-2 text-xs text-slate-600">
      Duration: {meeting.duration}
    </p>

  </div>

  <ArrowRight className="ml-6 h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600" />
</button>

              ))}

            </div>

          </section>

        )}

        {/* Dashboard */}

        {(filter === "all" || filter === "dashboard") &&
  results.dashboard.length > 0 && (

          <section className="rounded-3xl border bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">
              <FileText className="text-blue-600" />
              <h2 className="text-xl font-semibold">
                Dashboard
              </h2>
            </div>

            <div className="space-y-3">

              {results.dashboard.map(stat => (

                <button
  key={stat.title}
  onClick={() => navigate("/")}
  className="group flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-blue-300 hover:shadow-md"
>
  <div className="flex-1">

    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
      DASHBOARD
    </span>

    <h3 className="mt-2 text-base font-semibold text-slate-900">
      {highlight(stat.title, query)}
    </h3>

    <p className="mt-1 text-sm text-slate-500">
      Current value: {stat.value}
    </p>

  </div>

  <ArrowRight className="ml-6 h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600" />
</button>

              ))}

            </div>

          </section>

        )}

      </div>
    </Layout>
  );
}
