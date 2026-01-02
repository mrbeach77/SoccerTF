import { prisma } from "@/lib/db/prisma";
import { demoListings } from "@/services/demo-data";
import type { CenterListing, TrainerListing } from "@/domain/types";

const hasDatabase = Boolean(process.env.DATABASE_URL);

export async function getTrainerListings(): Promise<TrainerListing[]> {
  if (!hasDatabase) {
    return demoListings.trainers;
  }

  const trainers = await prisma.trainerProfile.findMany({
    where: { isPublished: true },
    include: {
      locations: true,
      availabilityBlocks: true
    }
  });

  return trainers.map((trainer) => ({
    profile: {
      id: trainer.id,
      displayName: trainer.displayName,
      bio: trainer.bio,
      specialties: trainer.specialties,
      ageGroups: trainer.ageGroups,
      trainingTypes: trainer.trainingTypes,
      yearsExperience: trainer.yearsExperience ?? undefined,
      verificationStatus: trainer.verificationStatus,
      publicWebsite: trainer.publicWebsite ?? undefined,
      publicInstagram: trainer.publicInstagram ?? undefined,
      publicContactUrl: trainer.publicContactUrl ?? undefined,
      isPublished: trainer.isPublished
    },
    locations: trainer.locations,
    availability: trainer.availabilityBlocks
  }));
}

export async function getCenterListings(): Promise<CenterListing[]> {
  if (!hasDatabase) {
    return demoListings.centers;
  }

  const centers = await prisma.centerProfile.findMany({
    where: { isPublished: true },
    include: {
      locations: true,
      availabilityBlocks: true
    }
  });

  return centers.map((center) => ({
    profile: {
      id: center.id,
      name: center.name,
      description: center.description,
      website: center.website ?? undefined,
      verificationStatus: center.verificationStatus,
      publicContactUrl: center.publicContactUrl ?? undefined,
      isPublished: center.isPublished
    },
    locations: center.locations,
    availability: center.availabilityBlocks
  }));
}

export async function getListingById(
  type: "TRAINER" | "CENTER",
  id: string
): Promise<TrainerListing | CenterListing | null> {
  if (!hasDatabase) {
    if (type === "TRAINER") {
      return demoListings.trainers.find((listing) => listing.profile.id === id) ?? null;
    }
    return demoListings.centers.find((listing) => listing.profile.id === id) ?? null;
  }

  if (type === "TRAINER") {
    const trainer = await prisma.trainerProfile.findUnique({
      where: { id },
      include: { locations: true, availabilityBlocks: true }
    });

    if (!trainer) return null;

    return {
      profile: {
        id: trainer.id,
        displayName: trainer.displayName,
        bio: trainer.bio,
        specialties: trainer.specialties,
        ageGroups: trainer.ageGroups,
        trainingTypes: trainer.trainingTypes,
        yearsExperience: trainer.yearsExperience ?? undefined,
        verificationStatus: trainer.verificationStatus,
        publicWebsite: trainer.publicWebsite ?? undefined,
        publicInstagram: trainer.publicInstagram ?? undefined,
        publicContactUrl: trainer.publicContactUrl ?? undefined,
        isPublished: trainer.isPublished
      },
      locations: trainer.locations,
      availability: trainer.availabilityBlocks
    };
  }

  const center = await prisma.centerProfile.findUnique({
    where: { id },
    include: { locations: true, availabilityBlocks: true }
  });

  if (!center) return null;

  return {
    profile: {
      id: center.id,
      name: center.name,
      description: center.description,
      website: center.website ?? undefined,
      verificationStatus: center.verificationStatus,
      publicContactUrl: center.publicContactUrl ?? undefined,
      isPublished: center.isPublished
    },
    locations: center.locations,
    availability: center.availabilityBlocks
  };
}
