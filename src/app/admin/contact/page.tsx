"use client";

import { AdminAuthGuard } from "@/components/admin/auth-guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { ContactSettingsEditor } from "@/components/admin/contact-settings-editor";

export default function AdminContactEditorPage() {
  return (
    <AdminAuthGuard>
      <AdminShell>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Contact & clinic settings</h1>
            <p className="mt-2 text-slate-600">Manage all clinic contact info, hours, addresses, and social links.</p>
          </div>
          <ContactSettingsEditor />
        </div>
      </AdminShell>
    </AdminAuthGuard>
  );
}
