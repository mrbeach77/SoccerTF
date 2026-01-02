import { NextResponse } from "next/server";
import { z } from "zod";
import { logger } from "@/lib/logger";

const reportSchema = z.object({
  reporterEmail: z.string().email().optional(),
  targetType: z.string(),
  targetId: z.string(),
  reason: z.string(),
  details: z.string().optional()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = reportSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  logger.info("Report submitted", parsed.data);

  return NextResponse.json({ status: "received" }, { status: 201 });
}
