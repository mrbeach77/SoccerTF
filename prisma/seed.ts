import { PrismaClient, UserRole, OwnerType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const trainerUser = await prisma.user.create({
    data: {
      email: "demo.trainer@example.com",
      role: UserRole.TRAINER
    }
  });

  const centerUser = await prisma.user.create({
    data: {
      email: "demo.center@example.com",
      role: UserRole.CENTER_ADMIN
    }
  });

  const trainer = await prisma.trainerProfile.create({
    data: {
      userId: trainerUser.id,
      displayName: "Coach Mia Torres",
      bio: "Former collegiate midfielder focused on technical development and game IQ.",
      specialties: ["Ball mastery", "Speed & agility"],
      ageGroups: ["U10", "U14", "U18"],
      trainingTypes: ["1-on-1", "Small group"],
      yearsExperience: 8,
      publicWebsite: "https://example.com/coach-mia",
      publicInstagram: "https://instagram.com/coachmia",
      publicContactUrl: "https://example.com/contact",
      isPublished: true
    }
  });

  const center = await prisma.centerProfile.create({
    data: {
      ownerUserId: centerUser.id,
      name: "Northside Soccer Center",
      description: "Indoor/outdoor training center with turf fields and futsal courts.",
      website: "https://example.com/northside",
      publicContactUrl: "https://example.com/northside/contact",
      isPublished: true
    }
  });

  const trainerLocation = await prisma.location.create({
    data: {
      ownerType: OwnerType.TRAINER,
      ownerId: trainer.id,
      name: "Lakeside Park Field 3",
      city: "Austin",
      state: "TX",
      zip: "78701",
      address1: "123 Lakeside Dr",
      notes: "Meet by the blue benches.",
      fieldNumber: "3",
      lat: 30.2672,
      lng: -97.7431,
      isPublic: true,
      isActive: true
    }
  });

  const centerLocation = await prisma.location.create({
    data: {
      ownerType: OwnerType.CENTER,
      ownerId: center.id,
      name: "Northside Main Facility",
      city: "Denver",
      state: "CO",
      zip: "80202",
      address1: "455 Market St",
      notes: "Front desk at main entrance.",
      fieldNumber: "Indoor A",
      lat: 39.7392,
      lng: -104.9903,
      isPublic: true,
      isActive: true
    }
  });

  await prisma.availabilityBlock.createMany({
    data: [
      {
        ownerType: OwnerType.TRAINER,
        ownerId: trainer.id,
        locationId: trainerLocation.id,
        dayOfWeek: 2,
        startTime: "17:00",
        endTime: "19:00",
        timezone: "America/Chicago"
      },
      {
        ownerType: OwnerType.CENTER,
        ownerId: center.id,
        locationId: centerLocation.id,
        dayOfWeek: 4,
        startTime: "18:00",
        endTime: "20:00",
        timezone: "America/Denver"
      }
    ]
  });

  await prisma.zipCentroid.createMany({
    data: [
      { zip: "78701", lat: 30.2711, lng: -97.7437, city: "Austin", state: "TX" },
      { zip: "80202", lat: 39.7525, lng: -104.9995, city: "Denver", state: "CO" },
      { zip: "94110", lat: 37.7487, lng: -122.4158, city: "San Francisco", state: "CA" }
    ],
    skipDuplicates: true
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
