import { NextResponse } from "next/server";
import { getCenterListings, getTrainerListings } from "@/services/listings";
import { filterListings } from "@/services/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") ?? undefined;
  const state = searchParams.get("state") ?? undefined;
  const region = searchParams.get("region") ?? undefined;

  const boundsParam = searchParams.get("bounds");
  const bounds = boundsParam
    ? (() => {
        const [north, south, east, west] = boundsParam.split(",").map(Number);
        if ([north, south, east, west].some((value) => Number.isNaN(value))) {
          return undefined;
        }
        return { north, south, east, west };
      })()
    : undefined;

  const [trainerListings, centerListings] = await Promise.all([
    getTrainerListings(),
    getCenterListings()
  ]);

  const combined = [...trainerListings, ...centerListings];
  const filtered = filterListings(combined, { city, state, region, bounds });

  return NextResponse.json({ listings: filtered });
}
