export type RegionKey = "West" | "Southwest" | "Midwest" | "South" | "Northeast";

export const regionStateMap: Record<RegionKey, string[]> = {
  West: ["WA", "OR", "CA", "NV", "ID", "MT", "WY", "UT", "CO", "AK", "HI"],
  Southwest: ["AZ", "NM", "TX", "OK"],
  Midwest: [
    "ND",
    "SD",
    "NE",
    "KS",
    "MN",
    "IA",
    "MO",
    "WI",
    "IL",
    "MI",
    "IN",
    "OH"
  ],
  South: ["AR", "LA", "MS", "AL", "TN", "KY", "GA", "FL", "SC", "NC", "VA", "WV", "MD", "DE", "DC"],
  Northeast: ["PA", "NJ", "NY", "CT", "RI", "MA", "VT", "NH", "ME"]
};

export function getRegionForState(state: string): RegionKey | null {
  const normalized = state.toUpperCase();
  return (
    (Object.keys(regionStateMap) as RegionKey[]).find((region) =>
      regionStateMap[region].includes(normalized)
    ) ?? null
  );
}
