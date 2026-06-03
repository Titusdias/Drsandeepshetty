"use client";

import { useState } from "react";
import { seedAllContent } from "@/lib/seed";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AdminSettingsContent() {
  const [seeding, setSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedStatus(null);
    setError(null);

    try {
      await seedAllContent();
      setSeedStatus("✓ Successfully seeded all content to Firestore. You can now edit each section.");
      setTimeout(() => setSeedStatus(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to seed content");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200/90 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">Initial setup</h2>
        <p className="mt-2 text-sm text-slate-600">
          Populate your Firestore database with initial content from the existing clinic information.
        </p>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">⚠ First time setup</p>
          <p className="mt-2 text-xs text-amber-800">
            Click "Seed Database" to initialize Firestore with existing clinic data (contact info, services, testimonials, team, gallery images). This needs to be done once before editing.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
          {seedStatus && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600">{seedStatus}</p>}

          <Button onClick={handleSeed} disabled={seeding} size="lg" className="rounded-xl">
            {seeding ? "Seeding…" : "Seed database"}
          </Button>
        </div>
      </Card>

      <Card className="border-slate-200/90 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">System information</h2>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between rounded-lg bg-slate-50 p-3">
            <span className="font-semibold text-slate-700">Firebase</span>
            <span className="text-slate-600">Configured</span>
          </div>
          <div className="flex justify-between rounded-lg bg-slate-50 p-3">
            <span className="font-semibold text-slate-700">Authentication</span>
            <span className="text-slate-600">Email/Password</span>
          </div>
          <div className="flex justify-between rounded-lg bg-slate-50 p-3">
            <span className="font-semibold text-slate-700">Database</span>
            <span className="text-slate-600">Firestore</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
