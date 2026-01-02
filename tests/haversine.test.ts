import { describe, expect, it } from "vitest";
import { haversineDistanceMiles } from "@/lib/geo/haversine";

describe("haversineDistanceMiles", () => {
  it("computes straight-line distance", () => {
    const distance = haversineDistanceMiles(30.2672, -97.7431, 39.7392, -104.9903);
    expect(distance).toBeGreaterThan(700);
    expect(distance).toBeLessThan(800);
  });
});
