import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getListingById } from "@/services/listings";

export default async function TrainerProfilePage({
  params
}: {
  params: { id: string };
}) {
  const listing = await getListingById("TRAINER", params.id);

  if (!listing || !("displayName" in listing.profile)) {
    notFound();
  }

  const profile = listing.profile;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-600">Trainer</p>
          <h1 className="text-3xl font-bold">{profile.displayName}</h1>
          <p className="mt-2 text-slate-600">{profile.bio}</p>
        </div>
        <Link className="text-sm font-semibold text-brand-600" href="/results">
          ← Back to results
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-3">
          <h2 className="text-lg font-semibold">Specialties</h2>
          <div className="flex flex-wrap gap-2">
            {profile.specialties.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
          <h2 className="text-lg font-semibold">Age groups</h2>
          <div className="flex flex-wrap gap-2">
            {profile.ageGroups.map((item) => (
              <Badge key={item} className="bg-emerald-100 text-emerald-700">
                {item}
              </Badge>
            ))}
          </div>
          <h2 className="text-lg font-semibold">Training types</h2>
          <div className="flex flex-wrap gap-2">
            {profile.trainingTypes.map((item) => (
              <Badge key={item} className="bg-indigo-100 text-indigo-700">
                {item}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-lg font-semibold">Public contact</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            {profile.publicWebsite ? (
              <li>
                Website: <a className="text-brand-600" href={profile.publicWebsite}>
                  {profile.publicWebsite}
                </a>
              </li>
            ) : (
              <li>No public website listed.</li>
            )}
            {profile.publicInstagram ? (
              <li>
                Instagram: <a className="text-brand-600" href={profile.publicInstagram}>
                  {profile.publicInstagram}
                </a>
              </li>
            ) : null}
            {profile.publicContactUrl ? (
              <li>
                Contact link: <a className="text-brand-600" href={profile.publicContactUrl}>
                  {profile.publicContactUrl}
                </a>
              </li>
            ) : null}
          </ul>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Training locations</h2>
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
