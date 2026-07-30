import {
  Calendar,
  Mail,
  Newspaper,
 CheckCircle,
} from "lucide-react";

import { aiActivity } from "../../data/dashboardData";

export default function AIActivityFeed() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">

      <h2 className="text-xl font-semibold mb-6">
        AI Activity Feed
      </h2>

      <div className="space-y-5">

        {aiActivity.map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
          />
        ))}

      </div>

    </div>
  );
}

interface Props {
  activity: (typeof aiActivity)[number];
}

function ActivityItem({ activity }: Props) {

  const icon =
    activity.type === "email" ? (
      <Mail size={18} />
    ) : activity.type === "meeting" ? (
      <Calendar size={18} />
    ) : activity.type === "news" ? (
      <Newspaper size={18} />
    ) : (
      <CheckCircle size={18} />
    );

  return (
    <div className="flex gap-4">

      <div className="bg-blue-100 text-blue-700 p-2 rounded-lg h-fit">
        {icon}
      </div>

      <div className="flex-1">

        <div className="flex justify-between">

          <h3 className="font-semibold">
            {activity.title}
          </h3>

          <span className="text-sm text-gray-500">
            {activity.time}
          </span>

        </div>

        <p className="text-gray-600 mt-1">
          {activity.description}
        </p>

      </div>

    </div>
  );
}