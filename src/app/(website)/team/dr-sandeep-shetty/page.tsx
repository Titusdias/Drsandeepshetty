import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Dr. Sandeep G. Shetty | ${CLINIC.name}`,
  description: `Learn more about Dr. Sandeep G. Shetty, Lead Clinician at ${CLINIC.name}, his academic background, and his expertise in orthodontics.`,
};

export default function DrSandeepShettyProfile() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <SectionReveal>
        <Button asChild variant="ghost" className="mb-8 -ml-4 text-slate-500 hover:text-slate-900">
          <Link href="/team">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team
          </Link>
        </Button>
      </SectionReveal>

      <div className="grid gap-12 lg:grid-cols-[1fr_2fr] items-start">
        <SectionReveal className="sticky top-24">
          <div className="w-full">
            <img
              src="/WhatsApp Image 2026-06-03 at 19.03.10.jpeg"
              alt="Dr. Sandeep G. Shetty"
              className="w-full h-auto rounded-2xl shadow-md"
            />
          </div>
          <div className="mt-6 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Dr. Sandeep G. Shetty
            </h1>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#2D8A8A]">
              Lead Clinician · Orthodontics & Multi-Specialty Dentistry
            </p>
            <p className="text-slate-600 font-medium">BDS, MDS, PhD (Orthodontics)</p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="prose prose-slate prose-lg max-w-none text-slate-600">
            <p className="text-xl leading-relaxed text-slate-900 font-medium mb-8">
              Dr. Sandeep G. Shetty’s journey in orthodontics is built on a simple belief: every patient deserves care that is honest, precise, and deeply personal.
            </p>
            
            <p>
              After completing his BDS from A.B. Shetty Memorial Institute of Dental Sciences and MDS in Orthodontics and Dentofacial Orthopaedics from Yenepoya Dental College, Dr. Shetty continued to expand his academic and clinical expertise, later earning his PhD in Orthodontics. Over the years, he has evolved from clinician to teacher, researcher, innovator, and mentor, while remaining deeply committed to patient care.
            </p>
            
            <p>
              His academic career at Yenepoya Dental College, Yenepoya (Deemed to be University) spans more than two decades, where he has served in senior teaching and leadership roles, including as Professor and Head of the Department of Orthodontics and Dentofacial Orthopedics. His commitment to international academic collaboration also led to his association with the Adams School of Dentistry, University of North Carolina, Chapel Hill, USA, where he has served as an Adjunct Professor.
            </p>
            
            <p>
              Beyond India, Dr. Shetty’s clinical experience extends internationally through his practice at White Smile Speciality Clinic, Qurum, Muscat, Sultanate of Oman. This global exposure has enriched his approach to orthodontics, allowing him to combine international standards with personalised, patient-friendly care.
            </p>
            
            <p>
              Dr. Shetty is also an Invisalign-certified provider, offering advanced clear aligner solutions for patients seeking discreet, comfortable, and effective smile correction. His expertise includes conventional braces, functional appliances, lingual orthodontics, advanced orthodontic mechanics, and modern aligner-based treatment planning.
            </p>
            
            <p>
              Alongside clinical and academic excellence, Dr. Shetty is a passionate innovator. He is associated with Eishita Healthtech Pvt. Ltd., a healthcare startup incorporated in 2019 and recognised by Startup Karnataka and Startup India. Through this venture, he has contributed to the development of innovative orthodontic solutions, including the SAVE Appliance, a novel device designed for the correction of skeletal Class III malocclusion.
            </p>
            
            <p>
              With multiple patents and numerous national and international publications to his credit, Dr. Shetty continues to contribute actively to the advancement of orthodontics. His research spans areas such as skeletal correction, orthodontic appliances, 3D-printed healthcare materials, nasoalveolar moulding, temporary anchorage devices, clear aligners, and smile aesthetics.
            </p>
            
            <p>
              At his clinic, Dr. Shetty brings together experience, innovation, research, and compassion. Whether treating children, teenagers, or adults, his focus is always on creating healthy, confident smiles through careful diagnosis, ethical guidance, and customised treatment plans.
            </p>
            
            <div className="mt-10 rounded-2xl bg-[#2D8A8A]/5 p-8 border border-[#2D8A8A]/10">
              <p className="text-xl font-medium italic text-[#2D8A8A]">
                &quot;For Dr. Sandeep Shetty, orthodontics is not just about straightening teeth. It is about improving confidence, function, comfort, and quality of life — one smile at a time.&quot;
              </p>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#2D8A8A] hover:bg-[#236b6b]">
                <Link href="/contact">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
