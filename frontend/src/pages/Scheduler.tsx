import { useState } from "react";

export default function Scheduler() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold">
          AI Meeting Scheduler
        </h1>

        <p className="mt-2 text-slate-600">
          Describe the meeting naturally.
        </p>

        <div className="mt-8 rounded-xl bg-white p-6 shadow">

          <textarea
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full rounded-lg border p-4"
            placeholder="Example:

Schedule a 45 minute MTMNG rollout review with Rahul, Sarah and the SAP Lead next Tuesday afternoon."
          />

          <button
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white"
          >
            Generate Meeting
          </button>

        </div>

      </div>
    </div>
  );
}