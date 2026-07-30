export interface ActivityItem {
  id: string;
  title: string;
  time: string;
}

export function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}