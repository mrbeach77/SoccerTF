import fs from "node:fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: tsx scripts/import-zip-centroids.ts <path-to-csv>");
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const rows = raw.split("\n").slice(1).filter(Boolean);

  const data = rows.map((row) => {
    const [zip, lat, lng, city, state] = row.split(",");
    return {
      zip,
      lat: Number(lat),
      lng: Number(lng),
      city,
      state
    };
  });

  await prisma.zipCentroid.createMany({
    data,
    skipDuplicates: true
  });

  console.log(`Imported ${data.length} ZIP centroids.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
