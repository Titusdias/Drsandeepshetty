import { MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { FacebookIcon, InstagramIcon } from "@/components/clinic/social-icons";
import { CLINIC, SOCIAL } from "@/lib/site-config";

const quick = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Our team" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-[#0f172a] text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-lg font-bold text-white">{CLINIC.name}</p>
          
          <div className="mt-5 space-y-3 text-sm">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#5ec4c4]" />
              {CLINIC.addressLine}
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#5ec4c4]" />
              {CLINIC.addressLine2}
            </p>
            <p className="flex items-center gap-2 font-semibold text-white">
              <Phone className="size-4 text-[#5ec4c4]" />
              <a href={CLINIC.phoneTel} className="transition hover:text-[#5ec4c4]">
                {CLINIC.phoneDisplay}
              </a>
            </p>
          </div>

          <p className="text-lg font-bold text-white mt-8">WHITE SMILE DENTAL SPECIALITY</p>
          
          <div className="mt-5 space-y-3 text-sm">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#5ec4c4]" />
              Ash Sharqiyah St, Muscat, Oman
            </p>
            <p className="flex items-center gap-2 font-semibold text-white">
              <Phone className="size-4 text-[#5ec4c4]" />
              <a href="tel:+96824565586" className="transition hover:text-[#5ec4c4]">
                +968 24 565586
              </a>
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Explore
          </p>
          <div className="mt-4 space-y-2 text-sm">
            {quick.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block text-slate-300 transition hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Connect
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-600 p-2.5 transition hover:border-[#2D8A8A] hover:text-[#7dd9d9]"
              aria-label="Instagram"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-600 p-2.5 transition hover:border-[#2D8A8A] hover:text-[#7dd9d9]"
              aria-label="Facebook"
            >
              <FacebookIcon className="size-5" />
            </a>
            <a
              href={CLINIC.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-200 transition hover:bg-emerald-500/20"
            >
              WhatsApp
            </a>
          </div>
         
        </div>
      </div>

      <div className="border-t border-slate-800/80 bg-[#0b1220]">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <p className="text-center text-xs leading-relaxed text-slate-500 sm:text-left">
            <strong className="font-medium text-slate-400">Patient privacy:</strong>{" "}
            Details you share via this website are used to respond to appointments
            and enquiries only. This site does not replace a clinical diagnosis;
            treatment plans are confirmed in-office.
          </p>
          <p className="mt-3 text-center text-xs text-slate-600 sm:text-left">
            © 2026 {CLINIC.shortName}&apos;s Dental Clinic and Orthodontic Centre,
            {CLINIC.city}.
          </p>
        </div>
      </div>
    </footer>
  );
}
