import { Coffee } from "lucide-react";
import type { FreeSlot } from "../../data/meetingsData";

interface Props {
  slot: FreeSlot;
}

export default function FreeSlotCard({ slot }: Props) {
  return (
    <div className="my-4 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-semibold text-emerald-700">
            <Coffee size={18} />
            Free Time Available
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            {slot.start} – {slot.end} • {slot.duration}
          </p>
        </div>
      </div>
    </div>
  );
}