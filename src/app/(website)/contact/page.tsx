import { MapPin, PhoneCall, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

import { OpenStatusDynamic } from "@/components/clinic/open-status-dynamic";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CLINIC } from "@/lib/site-config";

import { client } from "@/sanity/lib/client";
import { branchesQuery, contactPageQuery, siteSettingsQuery, sanityFetchOptions } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: `Contact & Book Appointment | ${CLINIC.shortName}`,
  description: `Book a visit at ${CLINIC.name} in ${CLINIC.city}. Call ${CLINIC.phoneDisplay} or request an appointment online.`,
};

export default async function ContactPage() {
  const [page, settings, branches] = await Promise.all([
    client.fetch(contactPageQuery, {}, sanityFetchOptions("contact")),
    client.fetch(siteSettingsQuery, {}, sanityFetchOptions("layout")),
    client.fetch(branchesQuery, {}, sanityFetchOptions("branches")),
  ]);

  const displayTitle = page?.hero_heading || "Book your smile visit";
  const displayMapEmbed = page?.mapEmbedUrl || CLINIC.mapEmbedSrc;

  // Extract all phone numbers dynamically from settings, all branches, and fallback
  const allPhones = [
    settings?.phone,
    // Safely map through all branches to get their phone numbers if they exist
    ...(branches?.map((b: any) => b.phone) || []),
    CLINIC.phoneDisplay2,
  ].filter(Boolean) as string[];
  
  // Remove duplicate phone numbers just in case
  const phoneNumbers = Array.from(new Set(allPhones));

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-teal-100/40 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionReveal className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D8A8A]">
            {page?.hero_sectionLabel || "Contact"}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {displayTitle}
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            {page?.hero_subheading || "Reach out to us directly via WhatsApp or phone to schedule your appointment."}
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <SectionReveal delay={0.05}>
            <Card className="border-slate-200/90 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)] h-full">
              <CardContent className="flex h-full flex-col items-center justify-center space-y-8 p-6 text-center sm:p-10">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {page?.formHeading || "Get in touch directly"}
                  </h2>
                  <p className="mt-3 text-slate-600">
                    {page?.formSubheading || "We prefer direct communication to give you the fastest response. Click below to message us on WhatsApp or call our clinic."}
                  </p>
                </div>
                <div className="flex w-full max-w-sm flex-col gap-4">
                  <Button asChild size="lg" className="h-14 w-full rounded-xl bg-[#25D366] text-base text-white hover:bg-[#20b858]">
                    <a href={CLINIC.whatsapp} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 size-5" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                  {phoneNumbers.map((phone: string, idx: number) => {
                    const phoneTel = phone.replace(/[^0-9+]/g, '');
                    return (
                      <Button key={idx} asChild size="lg" variant="outline" className="h-14 w-full rounded-xl border-[#2D8A8A] text-base text-[#2D8A8A] hover:bg-[#2D8A8A]/10">
                        <a href={`tel:${phoneTel.startsWith('+') ? phoneTel : `+91${phoneTel}`}`}>
                          <PhoneCall className="mr-2 size-5" />
                          Call {phone}
                        </a>
                      </Button>
                    );
                  })}
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
                  
                  {/* DYNAMIC BRANCHES MAPPING STARTS HERE */}
                  <div className="flex flex-col gap-6">
                    {branches && branches.length > 0 ? (
                      branches.map((branch: any, idx: number) => (
                        <div key={branch._id || idx} className="flex gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                          <MapPin className="mt-0.5 size-5 shrink-0 text-[#2D8A8A]" />
                          <div>
                            <p className="font-semibold text-slate-900">{branch.name || "Clinic Branch"}</p>
                            <p className="mt-1 text-slate-600 whitespace-pre-wrap">{branch.address || CLINIC.addressLine}</p>
                            <a
                              href={branch.googleMapsUrl || CLINIC.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-block text-sm font-semibold text-[#2D8A8A] hover:underline"
                            >
                              Open in Google Maps
                            </a>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Fallback just in case Sanity returns an empty array
                      <div className="flex gap-3">
                        <MapPin className="mt-0.5 size-5 shrink-0 text-[#2D8A8A]" />
                        <div>
                          <p className="font-semibold text-slate-900">Main Clinic</p>
                          <p className="mt-1 text-slate-600 whitespace-pre-wrap">{CLINIC.addressLine}</p>
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
                    )}
                  </div>
                  {/* DYNAMIC BRANCHES MAPPING ENDS HERE */}

                  <div className="border-t border-slate-100 pt-5">
                    <p className="text-sm font-semibold text-slate-900">
                      Hours
                    </p>
                    {settings?.hours ? (
                      <p className="mt-2 text-sm text-slate-600">{settings.hours}</p>
                    ) : (
                      <OpenStatusDynamic />
                    )}
                  </div>
                  <div className="grid gap-3 pt-4 sm:grid-cols-2">
                    {phoneNumbers.slice(0, 2).map((phone: string, idx: number) => {
                      const phoneTel = phone.replace(/[^0-9+]/g, '');
                      return (
                        <Button key={idx} asChild className={idx === 1 ? "w-full rounded-xl" : "w-full rounded-xl bg-[#2D8A8A] hover:bg-[#236b6b]"} variant={idx === 1 ? "outline" : "default"}>
                          <a href={`tel:${phoneTel.startsWith('+') ? phoneTel : `+91${phoneTel}`}`}>
                            <PhoneCall className="size-4 mr-2" />
                            Call {phone}
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-3xl border-slate-200/90 p-0 shadow-lg">
                <iframe
                  title={`Map — ${CLINIC.name}`}
                  src={displayMapEmbed}
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