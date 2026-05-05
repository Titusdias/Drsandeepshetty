"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { ReviewsWall, type ReviewItem } from "@/components/clinic/reviews-wall";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CLINIC, SERVICE_LIST } from "@/lib/site-config";
import { cn } from "@/lib/utils";
const herobhai =
  "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1920&q=80";
 
const HERO_VISUAL =
  "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1600&q=85";
const WELCOME_IMG =
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80";
const LAB_IMG =
  "https://images.unsplash.com/photo-1588776814546-d9d6e6d4c5bf?auto=format&fit=crop&w=1200&q=80";

const reviews: ReviewItem[] = [
  {
    name: "Verified patient",
    quote:
      "The place is super hygienic, clean, well-maintained.",
    featured: true,
  },
  {
    name: "Ananya R.",
    quote:
      "Clear explanations before every step. Visits in Mangaluru finally feel stress-free.",
  },
  {
    name: "Rahul K.",
    quote:
      "Transparent planning, gentle hands, and premium attention to detail.",
  },
  {
    name: "Priya S.",
    quote:
      "Our family books online and gets reminders—it’s organised and respectful of our time.",
  },
  {
    name: "Deepa P.",
    quote:
      "Sterilisation standards are obvious the moment you walk in. Highly recommended.",
  },
  {
    name: "Nikhil M.",
    quote:
      "Invisalign coaching from start to finish—they made the journey simple.",
  },
];
function AnimatedStat({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 90, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    motionVal.set(value);
  }, [motionVal, value]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = String(v);
    });
    return () => unsub();
  }, [rounded]);

  return (
    <div className="text-center sm:text-left">
      <p className="font-mono text-4xl font-bold tabular-nums text-white sm:text-5xl">
        <span ref={ref}>0</span>
      </p>
      <p className="mt-1 text-sm font-medium text-white/70">{label}</p>
    </div>
  );
}
<div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur">
  <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-3 md:gap-8">
    <motion.div
      className="text-center sm:text-left"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-mono text-4xl font-bold text-white sm:text-5xl">
        {CLINIC.rating}
        <span className="align-top text-2xl text-amber-400">★</span>
      </p>
      <p className="mt-1 text-sm font-medium text-white/70">
        Average Google rating
      </p>
    </motion.div>
    <AnimatedStat value={115} label="Patient reviews" />
    <AnimatedStat value={15} label="Years of experience" />
  </div>
</div>

