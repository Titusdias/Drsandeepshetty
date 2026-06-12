import { CLINIC } from "@/lib/site-config";
import GallerySections from "@/components/gallery/gallery-sections";
import { Metadata } from "next";

import { client } from "@/sanity/lib/client";

export const metadata: Metadata = {
  title: `Clinic Gallery - ${CLINIC.shortName}`,
  description: `Explore our patient testimonials, achievements, and success stories at ${CLINIC.shortName}.`,
};

export default async function GalleryPage() {
  const query = `*[_type == "page" && slug.current == "gallery"][0]`;
  const pageData = await client.fetch(query, {}, {
    next: { tags: ["page"] }
  });

  const gallerySections = pageData?.pageBuilder?.filter((block: any) => block._type === 'gallerySection') || [];
  // Use first gallery section title if available
  const displayTitle = gallerySections[0]?.title || "Gallery";

  return (
    <main>
      <section className="border-b border-slate-200 bg-[#FDFBF7] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {displayTitle}
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Explore our patient testimonials, achievements, and success stories.
            </p>
          </div>
        </div>
      </section>

      <GallerySections sanityData={gallerySections} />
    </main>
  );
}
