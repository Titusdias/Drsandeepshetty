"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/home", label: "Home" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    if (!auth) {
      return router.push("/admin/login");
    }

    await signOut(auth);
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Clinic CMS</p>
            <p className="text-xs text-slate-500">Edit website content in one place</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:px-6">
        <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Admin navigation</p>
          <div className="space-y-1">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${pathname === item.href ? "bg-teal-50 text-[#2D8A8A]" : "text-slate-700 hover:bg-slate-50 hover:text-[#2D8A8A]"}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </aside>

        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
