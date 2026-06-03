import { CLINIC } from "@/lib/site-config";
import GallerySections from "@/components/gallery/gallery-sections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Clinic Gallery - ${CLINIC.shortName}`,
  description: `Explore our patient testimonials, achievements, and success stories at ${CLINIC.shortName}.`,
};

export default function GalleryPage() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-[#FDFBF7] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Gallery
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Explore our patient testimonials, achievements, and success stories.
            </p>
          </div>
        </div>
      </section>

      <GallerySections />
    </main>
  );
}
