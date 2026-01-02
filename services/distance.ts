import { prisma } from "@/lib/db/prisma";
import { demoZips } from "@/services/demo-data";
import { haversineDistanceMiles } from "@/lib/geo/haversine";
import type { ZipCentroid } from "@/domain/types";

const hasDatabase = Boolean(process.env.DATABASE_URL);

export async function getZipCentroid(zip: string): Promise<ZipCentroid | null> {
  if (!hasDatabase) {
    return demoZips.find((entry) => entry.zip === zip) ?? null;
  }

  return prisma.zipCentroid.findUnique({
    where: { zip }
  });
}

export function getDistanceFromZip(
  zip: ZipCentroid,
  lat: number,
  lng: number
): number {
  return haversineDistanceMiles(zip.lat, zip.lng, lat, lng);
}
