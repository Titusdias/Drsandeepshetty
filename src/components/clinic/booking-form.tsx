"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

import { CLINIC, SERVICE_LIST } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

type BookingFormState = {
  ok: boolean;
  message: string;
};

const initial: BookingFormState = { ok: false, message: "" };

export function BookingForm() {
  const [state, setState] = useState<BookingFormState>(initial);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const preferred = String(formData.get("preferred") ?? "").trim();
    const service = String(formData.get("service") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name) {
      setState({ ok: false, message: "Please enter your name." });
      setPending(false);
      return;
    }
    if (!phone) {
      setState({ ok: false, message: "Please enter your phone number." });
      setPending(false);
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState({ ok: false, message: "Please enter a valid email address." });
      setPending(false);
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS configuration is missing.");
      setState({
        ok: false,
        message:
          "Email service is not configured. Please contact the site administrator.",
      });
      setPending(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          clinic_name: CLINIC.name,
          name,
          phone,
          email,
          preferred,
          service,
          message,
        },
        publicKey,
      );

      event.currentTarget.reset();
      setState({
        ok: true,
        message:
          "Thank you — we received your request. Our team will call or WhatsApp you shortly to confirm your visit.",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      setState({
        ok: false,
        message:
          "Sorry, we could not send your request right now. Please call or WhatsApp us directly.",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
