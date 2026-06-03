"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCollection, setDocument, deleteDocument } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PreviewPanel } from "@/components/admin/preview-panel";
import { Trash2, ArrowUp, ArrowDown } from "lucide-react";
import type { GalleryImage } from "@/lib/types";

const imageSchema = z.object({
  url: z.string().url("Valid image URL is required"),
  alt: z.string().optional().default(""),
  category: z.string().optional().default(""),
});

type ImageFormData = z.infer<typeof imageSchema>;

export function GalleryEditor() {
  const [images, setImages] = useState<(GalleryImage & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<ImageFormData>({
    resolver: zodResolver(imageSchema),
  });

  const previewValues = watch();
  const previewData = {
    url: previewValues.url || "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80",
    alt: previewValues.alt || "Gallery image preview",
    category: previewValues.category || "Clinic photo",
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const data = await getCollection<GalleryImage>("gallery");
      setImages(data as (GalleryImage & { id: string })[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ImageFormData) => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const id = editingId || `image-${Date.now()}`;
      const order = editingId ? images.find(i => i.id === editingId)?.order || 0 : images.length;

      await setDocument("gallery", id, {
        ...data,
        order,
      });

      await loadGallery();
      reset();
      setEditingId(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save image");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (image: GalleryImage & { id: string }) => {
    reset({
      url: image.url,
      alt: image.alt,
      category: image.category,
    });
    setEditingId(image.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;

    try {
      await deleteDocument("gallery", id);
      await loadGallery();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete image");
    }
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    const idx = images.findIndex(i => i.id === id);
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === images.length - 1) return;

    const newIdx = direction === "up" ? idx - 1 : idx + 1;
    const updatedImages = [...images];
    [updatedImages[idx].order, updatedImages[newIdx].order] = [updatedImages[newIdx].order, updatedImages[idx].order];

    try {
      await setDocument("gallery", id, updatedImages[idx]);
      await setDocument("gallery", updatedImages[newIdx].id, updatedImages[newIdx]);
      await loadGallery();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reorder images");
    }
  };

  if (loading) {
    return (
      <Card className="border-slate-200/90 p-8">
        <p className="text-sm text-slate-600">Loading gallery…</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200/90 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">
          {editingId ? "Edit gallery image" : "Add gallery image"}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Tip: You can use public image URLs or upload images to a service like Cloudinary/Imgur
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Image URL</label>
            <input
              {...register("url")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              placeholder="https://example.com/image.jpg"
            />
            {errors.url && <p className="mt-1 text-xs text-red-600">{errors.url.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Image description</label>
            <input
              {...register("alt")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              placeholder="What is shown in this image?"
            />
            {errors.alt && <p className="mt-1 text-xs text-red-600">{errors.alt.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Category (optional)</label>
            <input
              {...register("category")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              placeholder="e.g. Reception, Equipment"
            />
          </div>

          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
          {success && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">✓ Saved successfully</p>}

          <div className="flex gap-3">
            <Button type="submit" disabled={saving} className="rounded-xl">
              {saving ? "Saving…" : editingId ? "Update image" : "Add image"}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  reset();
                }}
                className="rounded-xl"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      <PreviewPanel title="Gallery preview" description="Preview the image entry you are adding before saving.">
        <div className="rounded-3xl border border-white/10 bg-slate-900 p-5 text-slate-100">
          <div className="aspect-video overflow-hidden rounded-2xl bg-slate-800">
            <img
              src={previewData.url}
              alt={previewData.alt}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23343f53' width='400' height='300'/%3E%3Ctext x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23e2e8f0' font-size='14'%3EImage not found%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p className="font-semibold text-white">{previewData.alt}</p>
            <p>{previewData.category}</p>
          </div>
        </div>
      </PreviewPanel>

      <Card className="border-slate-200/90 p-8 shadow-sm">
        <h3 className="text-xl font-bold text-slate-950">Gallery ({images.length})</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, idx) => (
            <div key={image.id} className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300">
              <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-slate-200">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e0e7ff' width='400' height='300'/%3E%3Ctext x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23666' font-size='14'%3EImage not found%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <p className="truncate text-xs font-semibold text-slate-700">{image.alt}</p>
              {image.category && <p className="text-xs text-slate-500">{image.category}</p>}
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReorder(image.id, "up")}
                    disabled={idx === 0}
                    className="h-8 w-8 rounded-lg p-0"
                  >
                    <ArrowUp className="size-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReorder(image.id, "down")}
                    disabled={idx === images.length - 1}
                    className="h-8 w-8 rounded-lg p-0"
                  >
                    <ArrowDown className="size-3" />
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(image)}
                  className="rounded-lg text-xs"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(image.id)}
                  className="h-8 w-8 rounded-lg p-0 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
