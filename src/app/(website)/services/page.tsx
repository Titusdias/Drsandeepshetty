import {
  HeartPulse,
  Layers,
  Scissors,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { CLINIC, SERVICE_LIST } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: `Dental Services | ${CLINIC.name}`,
  description: `Full range of dental services in ${CLINIC.city}: implants, orthodontics, cosmetic care, emergencies, and more.`,
};

const groups = [
  {
    title: "Preventive Dentistry",
    desc: "Check-ups, sealants, kids’ dentistry, and ongoing maintenance.",
    icon: HeartPulse,
    match: ["Check-ups", "Paediatrics", "Fillings and sealants"],
  },
  {
    title: "Cosmetic & smile design",
    desc: "Whitening, bonding, cosmetic procedures tailored to natural aesthetics.",
    icon: Sparkles,
    match: ["Teeth whitening", "Bonding", "Cosmetic procedures"],
  },
  {
    title: "Restorative & implants",
    desc: "Implants, bridges, dentures—and plans built for longevity.",
    icon: Layers,
    match: [
      "Dental implants",
      "Dentures & bridges",
      "Extractions",
      "Root canals",
    ],
  },
  
];

export default async function ServicesPage() {
  const query = `*[_type == "page" && slug.current == "services"][0]`;
  const pageData = await client.fetch(query, {}, {
    next: { tags: ["page"] }
  });

  const servicesSection = pageData?.pageBuilder?.find((block: any) => block._type === 'servicesSection');
  const displayTitle = servicesSection?.title || "Total dental care, tailored for you";
  const sanityServices = servicesSection?.services || [];

  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <SectionReveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D8A8A]">
              Services
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {displayTitle}
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Explore the treatments we routinely provide at our centre. 
              </p>
            <Button asChild className="mt-8 rounded-xl">
              <Link href="/contact">Book a consultation</Link>
            </Button>
          </SectionReveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {sanityServices.length > 0 ? (
              sanityServices.map((service: any, i: number) => (
                <SectionReveal
                  key={service.title || i}
                  delay={i * 0.05}
                  className="rounded-3xl border border-slate-200 bg-[#FDFBF7]/60 p-6 shadow-sm lg:col-span-1"
                >
                  {service.icon ? (
                    <Image src={urlForImage(service.icon).url()} alt={service.title} width={40} height={40} className="mb-4 text-[#2D8A8A]" />
                  ) : (
                    <Stethoscope className="size-10 text-[#2D8A8A]" />
                  )}
                  <h2 className="mt-4 text-xl font-bold text-slate-900">{service.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                </SectionReveal>
              ))
            ) : (
              groups.map(({ title, desc, icon: Icon }, i) => (
                <SectionReveal
                  key={title}
                  delay={i * 0.05}
                  className="rounded-3xl border border-slate-200 bg-[#FDFBF7]/60 p-6 shadow-sm lg:col-span-1"
                >
                  <Icon className="size-10 text-[#2D8A8A]" />
                  <h2 className="mt-4 text-xl font-bold text-slate-900">{title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{desc}</p>
                </SectionReveal>
              ))
            )}
            <SectionReveal
              delay={0.2}
              className="rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-6 shadow-md lg:col-span-3"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-[#2D8A8A]">
                    <Stethoscope className="size-6" />
                    <span className="text-xs font-bold uppercase tracking-wide">
                      Invisalign & orthodontics
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-slate-900">
                    Aligners & braces under one roof
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-slate-600">
                    Invisalign-certified workflows for teens and adults, plus options for fixed appliances when clinically preferred.
                  </p>
                </div>
                <Image
                  src="/smile-logo.png"
                  alt=""
                  width={64}
                  height={64}
                  className="hidden md:block"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionReveal>
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
            Full service directory
          </h2>
          <p className="mt-3 text-slate-600">
            Everything listed reflects common services at our practice; inclusion
            may vary based on diagnosis and clinician assessment.
          </p>
        </SectionReveal>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_LIST.map((service, idx) => {
            const grp = groups.find((g) => g.match.some((m) => m === service));
            return (
              <SectionReveal
                key={service}
                as="li"
                delay={0.015 * idx}
                className={cn(
                  "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm",
                  grp && "border-teal-100",
                )}
              >
                <span className="text-[#2D8A8A]">✓</span> {service}
              </SectionReveal>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
