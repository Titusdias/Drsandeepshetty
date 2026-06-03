"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setDocument, getDocument } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PreviewPanel } from "@/components/admin/preview-panel";
import type { ClinicSettings } from "@/lib/types";

const emptyToUndefined = (v: string | undefined) => {
  if (v === undefined) return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
};

const optionalUrl = (message: string) =>
  z
    .string()
    .optional()
    .transform(emptyToUndefined)
    .refine((v) => v === undefined || /^https?:\/\//i.test(v), { message });

const settingsSchema = z.object({
  name: z.string().optional().transform(emptyToUndefined),
  shortName: z.string().optional().transform(emptyToUndefined),
  tagline: z.string().optional().transform(emptyToUndefined),
  phoneDisplay: z.string().optional().transform(emptyToUndefined),
  phoneTel: z.string().optional().transform(emptyToUndefined),
  phoneDisplay2: z.string().optional().transform(emptyToUndefined),
  phoneTel2: z.string().optional().transform(emptyToUndefined),
  whatsapp: optionalUrl("Valid WhatsApp URL is required"),
  addressLine: z.string().optional().transform(emptyToUndefined),
  addressLine2: z.string().optional().transform(emptyToUndefined),
  hoursSummary: z.string().optional().transform(emptyToUndefined),
  rating: z.number().min(0).max(5).optional().default(0),
  reviewCount: z.number().min(0).optional().default(0),
  socialInstagram: optionalUrl("Valid Instagram URL is required"),
  socialFacebook: optionalUrl("Valid Facebook URL is required"),
});


type SettingsFormData = z.infer<typeof settingsSchema>;

export function ContactSettingsEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
  });

  const previewValues = watch();
  const previewData = {
    name: previewValues.name || "Dr. Sandeep Shetty Dental Clinic",
    tagline: previewValues.tagline || "Dental & Orthodontic clinic in Mangaluru",
    phoneDisplay: previewValues.phoneDisplay || "+91 82441 13388",
    phoneDisplay2: previewValues.phoneDisplay2 || "+91 74111 33575",
    whatsapp: previewValues.whatsapp || "https://wa.me/+918244113388",
    hoursSummary: previewValues.hoursSummary || "Mon–Sat · 10:00 AM – 8:00 PM",
    addressLine: previewValues.addressLine || "ABC Street, Mangaluru",
    addressLine2: previewValues.addressLine2 || "Second Clinic Address",
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getDocument<ClinicSettings>("settings", "default");
        if (settings) {
          reset({
            name: settings.name,
            shortName: settings.shortName,
            tagline: settings.tagline,
            phoneDisplay: settings.phoneDisplay,
            phoneTel: settings.phoneTel,
            phoneDisplay2: settings.phoneDisplay2,
            phoneTel2: settings.phoneTel2,
            whatsapp: settings.whatsapp,
            addressLine: settings.addressLine,
            addressLine2: settings.addressLine2,
            hoursSummary: settings.hoursSummary,
            rating: settings.rating,
            reviewCount: settings.reviewCount,
            socialInstagram: settings.socialInstagram,
            socialFacebook: settings.socialFacebook,
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [reset]);

  const onSubmit = async (data: SettingsFormData) => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await setDocument("settings", "default", data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="border-slate-200/90 p-8">
        <p className="text-sm text-slate-600">Loading settings…</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <Card className="border-slate-200/90 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">Clinic contact & settings</h2>
        <p className="mt-2 text-sm text-slate-600">Update clinic info, phone numbers, addresses, and social links.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Clinic full name</label>
            <input
              {...register("name")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Short name</label>
            <input
              {...register("shortName")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            />
            {errors.shortName && <p className="mt-1 text-xs text-red-600">{errors.shortName.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">Tagline</label>
          <input
            {...register("tagline")}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
          />
          {errors.tagline && <p className="mt-1 text-xs text-red-600">{errors.tagline.message}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Phone 1 (display)</label>
            <input
              {...register("phoneDisplay")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            />
            {errors.phoneDisplay && <p className="mt-1 text-xs text-red-600">{errors.phoneDisplay.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Phone 1 (tel link)</label>
            <input
              {...register("phoneTel")}
              placeholder="tel:+918244113388"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            />
            {errors.phoneTel && <p className="mt-1 text-xs text-red-600">{errors.phoneTel.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Phone 2 (display)</label>
            <input
              {...register("phoneDisplay2")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            />
            {errors.phoneDisplay2 && <p className="mt-1 text-xs text-red-600">{errors.phoneDisplay2.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Phone 2 (tel link)</label>
            <input
              {...register("phoneTel2")}
              placeholder="tel:+917411133575"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            />
            {errors.phoneTel2 && <p className="mt-1 text-xs text-red-600">{errors.phoneTel2.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">WhatsApp link</label>
          <input
            {...register("whatsapp")}
            placeholder="https://wa.me/+917411133575"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
          />
          {errors.whatsapp && <p className="mt-1 text-xs text-red-600">{errors.whatsapp.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">Address 1 (main clinic)</label>
          <input
            {...register("addressLine")}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
          />
          {errors.addressLine && <p className="mt-1 text-xs text-red-600">{errors.addressLine.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">Address 2 (second clinic)</label>
          <input
            {...register("addressLine2")}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
          />
          {errors.addressLine2 && <p className="mt-1 text-xs text-red-600">{errors.addressLine2.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">Business hours summary</label>
          <input
            {...register("hoursSummary")}
            placeholder="Mon–Sat · 10:00 AM – 8:00 PM"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
          />
          {errors.hoursSummary && <p className="mt-1 text-xs text-red-600">{errors.hoursSummary.message}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Google rating (0-5)</label>
            <input
              {...register("rating", { valueAsNumber: true })}
              type="number"
              step="0.1"
              min="0"
              max="5"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            />
            {errors.rating && <p className="mt-1 text-xs text-red-600">{errors.rating.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Review count</label>
            <input
              {...register("reviewCount", { valueAsNumber: true })}
              type="number"
              min="0"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            />
            {errors.reviewCount && <p className="mt-1 text-xs text-red-600">{errors.reviewCount.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Instagram URL</label>
            <input
              {...register("socialInstagram")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            />
            {errors.socialInstagram && <p className="mt-1 text-xs text-red-600">{errors.socialInstagram.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Facebook URL</label>
            <input
              {...register("socialFacebook")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
            />
            {errors.socialFacebook && <p className="mt-1 text-xs text-red-600">{errors.socialFacebook.message}</p>}
          </div>
        </div>

        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        {success && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">✓ Settings saved successfully</p>}

        <Button type="submit" disabled={saving} className="w-full rounded-xl sm:w-auto">
          {saving ? "Saving…" : "Save settings"}
        </Button>
      </form>
    </Card>

    <Card className="border-slate-200/90 p-8 shadow-sm">
      <p className="text-sm text-slate-600">Preview temporarily disabled (fixing parser error).</p>
    </Card>
  </div>
  );
}
