"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCollection, setDocument, deleteDocument } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PreviewPanel } from "@/components/admin/preview-panel";
import { Trash2 } from "lucide-react";
import type { Service } from "@/lib/types";

const emptyToUndefined = (v: string | undefined) => {
  if (v === undefined) return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
};

const serviceSchema = z.object({
  title: z.string().optional().transform(emptyToUndefined),
  description: z.string().optional().transform(emptyToUndefined),
  category: z.string().optional().transform(emptyToUndefined),
  featured: z.boolean().default(false),
});


type ServiceFormData = z.infer<typeof serviceSchema>;

export function ServicesEditor() {
  const [services, setServices] = useState<(Service & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  const previewValues = watch();
  const previewData = {
    title: previewValues.title || "Service title preview",
    description: previewValues.description || "Brief description of the service.",
    category: previewValues.category || "General",
    featured: previewValues.featured || false,
  };

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getCollection<Service>("services");
      setServices(data as (Service & { id: string })[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ServiceFormData) => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const id = editingId || `service-${Date.now()}`;
      await setDocument("services", id, {
        ...data,
        order: editingId ? services.find(s => s.id === editingId)?.order || 0 : services.length,
      });

      await loadServices();
      reset();
      setEditingId(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service: Service & { id: string }) => {
    reset({
      title: service.title,
      description: service.description,
      category: service.category,
      featured: service.featured,
    });
    setEditingId(service.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service? This action cannot be undone.")) return;

    try {
      await deleteDocument("services", id);
      await loadServices();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete service");
    }
  };

  if (loading) {
    return (
      <Card className="border-slate-200/90 p-8">
        <p className="text-sm text-slate-600">Loading services…</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200/90 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">
          {editingId ? "Edit service" : "Add new service"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Service title</label>
            <input
              {...register("title")}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              placeholder="e.g. Teeth Whitening"
            />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Description</label>
            <textarea
              {...register("description")}
              rows={3}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              placeholder="Brief description of the service"
            />
            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Category</label>
              <select
                {...register("category")}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-[#2D8A8A] focus:ring-2 focus:ring-[#2D8A8A]/25"
              >
                <option value="general">General</option>
                <option value="cosmetic">Cosmetic</option>
                <option value="orthodontics">Orthodontics</option>
                <option value="restorative">Restorative</option>
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category.message}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  {...register("featured")}
                  type="checkbox"
                  className="rounded border-slate-200"
                />
                Featured on homepage
              </label>
            </div>
          </div>

          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
          {success && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">✓ Saved successfully</p>}

          <div className="flex gap-3">
            <Button type="submit" disabled={saving} className="rounded-xl">
              {saving ? "Saving…" : editingId ? "Update service" : "Add service"}
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

      <PreviewPanel title="Services live preview" description="Preview the service entry you are editing or adding.">
        <div className="rounded-3xl border border-white/10 bg-slate-900 p-5 text-slate-100">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-teal-300">{previewData.category}</p>
              <h4 className="mt-3 text-xl font-semibold text-white">{previewData.title}</h4>
            </div>
            {previewData.featured && (
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-900">
                Featured
              </span>
            )}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300">{previewData.description}</p>
        </div>
      </PreviewPanel>

      <Card className="border-slate-200/90 p-8 shadow-sm">
        <h3 className="text-xl font-bold text-slate-950">Services ({services.length})</h3>
        <div className="mt-6 space-y-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex-1">
                <p className="font-medium text-slate-900">{service.title}</p>
                <p className="text-xs text-slate-500">{service.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {service.featured && (
                  <span className="inline-block rounded-full bg-teal-100 px-2 py-1 text-xs font-semibold text-[#2D8A8A]">
                    Featured
                  </span>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(service)}
                  className="rounded-xl"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(service.id)}
                  className="rounded-xl text-red-600 hover:text-red-700"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
