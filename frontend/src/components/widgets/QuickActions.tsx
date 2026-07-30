import { WandSparkles } from "lucide-react";
import { executiveData } from "../../data/executiveData";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center gap-3 mb-5">
        <WandSparkles className="w-6 h-6 text-purple-600" />

        <h2 className="font-bold text-xl">
          Quick Actions
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {executiveData.actions.map((action) => (
          <button
            key={action}
            className="border rounded-xl py-3 hover:bg-gray-100 transition"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}