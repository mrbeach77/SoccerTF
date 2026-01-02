import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;

export function middleware(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.next();
  }

  if (!request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const ip = request.ip ?? request.headers.get("x-forwarded-for") ?? "unknown";
  const key = `${ip}:${request.nextUrl.pathname}`;
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (entry && now - entry.lastRequest < WINDOW_MS) {
    if (entry.count >= MAX_REQUESTS) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }
    entry.count += 1;
    rateLimitMap.set(key, entry);
  } else {
    rateLimitMap.set(key, { count: 1, lastRequest: now });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"]
};
