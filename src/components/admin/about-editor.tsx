"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getDocument, setDocument } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PreviewPanel } from "@/components/admin/preview-panel";

const emptyToUndefined = (v: string | undefined) => {
  if (v === undefined) return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
};

const aboutSchema = z.object({
  title: z.string().optional().transform(emptyToUndefined),
  subtitle: z.string().optional().transform(emptyToUndefined),
  description: z.string().optional().transform(emptyToUndefined),
  philosophy: z.string().optional().transform(emptyToUndefined),
});


type AboutFormData = z.infer<typeof aboutSchema>;

export function AboutEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema),
  });

  const previewValues = watch();
  const previewData = {
    title: previewValues.title || "About our clinic",
    subtitle: previewValues.subtitle || "Our story and mission",
    description: previewValues.description || "Tell your clinic's story.",
    philosophy: previewValues.philosophy || "What drives your approach to patient care?",
  };

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const about = await getDocument<AboutFormData>("about", "default");
        if (about) {
          reset(about);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load about content");
      } finally {
        setLoading(false);
      }
    };

    loadAbout();
  }, [reset]);

  const onSubmit = async (data: AboutFormData) => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await setDocument("about", "default", data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save about content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="border-slate-200/90 p-8">
        <p className="text-sm text-slate-600">Loading about content…</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <Card className="border-slate-200/90 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">About page content</h2>
        <p className="mt-2 text-sm text-slate-600">
          Share your clinic's story, philosophy, and what makes you unique.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Page title</label>
            <input
              {...register("title")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              placeholder="About our clinic"
            />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Subtitle</label>
            <input
              {...register("subtitle")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              placeholder="Our story and mission"
            />
            {errors.subtitle && <p className="mt-1 text-xs text-red-600">{errors.subtitle.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            placeholder="Tell your clinic's story"
          />
          {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">Clinic philosophy</label>
          <textarea
            {...register("philosophy")}
            rows={4}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            placeholder="What drives your approach to patient care?"
          />
          {errors.philosophy && <p className="mt-1 text-xs text-red-600">{errors.philosophy.message}</p>}
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        {success && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">✓ About content saved successfully</p>}

        <Button type="submit" disabled={saving} className="w-full rounded-xl sm:w-auto">
          {saving ? "Saving…" : "Save about content"}
        </Button>
      </form>
    </Card>

    <PreviewPanel title="About page preview" description="See the about section content before saving.">
      <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-teal-300">About section</p>
        <h3 className="mt-4 text-2xl font-semibold text-white">{previewData.title}</h3>
        <p className="mt-2 text-sm text-slate-300">{previewData.subtitle}</p>
        <div className="mt-4 space-y-4 text-slate-100">
          <p>{previewData.description}</p>
          <blockquote className="rounded-2xl border-l-4 border-teal-400 bg-slate-950/90 p-4 text-sm italic text-slate-300">
            {previewData.philosophy}
          </blockquote>
        </div>
      </div>
    </PreviewPanel>
  </div>
  );
}
