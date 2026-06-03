"use client";

import { AdminAuthGuard } from "@/components/admin/auth-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { SeoSettingsEditor } from "@/components/admin/seo-settings-editor";

export default function AdminSeoEditorPage() {
  return (
    <AdminAuthGuard>
      <AdminShell>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">SEO settings</h1>
            <p className="mt-2 text-slate-600">Customize page titles and meta descriptions for search engines.</p>
          </div>
          <SeoSettingsEditor />
        </div>
      </AdminShell>
    </AdminAuthGuard>
  );
}
