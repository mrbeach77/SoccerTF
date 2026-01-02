import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getListingById } from "@/services/listings";

export default async function CenterProfilePage({
  params
}: {
  params: { id: string };
}) {
  const listing = await getListingById("CENTER", params.id);

  if (!listing || !("name" in listing.profile)) {
    notFound();
  }

  const profile = listing.profile;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-600">Training Center</p>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="mt-2 text-slate-600">{profile.description}</p>
        </div>
        <Link className="text-sm font-semibold text-brand-600" href="/results">
          ← Back to results
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-2">
          <h2 className="text-lg font-semibold">Public contact</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            {profile.website ? (
              <li>
                Website: <a className="text-brand-600" href={profile.website}>
                  {profile.website}
                </a>
              </li>
            ) : (
              <li>No website listed.</li>
            )}
            {profile.publicContactUrl ? (
              <li>
                Contact link: <a className="text-brand-600" href={profile.publicContactUrl}>
                  {profile.publicContactUrl}
                </a>
              </li>
            ) : null}
          </ul>
        </Card>
        <Card className="space-y-2">
          <h2 className="text-lg font-semibold">Trainer roster (scaffold)</h2>
          <p className="text-sm text-slate-600">
            Connect trainers to this center in a future release.
          </p>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Locations</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {listing.locations.map((location) => (
            <Card key={location.id} className="space-y-2">
              <h3 className="text-base font-semibold">{location.name}</h3>
              <p className="text-sm text-slate-600">
                {location.city}, {location.state} {location.zip ?? ""}
              </p>
              {location.notes ? <p className="text-sm text-slate-500">{location.notes}</p> : null}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
