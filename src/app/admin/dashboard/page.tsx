"use client";

import { AdminAuthGuard } from "@/components/admin/auth-guard";
import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminDashboardPage() {
  return (
    <AdminAuthGuard>
      <AdminShell>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Dashboard</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950">Welcome back</h1>
              <p className="mt-2 text-sm text-slate-600">
                Use the admin navigation to manage content, site settings, and contact information.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Home editor", value: "Manage hero, testimonials, and cards." },
                { label: "Services", value: "Edit service offerings and featured packages." },
                { label: "Gallery", value: "Upload and reorder marketing images." },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminShell>
    </AdminAuthGuard>
  );
}
