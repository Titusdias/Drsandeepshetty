import { Award, HeartHandshake, Shield, Sparkles } from "lucide-react";
import type { Metadata } from "next";

import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CLINIC } from "@/lib/site-config";

import { client } from "@/sanity/lib/client";
import { aboutPageQuery, sanityFetchOptions } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: `About Us | ${CLINIC.name}`,
  description: `Learn about ${CLINIC.name} in ${CLINIC.city}—multi-specialty care, Invisalign provider, hygiene-first protocols.`,
};

export default async function AboutPage() {
  const page = await client.fetch(aboutPageQuery, {}, sanityFetchOptions("about"));

  const displayTitle = page?.hero_heading || `Welcome to ${CLINIC.shortName}'s practice`;
  const displayDescription = page?.hero_body || `Located on Bunts Hostel Road and Gateway Complex in Pandeshwar, we serve families across ${CLINIC.city} with a calm, tech-forward clinic experience—where comfort, cleanliness, and clear communication come first.`;
  const heroVideoUrl = page?.hero_videoFile?.asset?.url;
  const philosophyHeading = page?.philosophy_heading || "Our philosophy";
  const philosophyBody = page?.philosophy_body || "Dentistry should feel reassuring—not rushed. Every treatment plan is tailored to your goals, schedule, and comfort, with meticulous attention to sterilization and long-term oral health—not short-term fixes.";
  const pillars = page?.philosophy_pillars?.length
    ? page.philosophy_pillars
    : [
        { title: "Safety first", description: "Rigorous infection control for every instrument and surface." },
        { title: "Invisalign-ready", description: "Modern aligner therapy with orthodontic expertise on-site." },
        { title: "Family-focused", description: "Gentle care for kids, teens, and adults under one roof." },
        { title: "Trusted ratings", description: `${CLINIC.rating}★ average across ${CLINIC.reviewCount}+ Google reviews.` },
      ];

  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-100 via-[#FDFBF7] to-transparent" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D8A8A]">
              {page?.hero_sectionLabel || "About us"}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {displayTitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 whitespace-pre-wrap">
              {displayDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-xl px-8">
                <Link href={page?.hero_ctaPrimary_url || "/contact"}>
                  {page?.hero_ctaPrimary_label || "Book your visit"}
                </Link>
              </Button>
              <Button variant="outline" asChild className="rounded-xl px-8">
                <Link href={page?.hero_ctaSecondary_url || "/services"}>
                  {page?.hero_ctaSecondary_label || "Explore treatments"}
                </Link>
              </Button>
            </div>
          </SectionReveal>
          <div className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-[0_35px_90px_-35px_rgba(15,23,42,0.45)]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="aspect-[4/3] w-full object-cover"
            >
              <source src={heroVideoUrl || "/videoplayback.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionReveal className="max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">
            {philosophyHeading}
          </h2>
          <p className="mt-5 text-lg text-slate-600">
            {philosophyBody}
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar: { title: string; description: string }, i: number) => {
            const icons = [Shield, Sparkles, HeartHandshake, Award];
            const Icon = icons[i % icons.length];
            return (
            <SectionReveal
              key={pillar.title}
              delay={0.05 * i}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <Icon className="size-9 text-[#2D8A8A]" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {pillar.description}
              </p>
            </SectionReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
