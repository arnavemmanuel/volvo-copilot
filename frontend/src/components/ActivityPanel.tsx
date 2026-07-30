export default function ActivityPanel() {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-semibold mb-4">
        Recent Activity
      </h2>

      <ul className="space-y-3 text-slate-600">

        <li>✓ Meeting summary generated</li>

        <li>✓ Email draft prepared</li>

        <li>✓ Executive brief updated</li>

        <li>✓ Action items synchronized</li>

      </ul>

    </div>
  );
}