import { Card } from "@/components/ui/card";

export default function AvailabilityManagerPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">Availability Manager</h1>
        <p className="text-sm text-slate-600">
          Define weekly recurring training blocks and add date exceptions.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="space-y-3">
          <h2 className="text-lg font-semibold">Weekly blocks</h2>
          <div className="grid gap-3">
            <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option>Day of week</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Start time (e.g., 17:00)" />
            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="End time (e.g., 19:00)" />
            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Timezone" defaultValue="America/Chicago" />
          </div>
        </Card>
        <Card className="space-y-3">
          <h2 className="text-lg font-semibold">Exceptions (MVP)</h2>
          <p className="text-sm text-slate-600">Add canceled dates and notes.</p>
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="YYYY-MM-DD" />
        </Card>
      </div>
    </div>
  );
}
