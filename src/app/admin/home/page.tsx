"use client";

import { AdminAuthGuard } from "@/components/admin/auth-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { HeroEditor } from "@/components/admin/hero-editor";

export default function AdminHomeEditorPage() {
  return (
    <AdminAuthGuard>
      <AdminShell>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Homepage hero section</h1>
            <p className="mt-2 text-slate-600">Edit the main banner, headline, and call-to-action that visitors see first.</p>
          </div>
          <HeroEditor />
        </div>
      </AdminShell>
    </AdminAuthGuard>
  );
}
