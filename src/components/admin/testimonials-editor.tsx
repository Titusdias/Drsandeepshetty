"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCollection, setDocument, deleteDocument } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PreviewPanel } from "@/components/admin/preview-panel";
import { Trash2, Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

const emptyToUndefined = (v: string | undefined) => {
  if (v === undefined) return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
};

const testimonialSchema = z.object({
  name: z.string().optional().transform(emptyToUndefined),
  quote: z.string().optional().transform(emptyToUndefined),
  rating: z.number().min(1).max(5).optional(),
  featured: z.boolean().default(false),
});


type TestimonialFormData = z.infer<typeof testimonialSchema>;

export function TestimonialsEditor() {
  const [testimonials, setTestimonials] = useState<(Testimonial & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { rating: 5, featured: false },
  });

  const rating = watch("rating");

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await getCollection<Testimonial>("testimonials");
      setTestimonials(data as (Testimonial & { id: string })[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: TestimonialFormData) => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const id = editingId || `testimonial-${Date.now()}`;
      await setDocument("testimonials", id, {
        ...data,
        order: editingId ? testimonials.find(t => t.id === editingId)?.order || 0 : testimonials.length,
      });

      await loadTestimonials();
      reset({ rating: 5, featured: false });
      setEditingId(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (testimonial: Testimonial & { id: string }) => {
    reset({
      name: testimonial.name,
      quote: testimonial.quote,
      rating: testimonial.rating,
      featured: testimonial.featured,
    });
    setEditingId(testimonial.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;

    try {
      await deleteDocument("testimonials", id);
      await loadTestimonials();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete testimonial");
    }
  };

  if (loading) {
    return (
      <Card className="border-slate-200/90 p-8">
        <p className="text-sm text-slate-600">Loading testimonials…</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200/90 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">
          {editingId ? "Edit testimonial" : "Add new testimonial"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Patient name</label>
              <input
                {...register("name")}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
                placeholder="e.g. Priya S."
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Rating (1-5 stars)</label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  {...register("rating", { valueAsNumber: true })}
                  type="number"
                  min="1"
                  max="5"
                  className="w-16 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
                />
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i <= (rating || 5) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Patient quote</label>
            <textarea
              {...register("quote")}
              rows={4}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              placeholder="What did the patient say about their experience?"
            />
            {errors.quote && <p className="mt-1 text-xs text-red-600">{errors.quote.message}</p>}
          </div>

          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              {...register("featured")}
              type="checkbox"
              className="rounded border-slate-200"
            />
            Show on homepage
          </label>

          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
          {success && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">✓ Saved successfully</p>}

          <div className="flex gap-3">
            <Button type="submit" disabled={saving} className="rounded-xl">
              {saving ? "Saving…" : editingId ? "Update testimonial" : "Add testimonial"}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  reset({ rating: 5, featured: false });
                }}
                className="rounded-xl"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      <PreviewPanel title="Testimonial preview" description="See how the review will look on the site.">
        <div className="rounded-3xl border border-white/10 bg-slate-900 p-5 text-slate-100">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-teal-300">Review preview</p>
                <h4 className="mt-2 text-xl font-semibold text-white">{watch("name") || "Patient name"}</h4>
              </div>
              {watch("featured") && (
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-900">
                  Featured
                </span>
              )}
            </div>
            <div className="flex gap-1">{[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`size-4 ${i <= (watch("rating") || 5) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}`}
              />
            ))}</div>
            <p className="text-sm leading-6 text-slate-300">{watch("quote") || "Patient quote preview goes here."}</p>
          </div>
        </div>
      </PreviewPanel>

      <Card className="border-slate-200/90 p-8 shadow-sm">
        <h3 className="text-xl font-bold text-slate-950">Testimonials ({testimonials.length})</h3>
        <div className="mt-6 space-y-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    {testimonial.featured && (
                      <span className="inline-block rounded-full bg-teal-100 px-2 py-1 text-xs font-semibold text-[#2D8A8A]">
                        Featured
                      </span>
                    )}
                  </div>
                  {testimonial.rating && (
                    <div className="mt-1 flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`size-3 ${i <= (testimonial.rating ?? 0) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
                        />
                      ))}
                    </div>
                  )}
                  <p className="mt-2 text-sm text-slate-600 italic">"{testimonial.quote}"</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(testimonial)}
                    className="rounded-xl"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(testimonial.id)}
                    className="rounded-xl text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
