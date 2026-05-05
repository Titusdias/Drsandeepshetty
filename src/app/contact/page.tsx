import { MapPin, PhoneCall } from "lucide-react";
import type { Metadata } from "next";

import { BookingForm } from "@/components/clinic/booking-form";
import { OpenStatusDynamic } from "@/components/clinic/open-status-dynamic";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CLINIC } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Contact & Book Appointment | ${CLINIC.shortName}`,
  description: `Book a visit at ${CLINIC.name} in ${CLINIC.city}. Call ${CLINIC.phoneDisplay} or request an appointment online.`,
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-teal-100/40 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionReveal className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D8A8A]">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Book your smile visit in {CLINIC.city}
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            New and returning patients are welcome. Share a few details and our
            team will reach out to confirm timing—or call / WhatsApp for faster
            scheduling.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionReveal delay={0.05}>
            <Card className="border-slate-200/90 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)]">
              <CardContent className="space-y-6 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900">
                  Appointment request
                </h2>
                <BookingForm />
              </CardContent>
            </Card>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <div className="space-y-6">
              <Card className="border-slate-200/90 shadow-sm">
                <CardContent className="space-y-5 p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-slate-900">
                    Clinic information
                  </h2>
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-[#2D8A8A]" />
                    <div>
                      <p className="font-semibold text-slate-900">Address</p>
                      <p className="mt-1 text-slate-600">{CLINIC.addressLine}</p>
                      <a
                        href={CLINIC.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm font-semibold text-[#2D8A8A] hover:underline"
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 pt-5">
                    <p className="text-sm font-semibold text-slate-900">
                      Hours
                    </p>
                    <OpenStatusDynamic />
                  </div>
                  <Button asChild className="w-full rounded-xl">
                    <a href={CLINIC.phoneTel}>
                      <PhoneCall className="size-4" />
                      Call {CLINIC.phoneDisplay}
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-3xl border-slate-200/90 p-0 shadow-lg">
                <iframe
                  title={`Map — ${CLINIC.name}`}
                  src={CLINIC.mapEmbedSrc}
                  className="aspect-[4/3] min-h-[280px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </Card>
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
