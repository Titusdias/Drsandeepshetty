import { CLINIC } from "@/lib/site-config";
import GallerySections from "@/components/gallery/gallery-sections";
import { Metadata } from "next";

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { galleryItemsQuery, galleryPageQuery, sanityFetchOptions } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: `Clinic Gallery - ${CLINIC.shortName}`,
  description: `Explore our patient testimonials, achievements, and success stories at ${CLINIC.shortName}.`,
};

const categoryMeta: Record<string, { title: string; description?: string }> = {
  "before-after": { title: "Before & After", description: "Real patient transformations." },
  clinic: { title: "Our Clinic", description: "A look inside our practice." },
  team: { title: "Our Team", description: "The people behind your smile." },
  procedures: { title: "Procedures", description: "Treatments and clinical work." },
};

type GalleryItem = {
  title?: string;
  image?: Parameters<typeof urlForImage>[0];
  altText?: string;
  category?: string;
};

export default async function GalleryPage() {
  const [page, items] = await Promise.all([
    client.fetch(galleryPageQuery, {}, sanityFetchOptions("gallery")),
    client.fetch(galleryItemsQuery, {}, sanityFetchOptions("gallery")) as Promise<GalleryItem[]>,
  ]);

  const byCategory: Record<string, GalleryItem[]> = {};
  for (const item of items ?? []) {
    const key = item.category || "clinic";
    if (!byCategory[key]) byCategory[key] = [];
    byCategory[key].push(item);
  }

  const grouped = Object.entries(byCategory).map(([category, categoryItems]) => ({
    title: categoryMeta[category]?.title ?? category,
    description: categoryMeta[category]?.description,
    images: categoryItems
      .filter((item) => item.image)
      .map((item) => ({
        src: urlForImage(item.image!).url(),
        alt: item.altText || item.title || category,
      })),
  }));

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

      <GallerySections sanityData={grouped.length > 0 ? grouped : undefined} />
    </main>
  );
}
