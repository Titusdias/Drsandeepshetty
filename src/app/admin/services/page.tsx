"use client";

import { AdminAuthGuard } from "@/components/admin/auth-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { ServicesEditor } from "@/components/admin/services-editor";

export default function AdminServicesEditorPage() {
  return (
    <AdminAuthGuard>
      <AdminShell>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Services</h1>
            <p className="mt-2 text-slate-600">Add, edit, and organize dental services offered at your clinic.</p>
          </div>
          <ServicesEditor />
        </div>
      </AdminShell>
    </AdminAuthGuard>
  );
}
