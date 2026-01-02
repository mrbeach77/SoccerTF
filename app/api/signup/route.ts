import { NextResponse } from "next/server";
import { z } from "zod";
import { logger } from "@/lib/logger";

const signupSchema = z.object({
  email: z.string().email(),
  role: z.enum(["TRAINER", "CENTER_ADMIN"])
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  logger.info("Signup requested", parsed.data);

  return NextResponse.json({ status: "queued" }, { status: 202 });
}
