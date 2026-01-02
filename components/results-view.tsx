"use client";

import { useEffect, useState } from "react";
import type { CenterListing, TrainerListing } from "@/domain/types";
import { LeafletMap } from "@/components/map/leaflet-map";
import { ListingCard } from "@/components/listing-card";
import { getDistanceFromZip } from "@/services/distance";
import { getRegionForState, regionStateMap } from "@/lib/regions/regions";
import type { ZipCentroid } from "@/domain/types";

export function ResultsView({
  trainerListings,
  centerListings
}: {
  trainerListings: TrainerListing[];
  centerListings: CenterListing[];
}) {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [region, setRegion] = useState("");
  const [zipCentroid, setZipCentroid] = useState<ZipCentroid | null>(null);
  const [bounds, setBounds] = useState<
    { north: number; south: number; east: number; west: number } | undefined
  >(undefined);

  const [listings, setListings] = useState<(TrainerListing | CenterListing)[]>([
    ...trainerListings,
    ...centerListings
  ]);

  const filters = {
    city: city || undefined,
    state: state || undefined,
    region: region || undefined,
    bounds
  };

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (filters.city) params.set("city", filters.city);
    if (filters.state) params.set("state", filters.state);
    if (filters.region) params.set("region", filters.region);
    if (filters.bounds) {
      const { north, south, east, west } = filters.bounds;
      params.set("bounds", `${north},${south},${east},${west}`);
    }

    fetch(`/api/search?${params.toString()}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        if (data?.listings) {
          setListings(data.listings);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });

    return () => controller.abort();
  }, [filters.city, filters.state, filters.region, filters.bounds]);

  useEffect(() => {
    if (!zip) {
      setZipCentroid(null);
      return;
    }

    const controller = new AbortController();
    fetch(`/api/zip?zip=${zip}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data?.centroid) {
          setZipCentroid(data.centroid);
        } else {
          setZipCentroid(null);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });

    return () => controller.abort();
  }, [zip]);

  const filteredListings = listings;

  const mapLocations = filteredListings.flatMap((listing) => listing.locations);


  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <aside className="space-y-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold">Search filters</h2>
          <div className="mt-3 grid gap-3">
            <label className="text-xs font-semibold text-slate-600">
              City
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="Austin"
              />
            </label>
            <label className="text-xs font-semibold text-slate-600">
              State
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={state}
                onChange={(event) => setState(event.target.value)}
                placeholder="TX"
              />
            </label>
            <label className="text-xs font-semibold text-slate-600">
              Region
              <select
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={region}
                onChange={(event) => setRegion(event.target.value)}
              >
                <option value="">All regions</option>
                {Object.keys(regionStateMap).map((regionKey) => (
                  <option key={regionKey} value={regionKey}>
                    {regionKey}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-semibold text-slate-600">
              ZIP for distance
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={zip}
                onChange={(event) => setZip(event.target.value)}
                placeholder="78701"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Distances use straight-line Haversine formula from ZIP centroid.
              </p>
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">Map window</h3>
          <p className="mt-2 text-xs text-slate-500">
            Results update when you pan/zoom the map. Current region: {state ? getRegionForState(state) ?? "N/A" : "N/A"}
          </p>
        </div>
      </aside>

      <section className="space-y-4">
        <div className="h-[420px] rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <LeafletMap
            locations={mapLocations}
            onBoundsChange={(nextBounds) => setBounds(nextBounds)}
          />
        </div>

        <div className="grid gap-4">
          {filteredListings.map((listing) => {
            const primaryLocation = listing.locations[0];
            const distance =
              zipCentroid && primaryLocation
                ? getDistanceFromZip(zipCentroid, primaryLocation.lat, primaryLocation.lng)
                : null;
            return <ListingCard key={listing.profile.id} listing={listing} distance={distance} />;
          })}
          {!filteredListings.length ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
              No listings match the current filters. Try adjusting city/state or zooming out.
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