export default function Home() {
  return (
    <>
      {/* Full-width background image */}
      <section className="relative overflow-hidden border-b border-slate-200">
        {/* Full-width background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={herobhai}
            alt="Dental background image"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Gradient overlay — dark on left for text legibility, fades to transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-28">
          <SectionReveal className="space-y-7">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white/90 text-slate-800 normal-case tracking-normal hover:bg-white/90">
                {CLINIC.rating}★ Google · {CLINIC.reviewCount} reviews
              </Badge>
              <Badge className="border border-white/60 bg-transparent text-white normal-case tracking-normal">
                Certified Invisalign focus
              </Badge>
            </div>
            <h1 className="text-[2rem] font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.15rem]">
              Exceptional dental care in {CLINIC.city}.
            </h1>
            <p className="text-xl font-semibold text-teal-300 sm:text-2xl">
              {CLINIC.tagline}
            </p>
            <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              A modern, minimally stressful clinic experience—clear guidance,
              advanced techniques, and meticulous hygiene for every age at{" "}
              {CLINIC.name}.
            </p>
            <div className="grid gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full bg-[#2D8A8A] px-10 hover:bg-[#236f6f] sm:w-auto"
              >
                <Link href="/contact">Book your visit</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-full border-white/70 bg-white/10 px-10 text-white backdrop-blur hover:bg-white/20 sm:w-auto"
                asChild
              >
                <a href={CLINIC.phoneTel}>
                  <Phone className="size-4" />
                  Call {CLINIC.phoneDisplay}
                </a>
              </Button>
            </div>
            <p className="text-xs text-white/60">{CLINIC.hoursSummary}</p>
          </SectionReveal>

          {/* Floating image card — right side */}
          <SectionReveal delay={0.06} className="relative">
            <motion.div
              className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white p-2 shadow-[0_35px_90px_-20px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
            >
              <Image
                src={HERO_VISUAL}
                alt="Advanced dental treatment suite"
                width={1600}
                height={1200}
                className="aspect-[5/4] w-full rounded-[1.65rem] object-cover sm:aspect-[4/3]"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <motion.div
                className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-2xl bg-white/95 px-4 py-3 text-sm shadow-lg backdrop-blur"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.45 }}
              >
                <span className="font-semibold text-slate-900">
                  Same-week consults · {CLINIC.city}
                </span>
                <Sparkles className="size-5 text-[#2D8A8A]" />
              </motion.div>
            </motion.div>
          </SectionReveal>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-3 md:gap-8">
            <motion.div
              className="text-center sm:text-left"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-4xl font-bold text-white sm:text-5xl">
                {CLINIC.rating}
                <span className="align-top text-2xl text-amber-400">★</span>
              </p>
              <p className="mt-1 text-sm font-medium text-white/70">
                Average Google rating
              </p>
            </motion.div>
            <AnimatedStat value={115} label="Patient reviews" />
            <AnimatedStat value={15} label="Years of experience" />
          </div>
        </div>
      </section>
      <section className="border-b border-slate-200 bg-[#FDFBF7] py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D8A8A]">
              Your dental home
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              Where advanced care feels personal
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              Conveniently located near PSR Silk Sarees on Bunts Hostel Road,
              our clinic combines digital planning, strict sterilization loops,
              and an orthodontic mindset—so every visit feels confident, not
              clinical.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Multi-specialty team for kids, adults, and seniors",
                "Cosmetic, surgical, and rehabilitative pathways on one schedule",
                "WhatsApp concierge for quick doubts between visits",
              ].map((line) => (
                <li key={line} className="flex gap-2 text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#2D8A8A]" />
                  {line}
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-8 rounded-xl">
              <Link href="/about">
                Discover our story <ArrowRight className="size-4" />
              </Link>
            </Button>
          </SectionReveal>

          <SectionReveal delay={0.08} className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-lg sm:col-span-2">
              <Image
                src={WELCOME_IMG}
                alt="Doctor consulting a patient"
                width={1200}
                height={800}
                className="aspect-[16/9] w-full rounded-2xl object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-lg">
              <Image
                src={LAB_IMG}
                alt="Dental technology and sterile instruments"
                width={900}
                height={700}
                className="aspect-square w-full rounded-2xl object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="flex flex-col justify-center rounded-3xl border border-teal-200 bg-teal-50/60 p-6 shadow-inner">
              <Star className="size-10 text-[#2D8A8A]" />
              <p className="mt-4 text-lg font-bold text-slate-900">
                {CLINIC.rating}/5 cumulative trust from {CLINIC.reviewCount}+
                verified Google reviews—updated as patients speak.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>



      <section className="bg-[#FDFBF7] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] lg:gap-14">
            <SectionReveal className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D8A8A]">
                Why Mangaluru patients stay
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
                Comfortable innovation, disciplined hygiene
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Inspired by world-class hospitality-led clinics—we combine warm
                service design with airtight clinical accountability.
              </p>
              <Button asChild className="mt-8 rounded-xl">
                <Link href="/team">Meet the team</Link>
              </Button>
            </SectionReveal>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  title: "Emergency empathy",
                  text: "Rapid relief for pain, swellings, and trauma—we triage calmly.",
                },
                {
                  title: "Treatment clarity",
                  text: "Understand options, sequencing, and costs before we begin.",
                },
                {
                  title: "Kid-forward zone",
                  text: "Friendly pacing for paediatric visits builds lifelong trust.",
                },
                {
                  title: "Integrated orthodontics",
                  text: "Aligners and braces coexist with restorative planning.",
                },
              ].map((item, idx) => (
                <SectionReveal
                  key={item.title}
                  delay={idx * 0.05}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-lg font-semibold text-slate-950">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm text-slate-600">{item.text}</p>
                </SectionReveal>
              ))}
            </div>
          </div>

          <div
            id="reviews"
            className="relative mt-16 rounded-[2rem] bg-white px-4 py-12 shadow-xl sm:px-8 lg:px-12"
          >
            <ReviewsWall reviews={reviews} />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionReveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D8A8A]">
              Locations
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Visit us Mangaluru — more clinics soon
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Patients travel across Dakshina Kannada for Invisalign consults,
              implant planning, and full-mouth rehab. Expansion discussions are
              in progress—tell us where you&apos;d love a sibling clinic.
            </p>
          </SectionReveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <SectionReveal className="rounded-3xl border border-slate-200 bg-[#FDFBF7] p-8 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-[#2D8A8A]">
                Flagship clinic
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-950">
                {CLINIC.city}
              </h3>
              <p className="mt-3 flex gap-2 text-slate-600">
                <MapPin className="mt-1 size-4 shrink-0 text-[#2D8A8A]" />
                {CLINIC.addressLine}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a
                    href={CLINIC.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Directions
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Book appointment</Link>
                </Button>
              </div>
            </SectionReveal>

            <SectionReveal
              delay={0.05}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-[#2D8A8A]">
                Pandeshwar Branch
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-950">
                Mangaluru
              </h3>
              <p className="mt-3 flex gap-2 text-slate-600">
                <MapPin className="mt-1 size-4 shrink-0 text-[#2D8A8A]" />
                1st Floor, Gateway Complex, Pandeshwar, Mangaluru, Karnataka
                575001
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  {/* Note: Update this href with the actual Google Maps link for the new location */}
                  <a
                    href="https://maps.google.com/?q=Gateway+Complex,+Pandeshwar,+Mangaluru"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Directions
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Book appointment</Link>
                </Button>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#102221] px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle,_rgba(93,227,227,0.25)_0%,_transparent_60%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 text-center lg:flex-row lg:items-center lg:text-left">
          <div className="flex-1 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-teal-200">
              Ready when you are
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Book online, call us, or WhatsApp for same-day coordination.
            </h2>
            <p className="text-teal-100/90">{CLINIC.hoursSummary}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-slate-900 hover:bg-slate-100"
            >
              <Link href="/contact">Secure a slot</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white text-white hover:bg-white/10"
            >
              <a href={CLINIC.whatsapp}>WhatsApp clinic</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
