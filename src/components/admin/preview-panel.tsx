"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface PreviewPanelProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function PreviewPanel({ title, description, children }: PreviewPanelProps) {
  return (
    <Card className="border-slate-200/90 bg-slate-950 text-white p-6 shadow-sm">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Live preview</p>
        <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
        {description ? <p className="mt-1 text-sm text-slate-300">{description}</p> : null}
      </div>
      <div className="space-y-4 text-slate-100">{children}</div>
    </Card>
  );
}
