"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Smile, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { CLINIC, SERVICE_LIST } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/team", label: "Our Team" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="hidden border-b border-slate-100 bg-[#FDFBF7] sm:block">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs text-slate-600 sm:px-6">
          <p>
            <span className="font-semibold text-slate-800">{CLINIC.city}</span>
            · {CLINIC.hoursSummary}
          </p>
          <a
            href={CLINIC.phoneTel}
            className="font-semibold text-[#2D8A8A] transition hover:underline"
          >
            Call {CLINIC.phoneDisplay}
          </a>
        </div>
      </div>

      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#2D8A8A] text-white shadow-sm">
            <Smile className="size-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 sm:text-base">
              {CLINIC.shortName}
            </p>
            <p className="truncate text-[11px] text-slate-500 sm:text-xs">
              Dental &amp; Orthodontic · {CLINIC.city}
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition",
                pathname === href
                  ? "bg-teal-50 text-[#2D8A8A]"
                  : "text-slate-700 hover:bg-slate-50 hover:text-[#2D8A8A]",
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
            <a href={CLINIC.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
          <Button size="sm" className="h-10 px-4 text-xs sm:h-11 sm:px-6 sm:text-sm" asChild>
            <Link href="/contact">Book appointment</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 p-2 text-slate-800 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {nav.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-[#2D8A8A]"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-[#2D8A8A]"
              >
                All services
              </Link>
              <div className="grid gap-2 pt-2 sm:grid-cols-2">
                <Button asChild variant="outline" className="w-full">
                  <a href={CLINIC.whatsapp} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Book appointment
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
