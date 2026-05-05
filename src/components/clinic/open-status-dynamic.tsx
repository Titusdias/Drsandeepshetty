"use client";

import dynamic from "next/dynamic";
import { Timer } from "lucide-react";

export const OpenStatusDynamic = dynamic(
  () => import("./open-status").then((m) => m.OpenStatus),
  {
    ssr: false,
    loading: () => (
      <span className="inline-flex items-center gap-2 text-sm text-slate-600">
        <Timer className="size-4 shrink-0 text-[#2D8A8A]" aria-hidden />
        Loading hours…
      </span>
    ),
  },
);
