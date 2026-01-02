import Link from "next/link";
import type { CenterListing, TrainerListing } from "@/domain/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export function ListingCard({
  listing,
  distance
}: {
  listing: TrainerListing | CenterListing;
  distance?: number | null;
}) {
  const isTrainer = "displayName" in listing.profile;
  const name = isTrainer ? listing.profile.displayName : listing.profile.name;
  const path = isTrainer ? `/trainers/${listing.profile.id}` : `/centers/${listing.profile.id}`;
  const specialties = isTrainer ? listing.profile.specialties : [];
  const ageGroups = isTrainer ? listing.profile.ageGroups : [];

  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            {isTrainer ? "Trainer" : "Training Center"} · {listing.locations[0]?.city}, {listing.locations[0]?.state}
          </CardDescription>
        </div>
        {distance !== undefined && distance !== null ? (
          <Badge className="bg-slate-100 text-slate-700">{distance.toFixed(1)} mi</Badge>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {specialties.slice(0, 2).map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
        {ageGroups.slice(0, 2).map((item) => (
          <Badge key={item} className="bg-emerald-100 text-emerald-700">
            {item}
          </Badge>
        ))}
      </div>
      <Link className="text-sm font-semibold text-brand-600" href={path}>
        View profile →
      </Link>
    </Card>
  );
}
