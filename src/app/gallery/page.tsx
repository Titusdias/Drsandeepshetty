import Image from "next/image";

import { SectionReveal } from "@/components/motion/section-reveal";
import { CLINIC } from "@/lib/site-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Clinic Gallery - ${CLINIC.shortName}`,
  description: `Explore our state-of-the-art facilities and patient transformations at ${CLINIC.shortName}.`,
};

const galleryImages = [
  {
    src: "/IMG_20260501_174645535.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Main Reception",
  },
  {
    src: "/IMG_20260501_174654499.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Waiting Area",
  },
  {
    src: "/IMG_20260501_174726355.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Operating Room",
  },
  {
    src: "/IMG_20260501_174734529.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Equipment",
  },
  {
    src: "/IMG_20260501_174739396.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Hallway",
  },
  {
    src: "/IMG_20260501_174748257.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Facility",
  },
  {
    src: "/IMG_20260501_174833269.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Tools",
  },
  {
    src: "/IMG_20260501_174847077.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Chair",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.08.56.jpeg",
    alt: "Clinic Image 1",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.08.57 (1).jpeg",
    alt: "Clinic Image 2",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.08.57.jpeg",
    alt: "Clinic Image 3",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.09.04.jpeg",
    alt: "Clinic Image 4",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.14.51.jpeg",
    alt: "Clinic Image 5",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.14.52.jpeg",
    alt: "Clinic Image 6",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.19.48 (1).jpeg",
    alt: "Clinic Image 7",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.19.48.jpeg",
    alt: "Clinic Image 8",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.19.49 (1).jpeg",
    alt: "Clinic Image 9",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.19.49 (2).jpeg",
    alt: "Clinic Image 10",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.19.49.jpeg",
    alt: "Clinic Image 11",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.20.16.jpeg",
    alt: "Clinic Image 12",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.22.20.jpeg",
    alt: "Clinic Image 13",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.23.09.jpeg",
    alt: "Clinic Image 14",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.24.43.jpeg",
    alt: "Clinic Image 15",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.25.18.jpeg",
    alt: "Clinic Image 16",
  },
  {
    src: "/dr/WhatsApp Image 2026-05-27 at 09.31.43.jpeg",
    alt: "Clinic Image 17",
  },
];

export default function GalleryPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-[#FDFBF7] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionReveal className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Clinic Gallery
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Take a virtual tour of our modern, thoughtfully designed facilities at{" "}
              {CLINIC.name}. We&apos;ve built an environment centered around patient comfort and advanced care.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionReveal delay={0.1}>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {galleryImages.map((image, i) => (
                <div 
                  key={i} 
                  className="break-inside-avoid overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200/50"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
