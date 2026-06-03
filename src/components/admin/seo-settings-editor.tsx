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

const seoSchema = z.object({
  homeTitle: z.string().optional().transform(emptyToUndefined),
  homeDescription: z.string().optional().transform(emptyToUndefined),
  aboutTitle: z.string().optional().transform(emptyToUndefined),
  aboutDescription: z.string().optional().transform(emptyToUndefined),
  servicesTitle: z.string().optional().transform(emptyToUndefined),
  servicesDescription: z.string().optional().transform(emptyToUndefined),
  contactTitle: z.string().optional().transform(emptyToUndefined),
  contactDescription: z.string().optional().transform(emptyToUndefined),
});


type SeoFormData = z.infer<typeof seoSchema>;

export function SeoSettingsEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<SeoFormData>({
    resolver: zodResolver(seoSchema),
  });

  const previewValues = watch();
  const previewData = {
    homeTitle: previewValues.homeTitle || "Expert Dental Care | Dr. Sandeep Shetty",
    homeDescription:
      previewValues.homeDescription || "Professional dental care with modern techniques and a calm environment.",
    aboutTitle: previewValues.aboutTitle || "About Dr. Sandeep Shetty Dental Clinic",
    aboutDescription:
      previewValues.aboutDescription || "Learn about our experienced team and modern orthodontic treatments.",
    servicesTitle: previewValues.servicesTitle || "Dental Services | Orthodontics & Cosmetic Dentistry",
    servicesDescription:
      previewValues.servicesDescription || "Comprehensive dental services including orthodontics, cosmetic, and restorative treatments.",
    contactTitle: previewValues.contactTitle || "Contact Us | Book Your Appointment",
    contactDescription:
      previewValues.contactDescription || "Reach out to schedule your next dental appointment at our clinic.",
  };

  useEffect(() => {
    const loadSeo = async () => {
      try {
        const seo = await getDocument<SeoFormData>("seo", "default");
        if (seo) {
          reset(seo);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load SEO settings");
      } finally {
        setLoading(false);
      }
    };

    loadSeo();
  }, [reset]);

  const onSubmit = async (data: SeoFormData) => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await setDocument("seo", "default", data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save SEO settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="border-slate-200/90 p-8">
        <p className="text-sm text-slate-600">Loading SEO settings…</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <Card className="border-slate-200/90 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">SEO settings</h2>
        <p className="mt-2 text-sm text-slate-600">
          Customize page titles and meta descriptions for search engines.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
        {/* Home Page */}
        <div className="border-b border-slate-200 pb-6">
          <h3 className="text-lg font-semibold text-slate-900">Homepage</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Page title</label>
              <input
                {...register("homeTitle")}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
                placeholder="Expert Dental Care | Dr. Sandeep Shetty"
              />
              {errors.homeTitle && <p className="mt-1 text-xs text-red-600">{errors.homeTitle.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Meta description</label>
              <textarea
                {...register("homeDescription")}
                rows={2}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
                placeholder="Professional dental care with modern techniques and a calm environment."
              />
              {errors.homeDescription && (
                <p className="mt-1 text-xs text-red-600">{errors.homeDescription.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* About Page */}
        <div className="border-b border-slate-200 pb-6">
          <h3 className="text-lg font-semibold text-slate-900">About page</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Page title</label>
              <input
                {...register("aboutTitle")}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
                placeholder="About Us | Dr. Sandeep Shetty Dental Clinic"
              />
              {errors.aboutTitle && <p className="mt-1 text-xs text-red-600">{errors.aboutTitle.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Meta description</label>
              <textarea
                {...register("aboutDescription")}
                rows={2}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
                placeholder="Learn about Dr. Sandeep Shetty and our team's commitment to excellence."
              />
              {errors.aboutDescription && (
                <p className="mt-1 text-xs text-red-600">{errors.aboutDescription.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Services Page */}
        <div className="border-b border-slate-200 pb-6">
          <h3 className="text-lg font-semibold text-slate-900">Services page</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Page title</label>
              <input
                {...register("servicesTitle")}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
                placeholder="Dental Services | Orthodontics & Cosmetic Dentistry"
              />
              {errors.servicesTitle && (
                <p className="mt-1 text-xs text-red-600">{errors.servicesTitle.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Meta description</label>
              <textarea
                {...register("servicesDescription")}
                rows={2}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
                placeholder="Comprehensive dental services including orthodontics, cosmetic, and restorative treatments."
              />
              {errors.servicesDescription && (
                <p className="mt-1 text-xs text-red-600">{errors.servicesDescription.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Page */}
        <div className="pb-6">
          <h3 className="text-lg font-semibold text-slate-900">Contact page</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Page title</label>
              <input
                {...register("contactTitle")}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
                placeholder="Contact Us | Book Your Appointment"
              />
              {errors.contactTitle && (
                <p className="mt-1 text-xs text-red-600">{errors.contactTitle.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Meta description</label>
              <textarea
                {...register("contactDescription")}
                rows={2}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
                placeholder="Contact Dr. Sandeep Shetty Dental Clinic to schedule your appointment today."
              />
              {errors.contactDescription && (
                <p className="mt-1 text-xs text-red-600">{errors.contactDescription.message}</p>
              )}
            </div>
          </div>
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        {success && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">✓ SEO settings saved successfully</p>}

        <Button type="submit" disabled={saving} className="w-full rounded-xl sm:w-auto">
          {saving ? "Saving…" : "Save SEO settings"}
        </Button>
      </form>
    </Card>

    <PreviewPanel title="SEO preview" description="See how your titles and descriptions will appear in search results.">
      <div className="space-y-4">
        <div className="rounded-3xl border border-white/10 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-teal-300">Home page</p>
          <h4 className="mt-3 text-lg font-semibold text-white">{previewData.homeTitle}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{previewData.homeDescription}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-teal-300">About page</p>
          <h4 className="mt-3 text-lg font-semibold text-white">{previewData.aboutTitle}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{previewData.aboutDescription}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-teal-300">Services page</p>
          <h4 className="mt-3 text-lg font-semibold text-white">{previewData.servicesTitle}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{previewData.servicesDescription}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-teal-300">Contact page</p>
          <h4 className="mt-3 text-lg font-semibold text-white">{previewData.contactTitle}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{previewData.contactDescription}</p>
        </div>
      </div>
    </PreviewPanel>
  </div>
  );
}
