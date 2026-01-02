import type { CenterListing, TrainerListing } from "@/domain/types";
import { getRegionForState } from "@/lib/regions/regions";

export interface SearchFilters {
  city?: string;
  state?: string;
  region?: string;
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export function filterListings(
  listings: (TrainerListing | CenterListing)[],
  filters: SearchFilters
) {
  return listings.filter((listing) => {
    const locations = listing.locations;
    const matchesLocation = locations.some((location) => {
      if (filters.city && location.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }
      if (filters.state && location.state.toLowerCase() !== filters.state.toLowerCase()) {
        return false;
      }
      if (filters.region) {
        const region = getRegionForState(location.state);
        if (region?.toLowerCase() !== filters.region.toLowerCase()) {
          return false;
        }
      }
      if (filters.bounds) {
        const { north, south, east, west } = filters.bounds;
        if (location.lat > north || location.lat < south || location.lng > east || location.lng < west) {
          return false;
        }
      }
      return true;
    });

    return matchesLocation;
  });
}
