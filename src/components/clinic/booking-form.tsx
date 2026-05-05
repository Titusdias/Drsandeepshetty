"use client";

import { useActionState } from "react";

import { submitBooking, type BookingFormState } from "@/app/contact/actions";
import { CLINIC, SERVICE_LIST } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

const initial: BookingFormState = { ok: false, message: "" };

export function BookingForm() {
  const [state, formAction, pending] = useActionState(submitBooking, initial);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-xs font-semibold text-slate-700">
            Full name *
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-xs font-semibold text-slate-700">
            Phone *
          </label>
          <input
            id="phone"
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            placeholder={CLINIC.phoneDisplay}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-semibold text-slate-700">
          Email (optional)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
          placeholder="you@example.com"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="preferred" className="text-xs font-semibold text-slate-700">
            Preferred date / time
          </label>
          <input
            id="preferred"
            name="preferred"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            placeholder="e.g. Next Saturday morning"
          />
        </div>
        <div>
          <label htmlFor="service" className="text-xs font-semibold text-slate-700">
            Treatment interest
          </label>
          <select
            id="service"
            name="service"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            defaultValue=""
          >
            <option value="">Select…</option>
            {SERVICE_LIST.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-xs font-semibold text-slate-700">
          Notes
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
          placeholder="Tell us about your concern or urgency…"
        />
      </div>

      {state.message ? (
        <p
          className={`rounded-xl px-4 py-3 text-sm font-medium ${
            state.ok
              ? "bg-emerald-50 text-emerald-900"
              : "bg-amber-50 text-amber-900"
          }`}
          role={state.ok ? "status" : "alert"}
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button type="submit" disabled={pending} className="w-full rounded-xl sm:w-auto">
          {pending ? "Sending…" : "Request appointment"}
        </Button>
        <a
          href={CLINIC.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-sm font-semibold text-[#2D8A8A] hover:underline sm:text-left"
        >
          Prefer WhatsApp? Message us directly →
        </a>
      </div>
    </form>
  );
}
