"use client";

import { MapPin, MessageCircle, Phone } from "lucide-react";

import { CLINIC } from "@/lib/site-config";

export function MobileBottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/90 bg-white/95 px-2 py-2 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md md:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      aria-label="Quick clinic actions"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-between gap-2">
        <a
          href={CLINIC.phoneTel}
          className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-[#2D8A8A] py-2.5 text-xs font-semibold text-white transition hover:bg-[#236f6f]"
        >
          <Phone className="size-5" aria-hidden />
          Call Clinic
        </a>
        <a
          href={CLINIC.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-[#2D8A8A] bg-white py-2.5 text-xs font-semibold text-[#2D8A8A] transition hover:bg-teal-50"
        >
          <MessageCircle className="size-5" aria-hidden />
          WhatsApp
        </a>
        <a
          href={CLINIC.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-100"
        >
          <MapPin className="size-5" aria-hidden />
          Directions
        </a>
      </div>
    </nav>
  );
}
