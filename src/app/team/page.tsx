import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CLINIC } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Our Team | ${CLINIC.name}`,
  description: `Meet the clinicians and care team behind ${CLINIC.name}, ${CLINIC.city}.`,
};

const team = [
  {
    name: "Dr. Sandeep Shetty",
    role: "Lead clinician · orthodontics & multi-specialty dentistry",
    bio: "Driving clinical protocols, Invisalign-certified treatment planning, and a patient-calming chairside culture.",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Hygiene & assistant team",
    role: "Sterilization · chairside assistants",
    bio: "Dedicated to painless visits, immaculate operatories, and smooth coordination across procedures.",
    image:
      "https://images.unsplash.com/photo-1588776814546-d9d6e6d4c5bf?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Front-office coordinators",
    role: "Scheduling · insurance coordination",
    bio: "Helping families book thoughtfully, minimise wait times, and stay informed via phone or WhatsApp.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
  },
];

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionReveal className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D8A8A]">
          Our team
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          People who put your smile first
        </h1>
        <p className="mt-6 text-lg text-slate-600">
          Behind every procedure is a coordinated team—from sterilization loops to
          front-desk reminders—so visits feel effortless and safe.
        </p>
      </SectionReveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {team.map((member, i) => (
          <SectionReveal key={member.name} delay={i * 0.06}>
            <Card className="h-full overflow-hidden border-slate-200/90 shadow-lg">
              <div className="relative aspect-[4/3] w-full bg-slate-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <CardContent className="space-y-2 p-6">
                <h2 className="text-lg font-bold text-slate-900">{member.name}</h2>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#2D8A8A]">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-slate-600">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          </SectionReveal>
        ))}
      </div>

      <SectionReveal
        delay={0.15}
        className="mt-16 rounded-3xl bg-[#0f172a] px-8 py-10 text-center text-white shadow-xl"
      >
        <p className="text-lg font-semibold">Careers & collaborations</p>
        <p className="mt-2 text-sm text-slate-300">
          Looking to join a growing Mangaluru practice? Reach out with your CV on
          WhatsApp—we&apos;d love to meet aligned clinicians.
        </p>
        <Button asChild className="mt-6 rounded-xl bg-white text-slate-900 hover:bg-slate-100">
          <Link href="/contact">Contact the clinic</Link>
        </Button>
      </SectionReveal>
    </div>
  );
}
