import { Card } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Console</h1>
        <p className="text-sm text-slate-600">
          Review listings, manage lookup tables, and monitor basic analytics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-2">
          <h2 className="text-lg font-semibold">Reported listings</h2>
          <p className="text-sm text-slate-600">No reports yet.</p>
        </Card>
        <Card className="space-y-2">
          <h2 className="text-lg font-semibold">Analytics snapshot</h2>
          <ul className="text-sm text-slate-600">
            <li>Active listings: 2</li>
            <li>States covered: 2</li>
            <li>New listings (30 days): 2</li>
          </ul>
        </Card>
        <Card className="space-y-2">
          <h2 className="text-lg font-semibold">Lookup tables</h2>
          <p className="text-sm text-slate-600">Manage age groups, training types, and specialties.</p>
        </Card>
        <Card className="space-y-2">
          <h2 className="text-lg font-semibold">Moderation</h2>
          <p className="text-sm text-slate-600">Enable/disable listings and manage verification workflows.</p>
        </Card>
      </div>
    </div>
  );
}
