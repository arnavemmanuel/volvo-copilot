import { useState } from "react";
import { useCopilot } from "../../hooks/useCopilot";

import MeetingCard from "./MeetingCard";
import FreeSlotCard from "./FreeSlotCard";
import MeetingPreparationPanel from "../meetingPreparation/MeetingPreparationPanel";
import { useMeetings } from "../../hooks/useMeetings";
import type { Meeting } from "../../types/meeting";

export default function MeetingsTimeline() {
  const { meetings, loading, error } = useMeetings();
  const { sendPrompt } = useCopilot();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] =
    useState<Meeting | null>(null);

  if (loading) {
    return <p>Loading today's meetings...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Today's Schedule
        </h2>

        <div className="space-y-4">
          {meetings.map((meeting, index) => (
            <div key={meeting.id}>
              <MeetingCard
                meeting={meeting}
                onPrepare={() => {
                  setSelectedMeeting(meeting);

                  const attendeeList = meeting.attendees
                    .map((a) => a.name)
                    .join(", ");

                  sendPrompt(`
Prepare me for this executive meeting.

Meeting:
${meeting.subject}

Time:
${new Date(meeting.start).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
})}
 -
${new Date(meeting.end).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
})}

Location:
${meeting.location ?? "Online"}

Attendees:
${attendeeList}

Agenda:
${meeting.agenda ?? "No agenda provided."}

Description:
${meeting.description ?? "No additional description."}

Provide:

• Executive summary

• Key talking points

• Risks to be aware of

• Important questions I should ask

• Decisions likely required

• Recommended preparation before the meeting
                  `);
                }}
                onDetails={() => {
                  setSelectedMeeting(meeting);
                  setDetailsOpen(true);
                }}
              />

              {index === 1 && (
  <div className="-mt-2">
    <FreeSlotCard
      slot={{
        id: 1,
        start: "13:00",
        end: "15:00",
        duration: "2 hours",
      }}
    />
  </div>
)}
            </div>
          ))}
        </div>
      </div>

      <MeetingPreparationPanel
  open={detailsOpen}
  meeting={selectedMeeting}
  onClose={() => {
    setDetailsOpen(false);
    setSelectedMeeting(null);
  }}
/>
    </>
  );
}