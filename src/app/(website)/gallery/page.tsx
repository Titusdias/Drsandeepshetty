import { CLINIC } from "@/lib/site-config";
import GallerySections from "@/components/gallery/gallery-sections";
import { Metadata } from "next";

import { client } from "@/sanity/lib/client";
import { galleryItemsQuery, galleryPageQuery, sanityFetchOptions } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: `Clinic Gallery - ${CLINIC.shortName}`,
  description: `Explore our patient testimonials, achievements, and success stories at ${CLINIC.shortName}.`,
};

export default async function GalleryPage() {
  const [page, galleryItems] = await Promise.all([
    client.fetch(galleryPageQuery, {}, sanityFetchOptions("gallery")),
    client.fetch(galleryItemsQuery, {}, sanityFetchOptions("gallery")),
  ]);

  return (
    <main>
      <section className="border-b border-slate-200 bg-[#FDFBF7] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            {page?.hero_sectionLabel && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D8A8A]">
                {page.hero_sectionLabel}
              </p>
            )}
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {page?.hero_heading || "Gallery"}
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              {page?.hero_subheading || "Explore our patient testimonials, achievements, and success stories."}
            </p>
          </div>
        </div>
      </section>

      <GallerySections sanityData={galleryItems} />
    </main>
  );
}
