"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionReveal } from "@/components/motion/section-reveal";

const testimonialImages = [
  {
    src: "/testomonials/WhatsApp Image 2026-05-27 at 09.08.57 (1).jpeg",
    alt: "Testimonial 1",
    objectPosition: "object-center",
  },
  {
    src: "/testomonials/WhatsApp Image 2026-05-27 at 09.08.57.jpeg",
    alt: "Testimonial 2",
    objectPosition: "object-center",
  },
  {
    src: "/testomonials/WhatsApp Image 2026-05-27 at 09.14.52.jpeg",
    alt: "Testimonial 3",
  },
  {
    src: "/testomonials/WhatsApp Image 2026-05-27 at 09.19.49 (1).jpeg",
    alt: "Testimonial 4",
  },
  {
    src: "/testomonials/WhatsApp Image 2026-05-27 at 09.19.49 (2).jpeg",
    alt: "Testimonial 5",
  },
  {
    src: "/testomonials/WhatsApp Image 2026-05-27 at 09.20.16.jpeg",
    alt: "Testimonial 6",
  },
];

const achievementImages = [
  {
    src: "/Achivements/IMG_20260501_174645535.jpg.jpeg",
    alt: "Achievement 1",
  },
  {
    src: "/Achivements/IMG_20260501_174654499.jpg.jpeg",
    alt: "Achievement 2",
  },
  {
    src: "/Achivements/IMG_20260501_174726355.jpg.jpeg",
    alt: "Achievement 3",
  },
  {
    src: "/Achivements/IMG_20260501_174734529.jpg.jpeg",
    alt: "Achievement 4",
  },
  {
    src: "/Achivements/IMG_20260501_174739396.jpg.jpeg",
    alt: "Achievement 5",
  },
  {
    src: "/Achivements/IMG_20260501_174748257.jpg.jpeg",
    alt: "Achievement 6",
  },
  {
    src: "/Achivements/IMG_20260501_174833269.jpg.jpeg",
    alt: "Achievement 7",
  },
  {
    src: "/Achivements/IMG_20260501_174847077.jpg.jpeg",
    alt: "Achievement 8",
  },
  {
    src: "/Achivements/WhatsApp Image 2026-05-27 at 09.19.48 (1).jpeg",
    alt: "Achievement 9",
  },
  {
    src: "/Achivements/WhatsApp Image 2026-05-27 at 09.22.20.jpeg",
    alt: "Achievement 10",
  },
];

const successStories = [
  {
    src: "/sucess stories/WhatsApp Image 2026-05-27 at 09.08.56.jpeg",
    alt: "Success Story 2",
  },
  {
    src: "/sucess stories/WhatsApp Image 2026-05-27 at 09.09.04.jpeg",
    alt: "Success Story 3",
  },
  {
    src: "/sucess stories/WhatsApp Image 2026-05-27 at 09.14.51.jpeg",
    alt: "Success Story 4",
  },
  {
    src: "/sucess stories/WhatsApp Image 2026-05-27 at 09.19.48.jpeg",
    alt: "Success Story 5",
  },
  {
    src: "/sucess stories/WhatsApp Image 2026-05-27 at 09.19.49.jpeg",
    alt: "Success Story 6",
  },
  {
    src: "/sucess stories/WhatsApp Image 2026-05-27 at 09.23.09.jpeg",
    alt: "Success Story 7",
    objectPosition: "object-center",
  },
  {
    src: "/sucess stories/WhatsApp Image 2026-05-27 at 09.25.18.jpeg",
    alt: "Success Story 8",
  },
];

type GalleryImageProps = {
  src: string;
  alt: string;
  naturalSize?: boolean;
  objectPosition?: string;
};

function GalleryImage({ src, alt, naturalSize, objectPosition }: GalleryImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (naturalSize) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200/50 group">
        <Image
          src={encodeURI(src)}
          alt={alt}
          width={0}
          height={0}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`w-full h-auto transition-all duration-500 group-hover:scale-105 ${
            isLoading ? "blur-sm" : "blur-0"
          }`}
          onLoadingComplete={() => setIsLoading(false)}
          loading="lazy"
        />
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100 animate-pulse" />
        )}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200/50 aspect-[4/3] group">
      <Image
        src={encodeURI(src)}
        alt={alt}
        fill
        className={`object-cover ${objectPosition || "object-top"} transition-all duration-500 group-hover:scale-105 ${
          isLoading ? "blur-sm" : "blur-0"
        }`}
        onLoadingComplete={() => setIsLoading(false)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading="lazy"
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100 animate-pulse" />
      )}
    </div>
  );
}

function GallerySection({
  title,
  description,
  accent,
  images,
  naturalSize,
}: {
  title: string;
  description?: string;
  accent: string;
  images: { src: string; alt: string; naturalSize?: boolean; objectPosition?: string }[];
  naturalSize?: boolean;
}) {
  return (
    <section className="py-16 sm:py-20 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionReveal delay={0.05}>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">{title}</h2>
            {description && <p className="mt-3 text-lg text-slate-600">{description}</p>}
            <div
              className={`mt-4 h-1 w-20 rounded-full bg-gradient-to-r ${accent}`}
            />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, i) => (
              <GalleryImage 
                key={`${title}-${i}`} 
                src={image.src} 
                alt={image.alt} 
                naturalSize={image.naturalSize || naturalSize} 
                objectPosition={image.objectPosition} 
              />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

export default function GallerySections() {
  return (
    <>
      <GallerySection
        title="Patient Testimonials"
        accent="from-blue-500 to-blue-600"
        images={testimonialImages}
      />

      <GallerySection
        title="Our Achievements"
        description="Milestones and recognitions that showcase our commitment to excellence."
        accent="from-amber-500 to-amber-600"
        images={achievementImages}
        naturalSize={true}
      />

      <GallerySection
        title="Success Stories"
        accent="from-green-500 to-green-600"
        images={successStories}
      />
    </>
  );
}
