import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">Trainer / Center Dashboard</h1>
        <p className="text-sm text-slate-600">
          Complete onboarding, manage locations, and publish weekly availability.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="space-y-2">
          <h2 className="text-lg font-semibold">Onboarding</h2>
          <p className="text-sm text-slate-600">
            Choose Trainer or Center, set visibility, and define service areas.
          </p>
        </Card>
        <Card className="space-y-2">
          <h2 className="text-lg font-semibold">Locations</h2>
          <p className="text-sm text-slate-600">
            Add locations with pins, public-only confirmations, and venue notes.
          </p>
          <Link className="text-sm font-semibold text-brand-600" href="/dashboard/locations">
            Manage locations →
          </Link>
        </Card>
        <Card className="space-y-2">
          <h2 className="text-lg font-semibold">Availability</h2>
          <p className="text-sm text-slate-600">
            Create weekly blocks, add exceptions, and preview your listing.
          </p>
          <Link className="text-sm font-semibold text-brand-600" href="/dashboard/availability">
            Manage availability →
          </Link>
        </Card>
      </div>
    </div>
  );
}
