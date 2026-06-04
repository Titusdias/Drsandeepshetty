import { MapPin, PhoneCall, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

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
            Book your smile visit 
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            Reach out to us directly via WhatsApp or phone to schedule your appointment.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionReveal delay={0.05}>
            <Card className="border-slate-200/90 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)] h-full">
              <CardContent className="flex h-full flex-col items-center justify-center space-y-8 p-6 text-center sm:p-10">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Get in touch directly
                  </h2>
                  <p className="mt-3 text-slate-600">
                    We prefer direct communication to give you the fastest response. Click below to message us on WhatsApp or call our clinic.
                  </p>
                </div>
                <div className="flex w-full max-w-sm flex-col gap-4">
                  <Button asChild size="lg" className="h-14 w-full rounded-xl bg-[#25D366] text-base text-white hover:bg-[#20b858]">
                    <a href={CLINIC.whatsapp} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 size-5" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-14 w-full rounded-xl border-[#2D8A8A] text-base text-[#2D8A8A] hover:bg-[#2D8A8A]/10">
                    <a href={CLINIC.phoneTel}>
                      <PhoneCall className="mr-2 size-5" />
                      Call {CLINIC.phoneDisplay}
                    </a>
                  </Button>
                  {CLINIC.phoneTel2 && (
                    <Button asChild size="lg" variant="outline" className="h-14 w-full rounded-xl border-[#2D8A8A] text-base text-[#2D8A8A] hover:bg-[#2D8A8A]/10">
                      <a href={CLINIC.phoneTel2}>
                        <PhoneCall className="mr-2 size-5" />
                        Call {CLINIC.phoneDisplay2}
                      </a>
                    </Button>
                  )}
                </div>
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
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-3">
                      <MapPin className="mt-0.5 size-5 shrink-0 text-[#2D8A8A]" />
                      <div>
                        <p className="font-semibold text-slate-900">Clinic 1</p>
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
                    <div className="flex gap-3">
                      <MapPin className="mt-0.5 size-5 shrink-0 text-[#2D8A8A]" />
                      <div>
                        <p className="font-semibold text-slate-900">Clinic 2</p>
                        <p className="mt-1 text-slate-600">{CLINIC.addressLine2}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 pt-5">
                    <p className="text-sm font-semibold text-slate-900">
                      Hours
                    </p>
                    <OpenStatusDynamic />
                  </div>
                  <div className="grid gap-3 pt-4 sm:grid-cols-2">
                    <Button asChild className="w-full rounded-xl">
                      <a href={CLINIC.phoneTel}>
                        <PhoneCall className="size-4" />
                        Call {CLINIC.phoneDisplay}
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full rounded-xl">
                      <a href={CLINIC.phoneTel2}>
                        <PhoneCall className="size-4" />
                        Call {CLINIC.phoneDisplay2}
                      </a>
                    </Button>
                  </div>
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
