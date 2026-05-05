import { SectionReveal } from "@/components/motion/section-reveal";
import { CLINIC } from "@/lib/site-config";
import { Metadata } from "next";
import { GalleryCarousel } from "@/components/gallery-carousel";

export const metadata: Metadata = {
  title: `Clinic Gallery - ${CLINIC.shortName}`,
  description: `Explore our state-of-the-art facilities and patient transformations at ${CLINIC.shortName}.`,
};

const galleryImages = [
  {
    src: "/IMG_20260501_174645535.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Photo 1",
  },
  {
    src: "/IMG_20260501_174654499.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Photo 2",
  },
  {
    src: "/IMG_20260501_174726355.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Photo 3",
  },
  {
    src: "/IMG_20260501_174734529.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Photo 4",
  },
  {
    src: "/IMG_20260501_174739396.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Photo 5",
  },
  {
    src: "/IMG_20260501_174748257.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Photo 6",
  },
  {
    src: "/IMG_20260501_174833269.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Photo 7",
  },
  {
    src: "/IMG_20260501_174847077.jpg.jpeg",
    alt: "Dr. Sandeep Shetty Dental Clinic - Photo 8",
  },
];

export default function GalleryPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-[#FDFBF7] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
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

      <section className="bg-white py-16 sm:py-20 overflow-hidden">
        <div className="mx-auto w-full px-4 sm:px-6">
          <SectionReveal delay={0.1}>
            <GalleryCarousel images={galleryImages} />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
