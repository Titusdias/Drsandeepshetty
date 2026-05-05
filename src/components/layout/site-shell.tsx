"use client";

import type { PropsWithChildren } from "react";

import { MobileBottomNav } from "@/components/clinic/mobile-bottom-nav";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { WhatsAppFab } from "./whatsapp-fab";

export function SiteShell({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-full flex-col bg-[#FDFBF7] text-slate-800">
      <SiteHeader />
      <main className="flex-1 pb-28 md:pb-0">{children}</main>
      <SiteFooter />
      <WhatsAppFab />
      <MobileBottomNav />
    </div>
  );
}
