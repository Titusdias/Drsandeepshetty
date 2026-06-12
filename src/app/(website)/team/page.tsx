import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CLINIC } from "@/lib/site-config";

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: `Our Team | ${CLINIC.name}`,
  description: `Meet the clinicians and care team behind ${CLINIC.name}, ${CLINIC.city}.`,
};

const defaultTeam = [
  {
    name: "Dr. Sandeep Shetty",
    role: "Lead clinician · orthodontics & multi-specialty dentistry",
    bio: "Driving clinical protocols, Invisalign-certified treatment planning, and a patient-calming chairside culture.",
    image:
      "/WhatsApp Image 2026-06-03 at 19.03.10.jpeg",
    slug: "dr-sandeep-shetty",
  },
  {
    name: "Dr. Anjali Shetty",
    role: "Clinician",
    bio: "Dedicated to comprehensive patient care, ensuring comfortable visits and exceptional treatment outcomes.",
    image:
      "/Screenshot 2026-06-03 213443.png",
  },
];

export default async function TeamPage() {
  const query = `*[_type == "page" && slug.current == "team"][0]`;
  const pageData = await client.fetch(query, {}, {
    next: { tags: ["page"] }
  });

  const teamSection = pageData?.pageBuilder?.find((block: any) => block._type === 'teamSection');
  const displayTitle = teamSection?.title || "People who put your smile first";
  
  let team = defaultTeam;
  if (teamSection?.members && teamSection.members.length > 0) {
    team = teamSection.members.map((member: any) => ({
      name: member.name,
      role: member.designation,
      bio: member.bio || "", // Note: Schema doesn't explicitly have bio currently, but just in case
      image: member.profilePicture ? urlForImage(member.profilePicture).url() : "/Screenshot 2026-06-03 213443.png",
      slug: member.slug?.current || null,
    }));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionReveal className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D8A8A]">
          Our team
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          {displayTitle}
        </h1>
        <p className="mt-6 text-lg text-slate-600">
          Behind every procedure is a coordinated team—from sterilization loops to
          front-desk reminders—so visits feel effortless and safe.
        </p>
      </SectionReveal>

      <div className="mx-auto mt-14 grid max-w-4xl gap-8 lg:grid-cols-2">
        {team.map((member: any, i: number) => (
          <SectionReveal key={member.name} delay={i * 0.06} className="flex">
            <Card className="flex flex-col w-full overflow-hidden border-slate-200/90 shadow-lg">
              <div className="relative aspect-[4/3] w-full bg-slate-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <CardContent className="flex flex-col flex-grow space-y-4 p-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{member.name}</h2>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#2D8A8A]">
                    {member.role}
                  </p>
                </div>
                {member.bio && (
                  <p className="text-sm leading-relaxed text-slate-600 flex-grow">
                    {member.bio}
                  </p>
                )}
                {member.slug && (
                  <Button asChild variant="outline" className="w-full mt-4 text-[#2D8A8A] hover:text-[#236b6b] hover:bg-[#2D8A8A]/10 border-[#2D8A8A]/20">
                    <Link href={`/team/${member.slug}`}>Know More</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </SectionReveal>
        ))}
      </div>

      <SectionReveal delay={0.2} className="mx-auto mt-20 max-w-4xl text-center">
        <div className="rounded-2xl bg-slate-50 px-6 py-12 shadow-sm border border-slate-100 sm:px-12 sm:py-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Join Our Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            We are always looking for passionate and dedicated professionals to join our growing clinic. If you are interested in career opportunities, we would love to hear from you.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-[#2D8A8A] hover:bg-[#236b6b]">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="tel:+918244113388">Call Us</Link>
            </Button>
          </div>
        </div>
      </SectionReveal>

    </div>
  );
}
