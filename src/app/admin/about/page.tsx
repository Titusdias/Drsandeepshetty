"use client";

import { AdminAuthGuard } from "@/components/admin/auth-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { AboutEditor } from "@/components/admin/about-editor";

export default function AdminAboutEditorPage() {
  return (
    <AdminAuthGuard>
      <AdminShell>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">About page</h1>
            <p className="mt-2 text-slate-600">Share your clinic's story, mission, and philosophy with patients.</p>
          </div>
          <AboutEditor />
        </div>
      </AdminShell>
    </AdminAuthGuard>
  );
}
