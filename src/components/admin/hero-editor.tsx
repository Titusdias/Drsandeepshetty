"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCollection, setDocument } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PreviewPanel } from "@/components/admin/preview-panel";
import type { HeroSection } from "@/lib/types";

const emptyToUndefined = (v: string | undefined) => {
  if (v === undefined) return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
};

const heroSchema = z.object({
  title: z.string().optional().transform(emptyToUndefined),
  subtitle: z.string().optional().transform(emptyToUndefined),
  tagline: z.string().optional().transform(emptyToUndefined),
  ctaText: z.string().optional().transform(emptyToUndefined),
  ctaLink: z.string().optional().transform(emptyToUndefined),
  heroImageUrl: z
    .string()
    .optional()
    .transform(emptyToUndefined)
    .refine((v) => v === undefined || /^https?:\/\//i.test(v) || v.startsWith("/"), {
      message: "Valid image URL is required",
    })
    .optional(),
  heroVisualUrl: z
    .string()
    .optional()
    .transform(emptyToUndefined)
    .refine((v) => v === undefined || /^https?:\/\//i.test(v) || v.startsWith("/"), {
      message: "Valid visual URL is required",
    })
    .optional(),
});


type HeroFormData = z.infer<typeof heroSchema>;

export function HeroEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<HeroFormData>({
    resolver: zodResolver(heroSchema),
  });

  const previewValues = watch();
  const previewData = {
    title: previewValues.title || "Exceptional dental care in your city.",
    subtitle: previewValues.subtitle || "Clinic tagline goes here.",
    tagline:
      previewValues.tagline || "A modern, minimally stressful clinic experience with advanced dental care.",
    ctaText: previewValues.ctaText || "Book your visit",
    ctaLink: previewValues.ctaLink || "/contact",
    heroImageUrl: previewValues.heroImageUrl || "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80",
    heroVisualUrl: previewValues.heroVisualUrl || "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80",
  };

  useEffect(() => {
    const loadHero = async () => {
      try {
        const heroes = await getCollection<HeroSection>("hero");
        if (heroes.length > 0) {
          const hero = heroes[0] as HeroSection;
          reset({
            title: hero.title,
            subtitle: hero.subtitle,
            tagline: hero.tagline,
            ctaText: hero.ctaText,
            ctaLink: hero.ctaLink,
            heroImageUrl: hero.heroImageUrl,
            heroVisualUrl: hero.heroVisualUrl,
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load hero section");
      } finally {
        setLoading(false);
      }
    };

    loadHero();
  }, [reset]);

  const onSubmit = async (data: HeroFormData) => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await setDocument("hero", "hero-1", {
        ...data,
        id: "hero-1",
        order: 0,
        heroImageAlt: "Dental clinic hero image",
        heroVisualAlt: "Advanced dental treatment",
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save hero section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="border-slate-200/90 p-8">
        <p className="text-sm text-slate-600">Loading hero section…</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <Card className="border-slate-200/90 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">Homepage hero section</h2>
        <p className="mt-2 text-sm text-slate-600">
          Edit the main banner and headline that visitors see when they land on your website.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Main title</label>
            <input
              {...register("title")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              placeholder="Exceptional dental care in [city]."
            />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Subtitle</label>
            <input
              {...register("subtitle")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              placeholder="Clinic tagline"
            />
            {errors.subtitle && <p className="mt-1 text-xs text-red-600">{errors.subtitle.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">Main tagline</label>
          <textarea
            {...register("tagline")}
            rows={3}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            placeholder="A modern, minimally stressful clinic experience…"
          />
          {errors.tagline && <p className="mt-1 text-xs text-red-600">{errors.tagline.message}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Call-to-action text</label>
            <input
              {...register("ctaText")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              placeholder="Book your visit"
            />
            {errors.ctaText && <p className="mt-1 text-xs text-red-600">{errors.ctaText.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Call-to-action link</label>
            <input
              {...register("ctaLink")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              placeholder="/contact"
            />
            {errors.ctaLink && <p className="mt-1 text-xs text-red-600">{errors.ctaLink.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-700">Images</h3>
          <p className="text-xs text-slate-500">
            heroImageUrl: Background image, heroVisualUrl: Overlay visual
          </p>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Hero background image URL</label>
            <input
              {...register("heroImageUrl")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              placeholder="https://images.unsplash.com/…"
            />
            {errors.heroImageUrl && (
              <p className="mt-1 text-xs text-red-600">{errors.heroImageUrl.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Hero visual/overlay URL</label>
            <input
              {...register("heroVisualUrl")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              placeholder="https://images.unsplash.com/…"
            />
            {errors.heroVisualUrl && (
              <p className="mt-1 text-xs text-red-600">{errors.heroVisualUrl.message}</p>
            )}
          </div>
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        {success && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">✓ Hero section saved successfully</p>}

        <Button type="submit" disabled={saving} className="w-full rounded-xl sm:w-auto">
          {saving ? "Saving…" : "Save hero section"}
        </Button>
      </form>
    </Card>

    <PreviewPanel title="Mobile hero preview" description="See how your hero content will look before saving.">
      <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-900">
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${previewData.heroImageUrl})` }}
        />
        <div className="p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-teal-300">Clinic hero</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">{previewData.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{previewData.tagline}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={previewData.ctaLink}
              className="inline-flex rounded-full bg-[#2D8A8A] px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#237170]"
            >
              {previewData.ctaText}
            </a>
            <p className="text-xs text-slate-400">{previewData.subtitle}</p>
          </div>
        </div>
      </div>
    </PreviewPanel>
  </div>
  );
}
