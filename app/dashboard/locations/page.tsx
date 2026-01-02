import { Card } from "@/components/ui/card";

export default function LocationsManagerPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">Location Manager</h1>
        <p className="text-sm text-slate-600">
          Drop a pin on the map, add optional address details, and confirm the venue is public.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="h-[420px]">Map pin drop (interactive in future iteration).</Card>
        <Card className="space-y-3">
          <h2 className="text-lg font-semibold">Location details</h2>
          <div className="grid gap-3">
            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Location name" />
            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="City" />
            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="State" />
            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="ZIP (optional)" />
            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Street address (optional)" />
            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Field number (optional)" />
            <textarea className="min-h-[90px] w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Venue notes" />
            <label className="flex items-start gap-2 text-xs text-slate-600">
              <input type="checkbox" className="mt-1" />
              I confirm this is a public training location with permission to list.
            </label>
          </div>
        </Card>
      </div>
    </div>
  );
}
