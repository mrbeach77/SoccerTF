import { NextResponse } from "next/server";
import { getZipCentroid } from "@/services/distance";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get("zip");
  if (!zip) {
    return NextResponse.json({ error: "ZIP is required" }, { status: 400 });
  }

  const centroid = await getZipCentroid(zip);
  if (!centroid) {
    return NextResponse.json({ error: "ZIP not found" }, { status: 404 });
  }

  return NextResponse.json({ centroid });
}
