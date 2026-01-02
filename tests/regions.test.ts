import { describe, expect, it } from "vitest";
import { getRegionForState } from "@/lib/regions/regions";

describe("getRegionForState", () => {
  it("returns region for known state", () => {
    expect(getRegionForState("TX")).toBe("Southwest");
    expect(getRegionForState("NY")).toBe("Northeast");
  });

  it("returns null for unknown state", () => {
    expect(getRegionForState("XX")).toBeNull();
  });
});
