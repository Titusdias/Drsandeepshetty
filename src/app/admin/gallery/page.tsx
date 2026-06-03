"use client";

import { AdminAuthGuard } from "@/components/admin/auth-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { GalleryEditor } from "@/components/admin/gallery-editor";

export default function AdminGalleryEditorPage() {
  return (
    <AdminAuthGuard>
      <AdminShell>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Clinic gallery</h1>
            <p className="mt-2 text-slate-600">Upload and manage clinic testimonial and gallery images.</p>
          </div>
          <GalleryEditor />
        </div>
      </AdminShell>
    </AdminAuthGuard>
  );
}
