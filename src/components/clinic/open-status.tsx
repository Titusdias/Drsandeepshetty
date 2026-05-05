"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

import { CLINIC } from "@/lib/site-config";

/** Mon–Sat 10:00–20:00, Sunday closed — adjust if your hours differ. */
function clinicIsOpenNow(): boolean {
  const now = new Date();
  const day = now.getDay();
  if (day === 0) return false;
  const minutes = now.getHours() * 60 + now.getMinutes();
  const open = 10 * 60;
  const close = 20 * 60;
  return minutes >= open && minutes < close;
}

export function OpenStatus() {
  const [open, setOpen] = useState<boolean>(() => clinicIsOpenNow());

  useEffect(() => {
    const tick = () => setOpen(clinicIsOpenNow());
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="inline-flex flex-wrap items-center gap-2 text-sm text-slate-700">
      <Clock className="size-4 shrink-0 text-[#2D8A8A]" aria-hidden />
      {open ? (
        <>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
            Open now
          </span>
          <span className="text-slate-600">· Until 8:00 PM · {CLINIC.hoursSummary}</span>
        </>
      ) : (
        <>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
            Closed now
          </span>
          <span className="text-slate-600">
            · {CLINIC.openingNext} · {CLINIC.hoursSummary}
          </span>
        </>
      )}
    </span>
  );
}
