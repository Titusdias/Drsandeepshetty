"use client";

import { AdminAuthGuard } from "@/components/admin/auth-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { TestimonialsEditor } from "@/components/admin/testimonials-editor";

export default function AdminTestimonialsEditorPage() {
  return (
    <AdminAuthGuard>
      <AdminShell>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Patient testimonials</h1>
            <p className="mt-2 text-slate-600">Manage patient reviews, ratings, and featured testimonials.</p>
          </div>
          <TestimonialsEditor />
        </div>
      </AdminShell>
    </AdminAuthGuard>
  );
}
