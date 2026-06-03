"use client";

import { AdminAuthGuard } from "@/components/admin/auth-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminSettingsContent } from "@/components/admin/admin-settings-content";

export default function AdminSettingsPage() {
  return (
    <AdminAuthGuard>
      <AdminShell>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Admin settings</h1>
            <p className="mt-2 text-slate-600">Configure your CMS and manage system settings.</p>
          </div>
          <AdminSettingsContent />
        </div>
      </AdminShell>
    </AdminAuthGuard>
  );
}
