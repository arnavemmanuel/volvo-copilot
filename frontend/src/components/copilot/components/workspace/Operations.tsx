import {
  Factory,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Server,
  GitBranch,
  ArrowUpRight,
} from "lucide-react";

const plants = [
  {
    name: "Gothenburg",
    status: "Healthy",
    color: "bg-green-500",
  },
  {
    name: "Ghent",
    status: "Warning",
    color: "bg-amber-500",
  },
  {
    name: "Bangalore",
    status: "Healthy",
    color: "bg-green-500",
  },
];

const incidents = [
  {
    title: "SAP Deployment Delay",
    severity: "High",
    description:
      "Deployment approval pending due to validation checks.",
  },
  {
    title: "Automation Retry",
    severity: "Medium",
    description:
      "One MTM NG automation execution is being retried.",
  },
];

export default function Operations() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">

      {/* Header */}

      <div>

        <div className="flex items-center gap-2">

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Live Monitoring
          </span>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            3 Plants Connected
          </span>

        </div>

        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Operations
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Live operational overview across Digital Production.
        </p>

      </div>

      {/* Plant Status */}

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">

          <div className="rounded-xl bg-blue-100 p-3">
            <Factory className="h-5 w-5 text-blue-600" />
          </div>

          <div>

            <h2 className="font-semibold">
              Plant Status
            </h2>

            <p className="text-sm text-slate-500">
              Connected manufacturing sites
            </p>

          </div>

        </div>

        <div className="space-y-4 p-6">

          {plants.map((plant) => (

            <div
              key={plant.name}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
            >

              <div className="flex items-center gap-3">

                <div
                  className={`h-3 w-3 rounded-full ${plant.color}`}
                />

                <div>

                  <p className="font-medium">
                    {plant.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    Production Plant
                  </p>

                </div>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  plant.status === "Healthy"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {plant.status}
              </span>

            </div>

          ))}

        </div>

      </section>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Incidents */}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-2">

            <AlertTriangle className="h-5 w-5 text-amber-500" />

            <h2 className="font-semibold">
              Active Incidents
            </h2>

          </div>

          <div className="space-y-4">

            {incidents.map((incident) => (

              <div
                key={incident.title}
                className="rounded-xl bg-slate-50 p-4"
              >

                <div className="flex items-center justify-between">

                  <h3 className="font-medium">
                    {incident.title}
                  </h3>

                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      incident.severity === "High"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {incident.severity}
                  </span>

                </div>

                <p className="mt-2 text-sm text-slate-600">
                  {incident.description}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* Deployment Status */}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-2">

            <GitBranch className="h-5 w-5 text-blue-600" />

            <h2 className="font-semibold">
              Deployment Status
            </h2>

          </div>

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <CheckCircle2 className="h-5 w-5 text-green-600" />

              <span>Template Validation Complete</span>

            </div>

            <div className="flex items-center gap-3">

              <Activity className="h-5 w-5 text-blue-600" />

              <span>Automation Execution Running</span>

            </div>

            <div className="flex items-center gap-3">

              <Server className="h-5 w-5 text-slate-500" />

              <span>Production Sync Scheduled</span>

            </div>

          </div>

          <button className="mt-6 flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">

            View Full Operations Report

            <ArrowUpRight className="h-4 w-4" />

          </button>

        </section>

      </div>

    </div>
  );
}