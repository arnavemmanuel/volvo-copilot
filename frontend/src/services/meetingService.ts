import { executiveData } from "../data/executiveData";
import type { Meeting } from "../types/meeting";

export async function getTodaysMeetings(): Promise<Meeting[]> {
  return executiveData.meetings;
}

export async function getNextMeeting(): Promise<Meeting | null> {
  const meetings = executiveData.meetings;

  if (meetings.length === 0) {
    return null;
  }

  return meetings[0];
}

export async function getMeetingById(
  id: string
): Promise<Meeting | null> {
  return (
    executiveData.meetings.find((meeting) => meeting.id === id) ?? null
  );
}