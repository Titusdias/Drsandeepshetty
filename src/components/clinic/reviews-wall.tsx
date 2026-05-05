"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/site-config";

export type ReviewItem = {
  name: string;
  quote: string;
  featured?: boolean;
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function StarRow() {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </div>
  );
}

function ReviewCard({ item }: { item: ReviewItem }) {
  return (
    <div
      className={`flex h-full min-h-[200px] flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${
        item.featured
          ? "border-[#2D8A8A]/40 ring-1 ring-[#2D8A8A]/20"
          : "border-slate-200/80"
      }`}
    >
      <StarRow />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
        &ldquo;{item.quote}&rdquo;
      </p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {item.name}
      </p>
      <p className="mt-1 text-[11px] text-slate-400">Google review · Mangaluru</p>
    </div>
  );
}

export function ReviewsWall({ reviews }: { reviews: ReviewItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 5200, stopOnInteraction: true })],
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D8A8A]">
            Wall of love
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Google reviews from Mangaluru patients
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Real feedback from families who trust our clinic for advanced dental
            and orthodontic care.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <div className="flex items-baseline gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <span className="text-4xl font-bold text-slate-900">4.9</span>
            <div>
              <StarRow />
              <p className="mt-1 text-xs font-medium text-slate-500">
                Overall on Google
              </p>
            </div>
          </div>
          <Button variant="outline" size="lg" className="rounded-xl" asChild>
            <a href={CLINIC.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              Leave a review
              <ExternalLink className="size-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Desktop: 3-column masonry-style grid */}
      <div className="hidden gap-5 lg:grid lg:grid-cols-3">
        {reviews.map((item) => (
          <div key={item.name} className={item.featured ? "lg:row-span-1" : ""}>
            <ReviewCard item={item} />
          </div>
        ))}
      </div>

      {/* Mobile / tablet: carousel */}
      <div className="lg:hidden">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex gap-4">
            {reviews.map((item) => (
              <div
                className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_70%]"
                key={`${item.name}-carousel`}
              >
                <ReviewCard item={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
            aria-label="Next reviews"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
