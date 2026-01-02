import { describe, expect, it } from "vitest";
import { availabilityBlockSchema } from "@/lib/validation/availability";

describe("availabilityBlockSchema", () => {
  it("rejects invalid time ranges", () => {
    const result = availabilityBlockSchema.safeParse({
      dayOfWeek: 2,
      startTime: "18:00",
      endTime: "17:00",
      timezone: "America/Chicago"
    });

    expect(result.success).toBe(false);
  });

  it("accepts valid blocks", () => {
    const result = availabilityBlockSchema.safeParse({
      dayOfWeek: 2,
      startTime: "17:00",
      endTime: "19:00",
      timezone: "America/Chicago"
    });

    expect(result.success).toBe(true);
  });
});
