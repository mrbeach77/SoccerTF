import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { regionStateMap } from "@/lib/regions/regions";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-10">
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase text-brand-600">Free MVP v1</p>
          <h1 className="text-3xl font-bold md:text-4xl">
            Soccer Trainer Directory + Map for the USA
          </h1>
          <p className="text-slate-600">
            Discover trainers and training centers by city, state, or region. Compare weekly availability
            and approximate straight-line distance from any ZIP code.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/results">
              <Button>Search the directory</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-slate-900 hover:bg-slate-800">List your training</Button>
            </Link>
          </div>
        </div>
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold">Quick search</h2>
          <div className="grid gap-3">
            <input
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="City (no geocoding, just match)"
            />
            <input
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="State (e.g., TX)"
            />
            <input
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="ZIP for distance"
            />
            <Link href="/results">
              <Button className="w-full">Search</Button>
            </Link>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card>
          <h3 className="text-base font-semibold">Map + List</h3>
          <p className="mt-2 text-sm text-slate-600">
            Split view results with clustered pins and quick filters for age group, training type, and day.
          </p>
        </Card>
        <Card>
          <h3 className="text-base font-semibold">Trainer & Center Profiles</h3>
          <p className="mt-2 text-sm text-slate-600">
            Share specialties, weekly availability, and public contact links without exposing private info.
          </p>
        </Card>
        <Card>
          <h3 className="text-base font-semibold">Expandable Architecture</h3>
          <p className="mt-2 text-sm text-slate-600">
            Built with modular services for payments, booking, verification, and driving distance.
          </p>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Browse by Region</h2>
        <div className="grid gap-4 md:grid-cols-5">
          {Object.entries(regionStateMap).map(([region, states]) => (
            <Card key={region} className="space-y-2">
              <h3 className="text-sm font-semibold text-brand-700">{region}</h3>
              <p className="text-xs text-slate-600">{states.join(", ")}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
